import {
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormHandleSubmit,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormDatePicker } from "../../../components/Form/FormDatePicker";
import { FormSelect } from "../../../components/Form/FormSelect";
import { FormSuccessScreen } from "../../../components/Form/FormSuccessScreen";
import { CreateExpenseInput } from "./CreateExpenseInput";

interface CreateExpenseFormProps {
  groupId?: string;
  control: Control<CreateExpenseInput>;
  errors: FieldErrors<CreateExpenseInput>;
  loading: boolean;
  formSubmitted: boolean;
  groupOptions: Array<{ value: string; label: string; icon?: string }>;
  openGroupList: boolean;
  setOpenGroupList: (open: boolean) => void;
  groupFieldRef: React.MutableRefObject<any>;
  handleSubmit: UseFormHandleSubmit<CreateExpenseInput>;
  onSubmit: (data: CreateExpenseInput) => Promise<void>;
}

export const CreateExpenseForm: React.FC<CreateExpenseFormProps> = ({
  groupId,
  control,
  errors,
  loading,
  formSubmitted,
  groupOptions,
  openGroupList,
  setOpenGroupList,
  groupFieldRef,
  handleSubmit,
  onSubmit,
}) => {
  const { t } = useTranslation();

  return (
    <div className="inset-0 flex items-center justify-center">
      {formSubmitted ? (
        <div className="w-full max-w-md">
          <FormSuccessScreen message={t("expense.success")} />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 w-full max-w-md"
          id="expense-form"
        >
          {/* Controller for payer */}
          <Controller
            control={control}
            name="payer"
            render={({ field, fieldState: { error } }) => (
              <>
                <TextField
                  id="expense-payer"
                  label={t("expense.payer")}
                  placeholder={t("expense.placeholder.payer")}
                  error={!!error}
                  helperText={error?.message}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <i className="fa fa-user" aria-hidden="true" />
                      </InputAdornment>
                    ),
                  }}
                  aria-describedby={error ? "expense-payer-error" : undefined}
                  aria-invalid={error ? "true" : "false"}
                  {...field}
                />
              </>
            )}
          />

          {groupId ? (
            // Use hidden input if group is preset via URL
            <Controller
              control={control}
              name="groupId"
              render={({ field }) => <input type="hidden" {...field} />}
            />
          ) : (
            <Controller
              control={control}
              name="groupId"
              render={({ field, fieldState: { error } }) => {
                groupFieldRef.current = field;
                const selectedOption = groupOptions.find(
                  (option) => option.value === field.value
                );
                return (
                  <>
                    <Button
                      id="expense-group-button"
                      onClick={() => setOpenGroupList(true)}
                      variant="outlined"
                      fullWidth
                      sx={{ justifyContent: "space-between", py: 1.5 }}
                      endIcon={
                        <i
                          className="fa fa-chevron-down"
                          aria-hidden="true"
                        ></i>
                      }
                      aria-haspopup="listbox"
                      aria-expanded={openGroupList}
                    >
                      {selectedOption
                        ? selectedOption.label
                        : t("expense.groupSelector")}
                    </Button>
                    {error && (
                      <div
                        className="error-message"
                        id="expense-group-error"
                        aria-live="polite"
                      >
                        {error.message}
                      </div>
                    )}
                    <Dialog
                      open={openGroupList}
                      onClose={() => setOpenGroupList(false)}
                      aria-labelledby="group-dialog-title"
                    >
                      <DialogTitle id="group-dialog-title">
                        {t("expense.groupSelector")}
                      </DialogTitle>
                      <DialogContent>
                        <List
                          role="listbox"
                          aria-label={t("expense.groupSelector")}
                        >
                          {groupOptions.map((option) => (
                            <ListItem key={option.value} disablePadding>
                              <ListItemButton
                                id={`expense-group-option-${option.value}`}
                                onClick={() => {
                                  field.onChange(option.value);
                                  setOpenGroupList(false);
                                }}
                                selected={field.value === option.value}
                                role="option"
                                aria-selected={field.value === option.value}
                              >
                                <ListItemText primary={option.label} />
                              </ListItemButton>
                            </ListItem>
                          ))}
                        </List>
                      </DialogContent>
                    </Dialog>
                  </>
                );
              }}
            />
          )}

          <Controller
            control={control}
            name="amount"
            render={({ field, fieldState: { error } }) => (
              <>
                <TextField
                  id="amount"
                  label={t("expense.amount")}
                  type="number"
                  placeholder={t("expense.placeholder.amount")}
                  error={!!error}
                  helperText={error?.message}
                  fullWidth
                  inputProps={{
                    inputMode: "decimal",
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <i className="fa fa-money" aria-hidden="true" />
                      </InputAdornment>
                    ),
                  }}
                  aria-describedby={error ? "amount-error" : undefined}
                  aria-invalid={error ? "true" : "false"}
                  {...field}
                />
              </>
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field, fieldState: { error } }) => (
              <TextField
                id="description"
                label={t("expense.description")}
                placeholder={t("expense.placeholder.description")}
                error={!!error}
                helperText={error?.message}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <i className="fa fa-file-text" aria-hidden="true" />
                    </InputAdornment>
                  ),
                }}
                aria-describedby={error ? "description-error" : undefined}
                aria-invalid={error ? "true" : "false"}
                {...field}
              />
            )}
          />

          <FormDatePicker
            id="expense-date"
            label={t("expense.date")}
            name="date"
            control={control}
            error={errors.date?.message}
          />

          <Controller
            control={control}
            name="currency"
            render={({ field }) => (
              <FormSelect
                id="expense-currency"
                label={t("expense.currency")}
                options={[
                  { value: "ILS", label: t("currencies.ILS"), icon: "shekel" },
                  { value: "USD", label: t("currencies.USD"), icon: "dollar" },
                ]}
                selected={field.value}
                onChange={field.onChange}
                error={errors.currency?.message}
              />
            )}
          />

          <Button
            id="expense-submit-button"
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            startIcon={
              loading ? (
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
            {t("expense.save")}
          </Button>
        </form>
      )}
    </div>
  );
};
