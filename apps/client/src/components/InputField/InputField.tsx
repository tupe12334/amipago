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
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...rest} />
      {error && <span>{error}</span>}
    </div>
  );
};
