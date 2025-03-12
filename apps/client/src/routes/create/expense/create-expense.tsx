import { CreateHeader } from "../Header";
import { CreateExpenseForm } from "./create-expense-form";
import { useTranslation } from "react-i18next";

export const CreateExpensePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col h-screen">
      <CreateHeader title={t("expense.title")} />
      <div className="flex-1 overflow-auto p-4">
        <CreateExpenseForm />
      </div>
    </div>
  );
};
