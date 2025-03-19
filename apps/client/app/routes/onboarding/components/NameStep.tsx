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

const nameSchema = z.object({
  name: z.string().min(2, "שם חייב להכיל לפחות 2 תווים"),
});

interface NameStepProps {
  onSubmit: (name: string) => Promise<void>;
}

export const NameStep = ({ onSubmit }: NameStepProps) => {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = nameSchema.safeParse({ name });
      if (!result.success) {
        setError(result.error.errors[0].message);
        return;
      }
      await onSubmit(name);
    } catch (err) {
      setError("אירעה שגיאה. אנא נסה שנית.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Typography
        id="onboarding-name-description"
        variant="body1"
        align="center"
        sx={{ mb: 4 }}
      >
        איך נוכל לקרוא לך?
      </Typography>

      <Box
        component="form"
        id="onboarding-name-form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
      >
        <TextField
          id="user-name-input"
          name="name"
          label="שם"
          placeholder="הזן את שמך כאן"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!error}
          helperText={error}
          required
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <i className="fa fa-user" aria-hidden="true"></i>
              </InputAdornment>
            ),
          }}
        />

        <Button
          id="onboarding-name-submit"
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          startIcon={
            loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <i className="fa fa-check" aria-hidden="true"></i>
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
          סיים הרשמה
        </Button>
      </Box>
    </>
  );
};
