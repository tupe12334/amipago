import React from "react";
import { Control, Controller } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FormControl, FormHelperText, InputAdornment } from "@mui/material";

type FormDatePickerProps = {
  label: string;
  name: string;
  control: Control<any>;
  error?: string;
  id?: string;
};

export const FormDatePicker: React.FC<FormDatePickerProps> = ({
  label,
  name,
  control,
  error,
  id = name,
}) => {
  const errorId = `${id}-error`;

  return (
    <FormControl 
      fullWidth 
      error={!!error}
      aria-describedby={error ? errorId : undefined}
      aria-invalid={error ? "true" : "false"}
      aria-errormessage={error ? errorId : undefined}
    >
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <DatePicker
            label={label}
            value={field.value}
            onChange={field.onChange}
            className="form-date-picker"
            slotProps={{
              textField: {
                id: id,
                error: !!error,
                fullWidth: true,
                InputProps: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <i className="fa fa-calendar" aria-hidden="true"></i>
                    </InputAdornment>
                  )
                }
              }
            }}
          />
        )}
      />
      {error && (
        <FormHelperText id={errorId} error role="alert">
          {error}
        </FormHelperText>
      )}
    </FormControl>
  );
};
