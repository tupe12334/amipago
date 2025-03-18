import React from "react";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  ToggleButtonGroup,
  ToggleButton,
  Grid,
} from "@mui/material";

type Option<T extends string> = {
  value: T;
  label: string;
  icon?: string;
};

type FormSelectProps<T extends string> = {
  label: string;
  options: Option<T>[];
  selected: T;
  onChange: (value: T) => void;
  error?: string;
  columns?: number;
  id?: string;
};

export const FormSelect = <T extends string>({
  label,
  options,
  selected,
  onChange,
  error,
  columns = 2,
  id,
}: FormSelectProps<T>) => {
  const selectId = id || `select-${label.replace(/\s+/g, "-").toLowerCase()}`;
  const errorId = `${selectId}-error`;

  const handleChange = (_event: React.MouseEvent<HTMLElement>, value: T) => {
    if (value !== null) {
      onChange(value);
    }
  };

  return (
    <FormControl
      error={!!error}
      fullWidth
      aria-describedby={error ? errorId : undefined}
      aria-invalid={error ? "true" : "false"}
      aria-errormessage={error ? errorId : undefined}
    >
      <FormLabel id={selectId}>{label}</FormLabel>
      <Grid container spacing={2} columns={12}>
        <ToggleButtonGroup
          value={selected}
          exclusive
          onChange={handleChange}
          aria-labelledby={selectId}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
            mt: 1,
          }}
        >
          {options.map((option) => (
            <Grid item xs={12 / columns} key={option.value}>
              <ToggleButton
                value={option.value}
                aria-checked={selected === option.value}
                fullWidth
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 1,
                  py: 1.5,
                }}
              >
                {option.icon && (
                  <i className={`fa fa-${option.icon}`} aria-hidden="true"></i>
                )}
                <span>{option.label}</span>
              </ToggleButton>
            </Grid>
          ))}
        </ToggleButtonGroup>
      </Grid>
      {error && (
        <FormHelperText id={errorId} error role="alert">
          {error}
        </FormHelperText>
      )}
    </FormControl>
  );
};
