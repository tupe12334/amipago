import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  CreateExpenseInput,
  CreateExpenseInputSchema,
} from "./CreateExpenseInput";

// Default values for the form
const createExpenseDefaultInput: CreateExpenseInput = {
  amount: 0,
  description: "",
  date: new Date(),
  currency: "ILS",
};

export const CreateExpenseForm: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Format the date according to the user's locale
  const formatDateForInput = (date: Date): string => {
    return date
      .toLocaleDateString(i18n.language, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .split("/")
      .reverse()
      .join("-"); // Convert to YYYY-MM-DD for HTML date input
  };

  // Parse the date from the locale format back to a Date object
  const parseDateFromInput = (dateString: string): Date => {
    return new Date(dateString);
  };

  const onSubmit: SubmitHandler<CreateExpenseInput> = (data) => {
    // TODO: implement create expense with server graphql mutation
    console.log(data);
    setFormSubmitted(true);
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

  return (
    <div className="inset-0 flex items-center justify-center">
      {formSubmitted ? (
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <i
              className="fa fa-check-circle text-4xl text-green-500"
              aria-hidden="true"
            ></i>
          </div>
          <p className="text-xl font-bold">{t("expense.success")}</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 w-full max-w-md"
        >
          {/* Amount Field */}
          <div className="flex flex-col">
            <label
              htmlFor="amount"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              {t("expense.amount")}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                <i className="fa fa-money text-gray-400" aria-hidden="true"></i>
              </div>
              <input
                id="amount"
                type="number"
                step="0.01"
                placeholder={t("expense.placeholder.amount")}
                className="w-full rounded-lg border-gray-300 border py-3 pe-10 ps-4 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition-colors"
                {...register("amount")}
              />
            </div>
            {errors.amount?.message && (
              <span className="text-red-500 text-sm mt-1 text-start">
                {errors.amount?.message}
              </span>
            )}
          </div>

          {/* Description Field */}
          <div className="flex flex-col">
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              {t("expense.description")}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                <i
                  className="fa fa-file-text text-gray-400"
                  aria-hidden="true"
                ></i>
              </div>
              <input
                id="description"
                placeholder={t("expense.placeholder.description")}
                className="w-full rounded-lg border-gray-300 border py-3 pe-10 ps-4 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition-colors"
                {...register("description")}
              />
            </div>
            {errors.description?.message && (
              <span className="text-red-500 text-sm mt-1 text-start">
                {errors.description?.message}
              </span>
            )}
          </div>

          {/* Date Field */}
          <div className="flex flex-col">
            <label
              htmlFor="date"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              {t("expense.date")}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                <i
                  className="fa fa-calendar text-gray-400"
                  aria-hidden="true"
                ></i>
              </div>
              <Controller
                control={control}
                name="date"
                render={({ field }) => (
                  <input
                    id="date"
                    type="date"
                    className="w-full rounded-lg border-gray-300 border py-3 pe-10 ps-4 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none transition-colors"
                    value={formatDateForInput(field.value)}
                    onChange={(e) => {
                      field.onChange(parseDateFromInput(e.target.value));
                    }}
                  />
                )}
              />
              {errors.date?.message && (
                <span className="text-red-500 text-sm mt-1 text-start">
                  {errors.date?.message}
                </span>
              )}
            </div>
          </div>

          {/* Currency Field */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              {t("expense.currency")}
            </label>
            <Controller
              control={control}
              name="currency"
              render={({ field }) => (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => field.onChange("ILS")}
                    className={`flex items-center justify-center gap-2 py-3 rounded-lg border transition-all ${
                      field.value === "ILS"
                        ? "bg-blue-50 border-blue-500 text-blue-700 font-medium"
                        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <i className="fa fa-shekel" aria-hidden="true"></i>
                    <span>₪ שקל</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => field.onChange("USD")}
                    className={`flex items-center justify-center gap-2 py-3 rounded-lg border transition-all ${
                      field.value === "USD"
                        ? "bg-blue-50 border-blue-500 text-blue-700 font-medium"
                        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <i className="fa fa-dollar" aria-hidden="true"></i>
                    <span>$ דולר</span>
                  </button>
                </div>
              )}
            />
            {errors.currency?.message && (
              <span className="text-red-500 text-sm mt-1 text-start">
                {errors.currency?.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-lg mt-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            <i className="fa fa-save" aria-hidden="true"></i>
            <span>{t("expense.save")}</span>
          </button>
        </form>
      )}
    </div>
  );
};
