import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

type InputFieldProps = {
  label: string;
  error?: string;
} & Omit<TextFieldProps, "error">;

export const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  id,
  ...rest
}) => {
  const componentId = id || "input-field";

  return (
    <TextField
      id={componentId}
      label={label}
      error={!!error}
      helperText={error}
      variant="outlined"
      aria-describedby={error ? `${componentId}-error` : undefined}
      aria-invalid={error ? "true" : "false"}
      {...rest}
    />
  );
};
