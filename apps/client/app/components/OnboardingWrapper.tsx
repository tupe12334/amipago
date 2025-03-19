import { ReactNode, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { OnboardingPage } from "../pages/OnboardingPage";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

interface OnboardingWrapperProps {
  children: ReactNode;
}

export const OnboardingWrapper = ({ children }: OnboardingWrapperProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [displayName, setDisplayName] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setDisplayName(user?.displayName || null);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

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

  if (!displayName) {
    return <OnboardingPage />;
  }

  return <>{children}</>;
};
