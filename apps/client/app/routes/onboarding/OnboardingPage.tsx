import { useState } from "react";
import { Container, Paper, Typography } from "@mui/material";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { AuthStep } from "./components/AuthStep";
import { NameStep } from "./components/NameStep";

export const OnboardingPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [user, setUser] = useState<any>(null);

  const handleAuthSubmit = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        setUser(userCredential.user);
        setStep(2);
      } else {
        throw error;
      }
    }
  };

  const handleNameSubmit = async (name: string) => {
    await updateProfile(user, { displayName: name });
    navigate("/");
  };

  return (
    <Container
      id="onboarding-container"
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        p: 3,
      }}
    >
      <Paper id="onboarding-card" elevation={3} sx={{ p: 4, width: "100%" }}>
        <Typography
          id="onboarding-title"
          variant="h4"
          component="h1"
          align="center"
          sx={{ mb: 3, fontWeight: "bold" }}
        >
          ברוכים הבאים ל-AmiPago
        </Typography>

        {step === 1 ? (
          <AuthStep onSubmit={handleAuthSubmit} />
        ) : (
          <NameStep onSubmit={handleNameSubmit} />
        )}
      </Paper>
    </Container>
  );
};

export default OnboardingPage;
