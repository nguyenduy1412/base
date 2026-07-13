import { Redirect } from "expo-router";

/**
 * Keep the old deep link working while the onboarding UI is managed by the
 * step-based flow at /onboarding.
 */
export default function OnboardingIdentityRedirect() {
  return <Redirect href="/onboarding" />;
}
