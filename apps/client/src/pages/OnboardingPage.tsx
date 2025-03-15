import { useState } from "react";
import { z } from "zod";
import { FormField } from "../components/Form/FormField";
import { FormSubmitButton } from "../components/Form/FormSubmitButton";
import { useUser } from "../context/UserContext";

const nameSchema = z.object({
  name: z.string().min(2, "שם חייב להכיל לפחות 2 תווים"),
});

export const OnboardingPage = () => {
  const { updateUserName } = useUser();
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = nameSchema.safeParse({ name });

      if (!result.success) {
        setError(result.error.errors[0].message);
        return;
      }

      await updateUserName(name);
      setError(null);
    } catch (err) {
      setError("אירעה שגיאה. אנא נסה שנית.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="onboarding-container"
      className="flex flex-col items-center justify-center min-h-screen p-6"
    >
      <div
        id="onboarding-card"
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md"
      >
        <h1
          id="onboarding-title"
          className="text-2xl font-bold mb-6 text-center"
        >
          ברוכים הבאים ל-AmiPago
        </h1>

        <p id="onboarding-description" className="mb-8 text-center">
          לפני שנתחיל, אנחנו צריכים לדעת מה שמך
        </p>

        <form
          id="onboarding-form"
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
        >
          <FormField
            id="user-name-input"
            name="name"
            label="שם"
            placeholder="הזן את שמך כאן"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={error || undefined}
            icon="user"
            aria-required="true"
          />

          <FormSubmitButton
            id="onboarding-submit"
            label="בואו נתחיל"
            isLoading={loading}
          />
        </form>
      </div>
    </div>
  );
};
