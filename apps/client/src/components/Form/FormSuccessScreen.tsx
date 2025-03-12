/**
 * @file This component is used to display a success message after a form submission.
 * It displays a message and an icon to indicate the success state.
 * After 2 seconds, the success message will disappear and the page will return to the main page.
 */
import React from "react";

interface FormSuccessScreenProps {
  message: string;
  icon?: string;
}

export const FormSuccessScreen: React.FC<FormSuccessScreenProps> = ({
  message,
  icon = "check-circle",
}) => {
  return (
    <div id="form-success-screen" className="flex flex-col items-center gap-4">
      <div
        id="success-icon-container"
        className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4"
      >
        <i
          id="success-icon"
          className={`fa fa-${icon} text-4xl text-green-500`}
          role="img"
          aria-label="Success icon"
        ></i>
      </div>
      <p id="success-message" className="text-xl font-bold" aria-live="polite">
        {message}
      </p>
    </div>
  );
};
