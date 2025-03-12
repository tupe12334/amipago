import { useState } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateGroupDefaultInput } from "./CreateGroupDefaultInput";
import { CreateGroupInput, CreateGroupInputSchema } from "./CreateGroupInput";
import { GroupType } from "../../../models/GroupType";
import { FormField } from "../../../components/Form/FormField";
import { FormSelect } from "../../../components/Form/FormSelect";
import { FormSubmitButton } from "../../../components/Form/FormSubmitButton";
import { useCreateGroupMutation } from "./hooks/useCreateGroupMutation";

export const CreateGroupForm = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { createGroup, loading, error } = useCreateGroupMutation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateGroupInput>({
    resolver: zodResolver(CreateGroupInputSchema),
    defaultValues: CreateGroupDefaultInput,
    mode: "onBlur", // Validate on blur to give immediate feedback
  });

  const onSubmit: SubmitHandler<CreateGroupInput> = async (data) => {
    const success = await createGroup(data);
    if (success) {
      setFormSubmitted(true);
    }
  };

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
          <p className="text-xl font-bold" aria-live="polite">
            הקבוצה נוצרה בהצלחה!
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 max-w-md"
          dir="rtl"
        >
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
              role="alert"
              aria-live="assertive"
            >
              <p>{error}</p>
            </div>
          )}

          {/* Pass name attribute to the input components */}
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <FormField
                id="name"
                name="name"
                label="שם קבוצה:"
                placeholder="הכנס שם קבוצה"
                error={errors.name?.message}
                icon="users"
                aria-required="true"
                aria-describedby={errors.name ? "name-error" : undefined}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <FormField
                id="description"
                name="description"
                label="תיאור:"
                placeholder="הכנס תיאור קבוצה"
                error={errors.description?.message}
                icon="info-circle"
                aria-describedby={
                  errors.description ? "description-error" : undefined
                }
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <FormSelect
                label="סוג קבוצה"
                id="type"
                options={[
                  {
                    value: "GENERAL" as GroupType,
                    label: "כללי",
                    icon: "users",
                  },
                  {
                    value: "FRIENDS" as GroupType,
                    label: "חברים",
                    icon: "user-friends",
                  },
                  {
                    value: "HOUSEHOLD" as GroupType,
                    label: "משק בית",
                    icon: "home",
                  },
                  {
                    value: "WORK" as GroupType,
                    label: "עבודה",
                    icon: "briefcase",
                  },
                ]}
                selected={field.value}
                onChange={field.onChange}
                error={errors.type?.message}
                aria-describedby={errors.type ? "type-error" : undefined}
              />
            )}
          />

          <FormSubmitButton
            label="צור קבוצה"
            isLoading={loading || isSubmitting}
          />
        </form>
      )}
    </div>
  );
};
