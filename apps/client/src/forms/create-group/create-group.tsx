import { CreateGroupInput, CreateGroupInputSchema } from "./create-group-input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
      <div>
        <label htmlFor="name">שם קבוצה:</label>
        <input id="name" placeholder="הכנס שם קבוצה" {...register("name")} />
        {errors.name && <span>{errors.name.message}</span>}
      </div>
      <button type="submit">צור קבוצה</button>
    </form>
  );
};
