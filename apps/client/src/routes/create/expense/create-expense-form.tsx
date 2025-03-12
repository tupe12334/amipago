import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
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

// Default values for the form
const createExpenseDefaultInput: CreateExpenseInput = {
  amount: 0,
  description: "",
  date: new Date(), // Today's date as default
  currency: "ILS",
};

export const CreateExpenseForm: React.FC = () => {
  const { t, i18n } = useTranslation();
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
    defaultValues: createExpenseDefaultInput,
  });

  // Set direction based on language
  useEffect(() => {
    const form = document.querySelector("form");
    if (form) {
      form.dir = i18n.language === "he" ? "rtl" : "ltr";
    }
  }, [i18n.language]);

  return (
    <div className="inset-0 flex items-center justify-center">
      {formSubmitted ? (
        <FormSuccessScreen message={t("expense.success")} />
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 w-full max-w-md"
        >
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
