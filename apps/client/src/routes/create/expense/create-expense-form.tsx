import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateExpenseInput,
  CreateExpenseInputSchema,
} from "./CreateExpenseInput";
import { ButtonGroup } from "../../../components/ButtonGroup/ButtonGroup";
import { InputField } from "../../../components/InputField/InputField";
import { Currencies } from "../../../models/Currencies";
import { useState } from "react";
import { useTranslation } from "react-i18next";

// Default values for the form
const createExpenseDefaultInput: CreateExpenseInput = {
  amount: 0,
  description: "",
  date: new Date(),
  currency: "ILS",
};

export const CreateExpenseForm: React.FC = () => {
  const { i18n } = useTranslation();
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
          <i
            className="fa fa-check-circle text-5xl text-green-500"
            aria-hidden="true"
          ></i>
          <p className="text-xl">ההוצאה נוצרה בהצלחה!</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full max-w-md p-4"
        >
          <InputField
            label="סכום:"
            id="amount"
            type="number"
            step="0.01"
            placeholder="הכנס סכום"
            error={errors.amount?.message}
            {...register("amount")}
          />

          <InputField
            label="תיאור:"
            id="description"
            placeholder="הכנס תיאור הוצאה"
            error={errors.description?.message}
            {...register("description")}
          />

          <div className="flex flex-col">
            <label htmlFor="date">תאריך:</label>
            <div className="flex flex-col">
              <Controller
                control={control}
                name="date"
                render={({ field }) => (
                  <input
                    id="date"
                    type="date"
                    className="px-2"
                    value={formatDateForInput(field.value)}
                    onChange={(e) => {
                      field.onChange(parseDateFromInput(e.target.value));
                    }}
                  />
                )}
              />
              {errors.date?.message && (
                <span className="text-red-500 mt-1 text-start">
                  {errors.date?.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <label>מטבע:</label>
            <Controller
              control={control}
              name="currency"
              render={({ field }) => (
                <ButtonGroup<Currencies>
                  options={[
                    { value: "ILS", label: "₪ שקל" },
                    { value: "USD", label: "$ דולר" },
                  ]}
                  selected={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.currency?.message && (
              <span className="text-red-500 mt-1 text-start">
                {errors.currency?.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
          >
            <div className="flex items-center justify-center gap-2">
              <i className="fa fa-save" aria-hidden="true"></i>
              <span>שמור הוצאה</span>
            </div>
          </button>
        </form>
      )}
    </div>
  );
};
