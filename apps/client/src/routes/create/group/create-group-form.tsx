import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateGroupDefaultInput } from "./CreateGroupDefaultInput";
import { CreateGroupInput, CreateGroupInputSchema } from "./CreateGroupInput";
import { GroupType } from "../../../models/GroupType";
import { FormField } from "../../../components/Form/FormField";
import { FormSelect } from "../../../components/Form/FormSelect";
import { FormSubmitButton } from "../../../components/Form/FormSubmitButton";

export const CreateGroupForm = () => {
  const onSubmit: SubmitHandler<CreateGroupInput> = (data) => {
    // TODO: implement create group with server graphql mutation
    console.log(data);
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateGroupInput>({
    resolver: zodResolver(CreateGroupInputSchema),
    defaultValues: CreateGroupDefaultInput,
  });

  return (
    <div className="inset-0 flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          id="name"
          label="שם קבוצה:"
          placeholder="הכנס שם קבוצה"
          error={errors.name?.message}
          {...register("name")}
        />

        <FormField
          id="description"
          label="תיאור:"
          placeholder="הכנס תיאור קבוצה"
          error={errors.description?.message}
          {...register("description")}
        />

        <Controller
          control={control}
          name="type"
          render={({ field }) => (
            <FormSelect
              label="סוג קבוצה"
              options={[
                { value: "GENERAL" as GroupType, label: "כללי", icon: "users" },
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
            />
          )}
        />

        <FormSubmitButton label="צור קבוצה" />
      </form>
    </div>
  );
};
