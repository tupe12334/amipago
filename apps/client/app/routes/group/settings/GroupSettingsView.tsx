import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Controller } from "react-hook-form";
import { Control } from "react-hook-form";
import { FormSelect } from "../../../components/Form/FormSelect";
import { GroupType } from "../../../models/GroupType";
import { GroupSettingsInput } from "./GroupSettingsInput";

interface GroupSettingsViewProps {
  control: Control<GroupSettingsInput>;
  errors: Record<string, any>;
  onSave: () => void;
  onDelete: () => void;
  onCancel: () => void;
  loading: boolean;
}

export const GroupSettingsView = ({
  control,
  errors,
  onSave,
  onDelete,
  onCancel,
  loading,
}: GroupSettingsViewProps) => {
  return (
    <Box
      id="group-settings-page"
      component="form"
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      role="main"
      aria-label="הגדרות קבוצה"
    >
      <Box
        id="group-settings-header"
        component="header"
        p={2}
        display="flex"
        justifyContent="start"
        gap={2}
        alignItems="center"
        borderBottom={1}
        borderColor="grey.300"
      >
        <Button
          id="settings-back-button"
          onClick={onCancel}
          startIcon={<i className="fa fa-arrow-right" aria-hidden="true"></i>}
          color="primary"
          aria-label="חזור לדף הקבוצה"
        >
          חזור
        </Button>
        <Typography id="settings-title" variant="h4" fontWeight="bold">
          הגדרות קבוצה
        </Typography>
      </Box>

      <Box id="settings-content" p={3} flexGrow={1}>
        <Box
          display="flex"
          flexDirection="column"
          gap={3}
          maxWidth="md"
          mx="auto"
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id="group-name-input"
                label="שם הקבוצה"
                error={!!errors.name}
                helperText={errors.name?.message}
                fullWidth
                aria-required="true"
                aria-describedby={errors.name ? "name-error" : undefined}
                InputProps={{
                  startAdornment: (
                    <i
                      className="fa fa-users"
                      aria-hidden="true"
                      style={{ marginInlineEnd: "0.5rem" }}
                    ></i>
                  ),
                }}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id="group-description-input"
                label="תיאור"
                multiline
                rows={3}
                error={!!errors.description}
                helperText={errors.description?.message}
                fullWidth
                aria-describedby={
                  errors.description ? "description-error" : undefined
                }
                InputProps={{
                  startAdornment: (
                    <i
                      className="fa fa-info-circle"
                      aria-hidden="true"
                      style={{ marginInlineEnd: "0.5rem" }}
                    ></i>
                  ),
                }}
              />
            )}
          />

          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <FormSelect
                id="group-type-select"
                label="סוג קבוצה"
                options={[
                  {
                    value: "GENERAL" as GroupType,
                    label: "כללי",
                    icon: "circle",
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
                  { value: "TRIP" as GroupType, label: "טיול", icon: "plane" },
                ]}
                selected={field.value}
                onChange={field.onChange}
                error={errors.type?.message}
                aria-describedby={errors.type ? "type-error" : undefined}
              />
            )}
          />

          <Box display="flex" flexDirection="column" gap={2} mt={4}>
            <Button
              id="save-settings-button"
              onClick={onSave}
              variant="contained"
              color="primary"
              disabled={loading}
              startIcon={
                loading ? (
                  <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>
                ) : (
                  <i className="fa fa-save" aria-hidden="true"></i>
                )
              }
              aria-label="שמור שינויים"
            >
              שמור שינויים
            </Button>

            <Button
              id="delete-group-button"
              onClick={onDelete}
              variant="outlined"
              color="error"
              disabled={loading}
              startIcon={<i className="fa fa-trash" aria-hidden="true"></i>}
              aria-label="מחק קבוצה"
            >
              מחק קבוצה
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
