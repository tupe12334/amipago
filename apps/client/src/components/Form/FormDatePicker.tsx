import React from "react";
import { Control, Controller } from "react-hook-form";

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

  // Format the date according to the user's locale
  const formatDateForInput = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Parse the date from the input format back to a Date object
  const parseDateFromInput = (dateString: string): Date => {
    return new Date(dateString);
  };

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
          <i className="fa fa-calendar text-gray-400" aria-hidden="true"></i>
        </div>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <input
              id={id}
              type="date"
              className="w-full rounded-lg border-gray-300 border py-3 pe-10 ps-4 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition-colors"
              value={formatDateForInput(field.value)}
              onChange={(e) => {
                field.onChange(parseDateFromInput(e.target.value));
              }}
              aria-describedby={error ? errorId : undefined}
            />
          )}
        />
        {error && (
          <span
            id={errorId}
            className="text-red-500 text-sm mt-1 text-start"
            role="alert"
          >
            {error}
          </span>
        )}
      </div>
    </div>
  );
};
