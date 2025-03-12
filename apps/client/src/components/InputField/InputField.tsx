import React, { useId } from "react";

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
  const generatedId = useId();
  const componentId = id || `input-field-${generatedId}`;
  const errorId = `${componentId}-error`;

  return (
    <div id={`${componentId}-container`} className="flex flex-col">
      <label id={`${componentId}-label`} htmlFor={componentId}>
        {label}
      </label>
      <input
        id={componentId}
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
