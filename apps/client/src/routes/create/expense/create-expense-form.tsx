import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import {
  CreateExpenseInput,
  CreateExpenseInputSchema,
} from "./CreateExpenseInput";
import { useCreateExpenseMutation } from "./hooks/useCreateExpenseMutation";
import { FormField } from "../../../components/Form/FormField";
import { FormDatePicker } from "../../../components/Form/FormDatePicker";
import { FormSelect } from "../../../components/Form/FormSelect";
import { FormSubmitButton } from "../../../components/Form/FormSubmitButton";
import { FormSuccessScreen } from "../../../components/Form/FormSuccessScreen";
import { getGroupPath } from "../../../paths";

interface CreateExpenseFormProps {
  groupId?: string;
}

// Default values for the form
const getExpenseDefaultInput = (groupId?: string): CreateExpenseInput => ({
  amount: 0,
  description: "",
  date: new Date(), // Today's date as default
  currency: "ILS",
  groupId: groupId,
});

export const CreateExpenseForm: React.FC<CreateExpenseFormProps> = ({
  groupId,
}) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { createExpense, loading, error } = useCreateExpenseMutation();

  const onSubmit: SubmitHandler<CreateExpenseInput> = async (data) => {
    const success = await createExpense(data);
    if (success) {
      setFormSubmitted(true);
    }
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateExpenseInput>({
    resolver: zodResolver(CreateExpenseInputSchema),
    defaultValues: getExpenseDefaultInput(groupId),
  });

  // Set direction based on language
  useEffect(() => {
    const form = document.querySelector("form");
    if (form) {
      form.dir = i18n.language === "he" ? "rtl" : "ltr";
    }
  }, [i18n.language]);

  const handleSuccessContinue = () => {
    if (groupId) {
      // If expense was created for a specific group, navigate back to that group
      navigate(getGroupPath(groupId));
    } else {
      // Otherwise, navigate to home
      navigate("/");
    }
  };

  return (
    <div className="inset-0 flex items-center justify-center">
      {formSubmitted ? (
        <div className="w-full max-w-md">
          <FormSuccessScreen
            message={t("expense.success")}
            actionButton={
              <button
                onClick={handleSuccessContinue}
                className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors"
                id="expense-success-continue"
              >
                {groupId ? "חזור לקבוצה" : "חזור לדף הבית"}
              </button>
            }
          />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 w-full max-w-md"
          id="expense-form"
        >
          {/* Hidden input for groupId */}
          <input type="hidden" {...register("groupId")} />

          <FormField
            id="amount"
            label={t("expense.amount")}
            type="number"
            step="0.01"
            min="0.01"
            placeholder={t("expense.placeholder.amount")}
            icon="money"
            error={errors.amount?.message}
            inputMode="decimal"
            pattern="[0-9]*\.?[0-9]+"
            {...register("amount", { valueAsNumber: true })}
          />

          <FormField
            id="description"
            label={t("expense.description")}
            placeholder={t("expense.placeholder.description")}
            icon="file-text"
            error={errors.description?.message}
            {...register("description")}
          />

          <FormDatePicker
            label={t("expense.date")}
            name="date"
            control={control}
            error={errors.date?.message}
          />

          <Controller
            control={control}
            name="currency"
            render={({ field }) => (
              <FormSelect
                label={t("expense.currency")}
                options={[
                  { value: "ILS", label: t("currencies.ILS"), icon: "shekel" },
                  { value: "USD", label: t("currencies.USD"), icon: "dollar" },
                ]}
                selected={field.value}
                onChange={field.onChange}
                error={errors.currency?.message}
              />
            )}
          />

          <FormSubmitButton label={t("expense.save")} isLoading={loading} />
        </form>
      )}
    </div>
  );
};
