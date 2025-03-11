import { CreateGroupInput, CreateGroupInputSchema } from "./CreateGroupInput";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "../../components/InputField/InputField";
import { ButtonGroup } from "../../components/ButtonGroup/ButtonGroup";
import { GroupType } from "../../models/GroupType";
import { CreateGroupDefaultInput } from "./CreateGroupDefaultInput";

export const CreateGroupForm = () => {
  const onSubmit: SubmitHandler<CreateGroupInput> = (data) => {
    console.log(data);
  };

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateGroupInput>({
    resolver: zodResolver(CreateGroupInputSchema),
    defaultValues: CreateGroupDefaultInput,
  });

  return (
    <div className="inset-0 flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <InputField
          id="name"
          placeholder="הכנס שם קבוצה"
          label="שם קבוצה:"
          error={errors.name?.message}
          {...register("name")}
        />
        <InputField
          id="description"
          placeholder="הכנס תיאור קבוצה"
          label="תיאור:"
          error={errors.description?.message}
          {...register("description")}
        />
        <Controller
          control={control}
          name="type"
          render={({ field }) => (
            <ButtonGroup<GroupType>
              options={[
                { value: "GENERAL" as GroupType, label: "כללי" },
                { value: "FRIENDS" as GroupType, label: "חברים" },
                { value: "HOUSEHOLD" as GroupType, label: "משק בית" },
                { value: "WORK" as GroupType, label: "עבודה" },
              ]}
              selected={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          צור קבוצה
        </button>
      </form>
    </div>
  );
};
