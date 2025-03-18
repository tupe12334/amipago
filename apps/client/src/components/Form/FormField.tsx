import React from "react";
import { TextField, TextFieldProps, InputAdornment } from "@mui/material";

type FormFieldProps = {
  label: string;
  error?: string;
  icon?: string;
  inputMode?:
    | "text"
    | "numeric"
    | "decimal"
    | "tel"
    | "email"
    | "url"
    | "search"
    | "none";
} & Omit<TextFieldProps, "error">;

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  id,
  icon,
  className,
  inputMode,
  ...rest
}) => {
  const componentId = id || "form-field";

  return (
    <TextField
      id={componentId}
      label={label}
      error={!!error}
      helperText={error}
      className={`form-field ${className || ""}`}
      inputProps={{
        inputMode,
        "aria-describedby": error ? `${componentId}-error` : undefined,
        "aria-invalid": error ? "true" : "false",
        "aria-errormessage": error ? `${componentId}-error` : undefined,
      }}
      InputProps={{
        endAdornment: icon ? (
          <InputAdornment position="end">
            <i
              id={`${componentId}-icon`}
              className={`fa fa-${icon}`}
              aria-hidden="true"
            />
          </InputAdornment>
        ) : undefined,
      }}
      {...rest}
    />
  );
};
