import React from "react";

type FormSubmitButtonProps = {
  label: string;
  isLoading?: boolean;
  icon?: string;
  loadingIcon?: string;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({
  label,
  isLoading = false,
  icon = "save",
  loadingIcon = "spinner fa-spin",
  className = "",
  ...props
}) => {
  return (
    <button
      type="submit"
      disabled={isLoading || props.disabled}
      className={`flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-lg mt-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-blue-300 ${className}`}
      {...props}
    >
      {isLoading ? (
        <i className={`fa fa-${loadingIcon}`} aria-hidden="true"></i>
      ) : (
        <i className={`fa fa-${icon}`} aria-hidden="true"></i>
      )}
      <span>{label}</span>
    </button>
  );
};
