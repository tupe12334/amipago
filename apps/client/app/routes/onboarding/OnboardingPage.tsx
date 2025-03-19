import { useState } from "react";
import { z } from "zod";
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import { FormField } from "../../components/Form/FormField";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";

const signupSchema = z.object({
  name: z.string().min(2, "שם חייב להכיל לפחות 2 תווים"),
  email: z.string().email("כתובת אימייל לא תקינה"),
  password: z.string().min(6, "סיסמה חייבת להכיל לפחות 6 תווים"),
});

export const OnboardingPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = signupSchema.safeParse({ name, email, password });

      if (!result.success) {
        setError(result.error.errors[0].message);
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await updateProfile(userCredential.user, { displayName: name });
      setError(null);
      navigate("/");
    } catch (err) {
      setError("אירעה שגיאה. אנא נסה שנית.");
    } finally {
      setLoading(false);
    }
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

        <Typography
          id="onboarding-description"
          variant="body1"
          align="center"
          sx={{ mb: 4 }}
        >
          לפני שנתחיל, אנחנו צריכים לדעת מה שמך
        </Typography>

        <Box
          component="form"
          id="onboarding-form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <FormField
            id="user-name-input"
            name="name"
            label="שם"
            placeholder="הזן את שמך כאן"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={error || undefined}
            icon="user"
            aria-required="true"
          />

          <FormField
            id="user-email-input"
            name="email"
            label="אימייל"
            placeholder="הזן את האימייל שלך כאן"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error || undefined}
            icon="envelope"
            aria-required="true"
          />

          <FormField
            id="user-password-input"
            name="password"
            label="סיסמה"
            placeholder="הזן את הסיסמה שלך כאן"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error || undefined}
            icon="lock"
            aria-required="true"
          />

          <Button
            id="onboarding-submit"
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            startIcon={
              loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <i className="fa fa-save" aria-hidden="true"></i>
              )
            }
            sx={{
              mt: 2,
              py: 1.5,
              display: "flex",
              gap: 1,
              justifyContent: "center",
            }}
          >
            בואו נתחיל
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default OnboardingPage;
