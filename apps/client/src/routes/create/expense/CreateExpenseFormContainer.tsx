import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import {
  CreateExpenseInput,
  CreateExpenseInputSchema,
} from "./CreateExpenseInput";
import { useCreateExpenseMutation } from "./hooks/useCreateExpenseMutation";
import { CreateExpenseForm } from "./create-expense-form";
import { getAllGroups } from "../../../services/indexedDbService";
import { getGroupPath } from "../../../paths";

interface CreateExpenseFormContainerProps {}

// Helper to get default values
const getExpenseDefaultInput = (
  groupId?: string
): Partial<CreateExpenseInput> => ({
  description: "",
  date: new Date(),
  currency: "ILS",
  groupId: groupId || "",
  payer: "",
});

export const CreateExpenseFormContainer: React.FC<
  CreateExpenseFormContainerProps
> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { groupId } = useParams<{ groupId?: string }>();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { createExpense, loading, error } = useCreateExpenseMutation();
  const [groupOptions, setGroupOptions] = useState<
    Array<{ value: string; label: string; icon?: string }>
  >([]);
  const [openGroupList, setOpenGroupList] = useState(false);
  const groupFieldRef = useRef<any>(null);

  // Form setup
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateExpenseInput>({
    resolver: zodResolver(CreateExpenseInputSchema),
    defaultValues: getExpenseDefaultInput(groupId),
  });

  // Fetch groups from indexed DB and map to select options
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const groups = await getAllGroups();
        const options = groups.map((group) => ({
          value: group.id.toString(),
          label: group.name,
          icon: "group",
        }));
        setGroupOptions(options);
      } catch (err) {
        console.error("Failed to fetch groups", err);
      }
    };
    fetchGroups();
  }, []);

  const onSubmit = async (data: CreateExpenseInput) => {
    const success = await createExpense(data);
    if (success) {
      setFormSubmitted(true);
    }
  };

  const handleSuccessContinue = () => {
    if (groupId) {
      navigate(getGroupPath(groupId));
    } else {
      navigate("/");
    }
  };

  return (
    <CreateExpenseForm
      groupId={groupId}
      control={control}
      errors={errors}
      loading={loading}
      formSubmitted={formSubmitted}
      groupOptions={groupOptions}
      openGroupList={openGroupList}
      setOpenGroupList={setOpenGroupList}
      groupFieldRef={groupFieldRef}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      handleSuccessContinue={handleSuccessContinue}
    />
  );
};
