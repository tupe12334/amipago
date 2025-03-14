import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect, useRef } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import ReactDOM from "react-dom";
import {
  CreateExpenseInput,
  CreateExpenseInputSchema,
} from "./CreateExpenseInput";
import { useCreateExpenseMutation } from "./hooks/useCreateExpenseMutation";
import { FormField } from "../../../components/Form/FormField";
import { FormDatePicker } from "../../../components/Form/FormDatePicker";
import { FormSelect } from "../../../components/Form/FormSelect";
import { FormSubmitButton } from "../../../components/Form/FormSubmitButton";
import { FormSuccessScreen } from "../../../components/Form/FormSuccessScreen";
import { getGroupPath } from "../../../paths";
import { getAllGroups } from "../../../services/indexedDbService";

interface CreateExpenseFormProps {
  groupId?: string;
}

// Update default values to include 'payer'
const getExpenseDefaultInput = (
  groupId?: string
): Partial<CreateExpenseInput> => ({
  description: "",
  date: new Date(), // Today's date as default
  currency: "ILS",
  groupId: groupId || "",
  payer: "",
});

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
              id={`expense-group-modal-option-${option.value}`}
              onClick={() => {
                onSelect(option.value);
                onClose();
              }}
              className="w-full text-start px-4 py-2 hover:bg-gray-200"
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

export const CreateExpenseForm: React.FC<CreateExpenseFormProps> = ({
  groupId,
}) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { createExpense, loading, error } = useCreateExpenseMutation();
  const [groupOptions, setGroupOptions] = useState<
    Array<{ value: string; label: string; icon?: string }>
  >([]);
  const [openGroupList, setOpenGroupList] = useState(false);
  const groupFieldRef = useRef<any>(null);

  // Fetch groups from indexed DB and map to select options
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const groups = await getAllGroups();
        const options = groups.map((group) => ({
          value: group.id.toString(), // converting id to string
          label: group.name, // assuming each group has a 'name' property
          icon: "group",
        }));
        setGroupOptions(options);
      } catch (err) {
        console.error("Failed to fetch groups", err);
      }
    };
    fetchGroups();
  }, []);

  const onSubmit: SubmitHandler<CreateExpenseInput> = async (data) => {
    const success = await createExpense(data);
    if (success) {
      setFormSubmitted(true);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateExpenseInput>({
    resolver: zodResolver(CreateExpenseInputSchema),
    defaultValues: getExpenseDefaultInput(groupId),
  });

  const handleSuccessContinue = () => {
    if (groupId) {
      // If expense was created for a specific group, navigate back to that group
      navigate(getGroupPath(groupId));
    } else {
      // Otherwise, navigate to home
      navigate("/");
    }
  };

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
                // Store field in ref so modal (outside the form) can update it.
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

          <FormSubmitButton label={t("expense.save")} isLoading={loading} />
        </form>
      )}
      {/* Render modal outside the form */}
      {openGroupList && groupFieldRef.current && (
        <GroupSelectorModal
          options={groupOptions}
          selectedValue={groupFieldRef.current.value}
          onSelect={(value: string) => groupFieldRef.current.onChange(value)}
          onClose={() => setOpenGroupList(false)}
        />
      )}
    </div>
  );
};
