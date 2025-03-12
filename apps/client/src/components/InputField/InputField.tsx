import React from "react";

type InputFieldProps = {
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  id,
  ...rest
}) => {
  const errorId = id ? `${id}-error` : undefined;

  return (
    <div className="flex flex-col">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        {...rest}
        className="px-2"
        aria-describedby={error ? errorId : undefined}
      />
      {error && (
        <span
          id={errorId}
          className="text-red-500 mt-1 text-start"
          role="alert"
        >
          {error}
        </span>
      )}
    </div>
  );
};
