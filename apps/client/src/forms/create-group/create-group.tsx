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
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        id="name"
        placeholder="הכנס שם קבוצה"
        label="שם קבוצה:"
        error={errors.name?.message}
        {...register("name")}
      />
      <button type="submit">צור קבוצה</button>
    </form>
  );
};
