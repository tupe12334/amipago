import { ReactNode } from "react";
import { OnboardingPage } from "../pages/OnboardingPage";
import { useUser } from "../context/UserContext";

interface OnboardingWrapperProps {
  children: ReactNode;
}

export const OnboardingWrapper = ({ children }: OnboardingWrapperProps) => {
  const { userData, isLoading } = useUser();

  // Show loading state until we know if the user needs onboarding
  if (isLoading) {
    return (
      <div
        id="onboarding-loading"
        className="flex items-center justify-center min-h-screen"
      >
        <i
          className="fa fa-spinner fa-spin text-4xl text-blue-500"
          aria-hidden="true"
        ></i>
        <span className="sr-only">טוען...</span>
      </div>
    );
  }

  // If user doesn't have a name, show onboarding
  if (!userData?.name) {
    return <OnboardingPage />;
  }

  // User has completed onboarding, show the main app
  return <>{children}</>;
};
