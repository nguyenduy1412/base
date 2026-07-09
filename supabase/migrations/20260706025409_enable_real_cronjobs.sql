-- 1. Enable pg_cron and pg_net extensions
create extension if not exists pg_cron;
create extension if not exists pg_net;

-- Grant usage to postgres role
grant usage on schema cron to postgres;
grant usage on schema net to postgres;

-- 2. Create the function to run the actual action of the event when cron triggers
create or replace function public.execute_event(event_id uuid)
returns void
language plpgsql
security definer -- runs with higher privileges to bypass RLS when querying events
as $$
declare
    v_event record;
begin
    -- Get information for the active event
    select e.id, e.name, e.message, e.channel_id, e.profile_id
    into v_event
    from public.event e
    where e.id = event_id and e.is_enable = true;

    -- If event doesn't exist or is disabled, do nothing
    if v_event is null then
        return;
    end if;

    -- Make an asynchronous HTTP POST request to your Edge Function or external API webhook
    perform net.http_post(
        url := 'http://localhost:54321/functions/v1/execute-event', -- Replace with your actual external API endpoint or Edge Function URL
        headers := '{"Content-Type": "application/json"}'::jsonb,
        body := jsonb_build_object(
            'event_id', v_event.id,
            'name', v_event.name,
            'message', v_event.message,
            'channel_id', v_event.channel_id,
            'profile_id', v_event.profile_id
        )
    );
end;
$$;

-- 3. Create database trigger function to sync event changes to pg_cron
create or replace function public.sync_event_cron()
returns trigger
language plpgsql
security definer
as $$
declare
    v_cron_time text;
begin
    -- Case 1: Event is deleted, disabled, or cronjob_id is removed
    if (TG_OP = 'DELETE') or (NEW.is_enable = false) or (NEW.cronjob_id is null) then
        -- Unschedule from pg_cron if it exists
        if exists (select 1 from cron.job where jobname = 'event_' || old.id::text) then
            perform cron.unschedule('event_' || old.id::text);
        end if;
        
        if (TG_OP = 'DELETE') then
            return old;
        else
            return new;
        end if;
    end if;

    -- Case 2: Event is created or updated, is enabled, and has a cronjob_id
    if (TG_OP = 'INSERT') or (TG_OP = 'UPDATE') then
        -- Fetch cron expression time
        select time into v_cron_time
        from public.cronjob
        where id = NEW.cronjob_id;

        if v_cron_time is not null then
            -- Schedule or update the job (pg_cron overwrites existing job with the same name)
            perform cron.schedule(
                'event_' || NEW.id::text,
                v_cron_time,
                format('select public.execute_event(%L)', NEW.id)
            );
        else
            -- If cronjob doesn't have a valid time, unschedule it
            if exists (select 1 from cron.job where jobname = 'event_' || NEW.id::text) then
                perform cron.unschedule('event_' || NEW.id::text);
            end if;
        end if;
    end if;

    return new;
end;
$$;

-- Create the trigger on public.event
create or replace trigger trg_sync_event_cron
after insert or update or delete
on public.event
for each row
execute function public.sync_event_cron();

-- 4. Create trigger function to sync changes when a cronjob's time is updated
create or replace function public.sync_cronjob_time_change()
returns trigger
language plpgsql
security definer
as $$
declare
    v_event record;
begin
    -- When cronjob time changes, update all active events using this cronjob
    for v_event in 
        select id from public.event 
        where cronjob_id = NEW.id and is_enable = true
    loop
        perform cron.schedule(
            'event_' || v_event.id::text,
            NEW.time,
            format('select public.execute_event(%L)', v_event.id)
        );
    end loop;
    return new;
end;
$$;

-- Create the trigger on public.cronjob
create or replace trigger trg_sync_cronjob_time_change
after update of time
on public.cronjob
for each row
execute function public.sync_cronjob_time_change();
