import { CreateGroupInput, CreateGroupInputSchema } from "./CreateGroupInput";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "../../components/InputField/InputField";
import { ButtonGroup } from "../../components/ButtonGroup/ButtonGroup";

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
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center">
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
        {/* Added type input using ButtonGroup */}
        <Controller
          control={control}
          name="type"
          defaultValue="סוג 1"
          render={({ field }) => (
            <ButtonGroup
              options={[
                { value: "סוג 1", label: "סוג 1" },
                { value: "סוג 2", label: "סוג 2" },
              ]}
              selected={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 ps-4 pe-4 rounded"
        >
          צור קבוצה
        </button>
      </form>
    </div>
  );
};
