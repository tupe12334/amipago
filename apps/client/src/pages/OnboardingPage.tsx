import { useState } from "react";
import { z } from "zod";
import { Container, Paper, Typography, Box } from "@mui/material";
import { FormField } from "../components/Form/FormField";
import { FormSubmitButton } from "../components/Form/FormSubmitButton";
import { useUser } from "../context/UserContext";

const nameSchema = z.object({
  name: z.string().min(2, "שם חייב להכיל לפחות 2 תווים"),
});

export const OnboardingPage = () => {
  const { updateUserName } = useUser();
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = nameSchema.safeParse({ name });

      if (!result.success) {
        setError(result.error.errors[0].message);
        return;
      }

      await updateUserName(name);
      setError(null);
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
      <Paper
        id="onboarding-card"
        elevation={3}
        sx={{ p: 4, width: "100%" }}
      >
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

          <FormSubmitButton
            id="onboarding-submit"
            label="בואו נתחיל"
            isLoading={loading}
          />
        </Box>
      </Paper>
    </Container>
  );
};
