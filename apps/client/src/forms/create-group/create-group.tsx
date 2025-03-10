import { CreateGroupInput, CreateGroupInputSchema } from "./create-group-input";
import { SubmitHandler, useForm } from "react-hook-form";

export const CreateGroupForm = () => {
  const onSubmit: SubmitHandler<CreateGroupInput> = (rawData) => {
    const data = CreateGroupInputSchema.parse(rawData);
    console.log(data);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateGroupInput>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <button type="submit">dsaf</button>
    </form>
  );
};
