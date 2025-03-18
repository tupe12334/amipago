/**
 * @file This component is used to display a success message after a form submission.
 * It displays a message and an icon to indicate the success state.
 * After 2 seconds, the success message will disappear and the page will return to the main page.
 */
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { Box, Typography, Paper } from "@mui/material";

interface FormSuccessScreenProps {
  message: string;
  icon?: string;
}

export const FormSuccessScreen: React.FC<FormSuccessScreenProps> = ({
  message,
  icon = "check-circle",
}) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <Box
      id="form-success-screen"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={4}
    >
      <Paper
        id="success-icon-container"
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '4rem',
          height: '4rem',
          borderRadius: '50%',
          bgcolor: 'success.light',
          mb: 4
        }}
      >
        <i
          id="success-icon"
          className={`fa fa-${icon}`}
          style={{ fontSize: '2.5rem', color: 'rgb(34, 197, 94)' }}
          role="img"
          aria-label="Success icon"
        ></i>
      </Paper>
      <Typography
        id="success-message"
        variant="h5"
        fontWeight="bold"
        aria-live="polite"
      >
        {message}
      </Typography>
    </Box>
  );
};
