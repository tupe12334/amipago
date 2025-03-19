import { useState } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, CircularProgress } from "@mui/material";
import { CreateGroupDefaultInput } from "./CreateGroupDefaultInput";
import { CreateGroupInput, CreateGroupInputSchema } from "./CreateGroupInput";
import { GroupType } from "../../../models/GroupType";
import { FormField } from "../../../components/Form/FormField";
import { FormSelect } from "../../../components/Form/FormSelect";
import { FormSuccessScreen } from "../../../components/Form/FormSuccessScreen";
import { useCreateGroupMutation } from "./hooks/useCreateGroupMutation";
import { auth } from "../../../firebase/config";

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
    const currentUser = auth.currentUser;
    if (!currentUser?.uid) {
      throw new Error("User not authenticated");
    }

    const groupData = { ...data, userId: currentUser.uid };
    const success = await createGroup(groupData);
    if (success) {
      setFormSubmitted(true);
    }
  };

  return (
    <div className="inset-0 flex items-center justify-center">
      {formSubmitted ? (
        <FormSuccessScreen message="הקבוצה נוצרה בהצלחה!" />
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 max-w-md"
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
                  },
                  {
                    value: "FRIENDS" as GroupType,
                    label: "חברים",
                    icon: "users",
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
                  {
                    value: "TRIP" as GroupType,
                    label: "טיול",
                    icon: "plane", // added trip option for travel groups
                  },
                ]}
                selected={field.value}
                onChange={field.onChange}
                error={errors.type?.message}
                aria-describedby={errors.type ? "type-error" : undefined}
              />
            )}
          />

          <Button
            id="create-group-submit"
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading || isSubmitting}
            startIcon={
              loading || isSubmitting ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <i className="fa fa-save" aria-hidden="true"></i>
              )
            }
            fullWidth
            sx={{
              py: 1.5,
              display: "flex",
              gap: 1,
              justifyContent: "center",
            }}
          >
            צור קבוצה
          </Button>
        </form>
      )}
    </div>
  );
};
