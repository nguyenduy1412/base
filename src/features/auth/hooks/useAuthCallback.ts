import { auth$ } from "@/store/auth";
import { useMutation } from "@tanstack/react-query";
import { createSessionFromUrl } from "../api/session.api";

export const useAuthCallback = () => {
  return useMutation({
    mutationFn: (url: string) => createSessionFromUrl(url),
    onSuccess: (data) => {
      if (!data.session) return;
      auth$.session.set(data.session);
      auth$.user.set(data.user);
    },
  });
};
