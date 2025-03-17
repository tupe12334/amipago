import { ReactNode } from "react";
import { OnboardingPage } from "../pages/OnboardingPage";
import { useUser } from "../context/UserContext";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

interface OnboardingWrapperProps {
  children: ReactNode;
}

export const OnboardingWrapper = ({ children }: OnboardingWrapperProps) => {
  const { userData, isLoading } = useUser();

  // Show loading state until we know if the user needs onboarding
  if (isLoading) {
    return (
      <Box
        id="onboarding-loading"
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        aria-busy="true"
      >
        <CircularProgress
          id="onboarding-progress-spinner"
          aria-label="טוען..."
        />
      </Box>
    );
  }

  // If user doesn't have a name, show onboarding
  if (!userData?.name) {
    return <OnboardingPage />;
  }

  // User has completed onboarding, show the main app
  return <>{children}</>;
};
