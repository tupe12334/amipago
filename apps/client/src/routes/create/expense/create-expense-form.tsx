import { ReactNode, RefObject } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormHandleSubmit,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import ReactDOM from "react-dom";
import { Button, CircularProgress } from "@mui/material";
import { CreateExpenseInput } from "./CreateExpenseInput";
import { FormField } from "../../../components/Form/FormField";
import { FormDatePicker } from "../../../components/Form/FormDatePicker";
import { FormSelect } from "../../../components/Form/FormSelect";
import { FormSuccessScreen } from "../../../components/Form/FormSuccessScreen";

// New modal component for group selection
const GroupSelectorModal: React.FC<{
  options: Array<{ value: string; label: string; icon?: string }>;
  selectedValue: string;
  onSelect: (value: string) => void;
  onClose: () => void;
}> = ({ options, selectedValue, onSelect, onClose }) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-full max-w-md p-4">
        <h2 className="text-lg font-semibold mb-4">בחר קבוצה</h2>
        <div className="max-h-48 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              id={`expense-group-option-${option.value}`}
              className="expense-group-modal-option w-full text-start px-4 py-2 hover:bg-gray-200"
              onClick={() => {
                onSelect(option.value);
                onClose();
              }}
              role="option"
              aria-selected={selectedValue === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
        <button
          id="expense-group-modal-close"
          type="button"
          onClick={onClose}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded"
        >
          סגור
        </button>
      </div>
    </div>,
    document.body
  );
};

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
  handleSuccessContinue: () => void;
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
  handleSuccessContinue,
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
                <FormField
                  id="expense-payer"
                  label={t("expense.payer")}
                  placeholder={t("expense.placeholder.payer")}
                  icon="user"
                  error={error?.message}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
                {error && (
                  <div
                    className="error-message"
                    id="expense-payer-error"
                    aria-live="polite"
                  >
                    {error.message}
                  </div>
                )}
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
            // Updated group selector rendering only a button
            <Controller
              control={control}
              name="groupId"
              render={({ field, fieldState: { error } }) => {
                // Always store field in ref, removing conditional that was causing issues
                groupFieldRef.current = field;
                const selectedOption = groupOptions.find(
                  (option) => option.value === field.value
                );
                return (
                  <>
                    <button
                      id="expense-group-button"
                      type="button"
                      onClick={() => setOpenGroupList(true)}
                      className="flex items-center justify-between w-full px-4 py-3 border rounded-lg hover:bg-gray-100"
                      aria-haspopup="listbox"
                      aria-expanded={openGroupList}
                    >
                      <span>
                        {selectedOption
                          ? selectedOption.label
                          : t("expense.groupSelector")}
                      </span>
                      <i className="fa fa-chevron-down" aria-hidden="true"></i>
                    </button>
                    {error && (
                      <div
                        className="error-message"
                        id="expense-group-error"
                        aria-live="polite"
                      >
                        {error.message}
                      </div>
                    )}
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
                <FormField
                  id="amount"
                  label={t("expense.amount")}
                  type="number"
                  step="0.01"
                  min="0.01"
                  placeholder={t("expense.placeholder.amount")}
                  icon="money"
                  error={error?.message}
                  inputMode="decimal"
                  pattern="[0-9]*\\.?[0-9]+"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
                {error && (
                  <div
                    className="error-message"
                    id="amount-error"
                    aria-live="polite"
                  >
                    {error.message}
                  </div>
                )}
              </>
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <FormField
                id="description"
                label={t("expense.description")}
                placeholder={t("expense.placeholder.description")}
                icon="file-text"
                error={errors.description?.message}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
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
      {/* Render modal outside the form - remove conditional check on groupFieldRef.current */}
      {openGroupList && (
        <GroupSelectorModal
          options={groupOptions}
          selectedValue={groupFieldRef.current?.value || ""}
          onSelect={(value: string) => {
            if (groupFieldRef.current) {
              groupFieldRef.current.onChange(value);
            }
          }}
          onClose={() => setOpenGroupList(false)}
        />
      )}
    </div>
  );
};
