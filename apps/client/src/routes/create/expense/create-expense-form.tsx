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

// Default values for the form
const createExpenseDefaultInput: CreateExpenseInput = {
  amount: 0,
  description: "",
  date: new Date(),
  currency: "ILS",
};

export const CreateExpenseForm: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

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

          <InputField
            label="תאריך:"
            id="date"
            type="date"
            error={errors.date?.message}
            {...register("date")}
            defaultValue={new Date().toISOString().split("T")[0]}
          />

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
