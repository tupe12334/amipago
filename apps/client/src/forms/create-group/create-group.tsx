import { CreateGroupInput, CreateGroupInputSchema } from "./CreateGroupInput";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
    formState: { errors },
  } = useForm<CreateGroupInput>({
    resolver: zodResolver(CreateGroupInputSchema),
    defaultValues: CreateGroupDefaultInput,
  });

  return (
    <div className="inset-0 flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="name">שם קבוצה:</label>
          <input
            id="name"
            placeholder="הכנס שם קבוצה"
            {...register("name")}
            className="px-2"
          />
          {errors.name?.message && (
            <span className="text-red-500 mt-1 text-start">
              {errors.name?.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="description">תיאור:</label>
          <input
            id="description"
            placeholder="הכנס תיאור קבוצה"
            {...register("description")}
            className="px-2"
          />
          {errors.description?.message && (
            <span className="text-red-500 mt-1 text-start">
              {errors.description?.message}
            </span>
          )}
        </div>
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
