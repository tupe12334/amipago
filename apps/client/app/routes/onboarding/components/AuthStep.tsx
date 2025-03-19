import { useState } from "react";
import { z } from "zod";
import {
  Typography,
  Box,
  Button,
  CircularProgress,
  TextField,
  InputAdornment,
} from "@mui/material";

const authSchema = z.object({
  email: z.string().email("כתובת אימייל לא תקינה"),
  password: z.string().min(6, "סיסמה חייבת להכיל לפחות 6 תווים"),
});

interface AuthStepProps {
  onSubmit: (email: string, password: string) => Promise<void>;
}

export const AuthStep = ({ onSubmit }: AuthStepProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = authSchema.safeParse({ email, password });
      if (!result.success) {
        setError(result.error.errors[0].message);
        return;
      }
      await onSubmit(email, password);
    } catch (err) {
      setError("אירעה שגיאה. אנא נסה שנית.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Typography
        id="onboarding-description"
        variant="body1"
        align="center"
        sx={{ mb: 4 }}
      >
        התחבר או הירשם כדי להתחיל
      </Typography>

      <Box
        component="form"
        id="onboarding-auth-form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
      >
        <TextField
          id="user-email-input"
          name="email"
          label="אימייל"
          placeholder="הזן את האימייל שלך כאן"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!error}
          helperText={error}
          required
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <i className="fa fa-envelope" aria-hidden="true"></i>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          id="user-password-input"
          name="password"
          label="סיסמה"
          placeholder="הזן את הסיסמה שלך כאן"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!error}
          helperText={error}
          required
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <i className="fa fa-lock" aria-hidden="true"></i>
              </InputAdornment>
            ),
          }}
        />

        <Button
          id="onboarding-auth-submit"
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          startIcon={
            loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <i className="fa fa-arrow-end" aria-hidden="true"></i>
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
          המשך
        </Button>
      </Box>
    </>
  );
};
