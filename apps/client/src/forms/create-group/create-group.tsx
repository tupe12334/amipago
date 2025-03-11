import { CreateGroupInput, CreateGroupInputSchema } from "./create-group-input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "../../components/InputField/InputField";

export const CreateGroupForm = () => {
  const onSubmit: SubmitHandler<CreateGroupInput> = (data) => {
    console.log(data);
  };

  const {
    register,
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
