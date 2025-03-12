import React from "react";

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
} & React.InputHTMLAttributes<HTMLInputElement>;

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  id,
  icon,
  className,
  inputMode,
  ...rest
}) => {
  const errorId = id ? `${id}-error` : undefined;

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
            <i className={`fa fa-${icon} text-gray-400`} aria-hidden="true"></i>
          </div>
        )}
        <input
          id={id}
          inputMode={inputMode}
          aria-describedby={error ? errorId : undefined}
          {...rest}
          className={`w-full rounded-lg border-gray-300 border py-3 ${
            icon ? "pe-10" : "pe-4"
          } ps-4 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition-colors ${className}`}
        />
      </div>
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
  );
};
