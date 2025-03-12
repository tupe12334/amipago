import { CreateHeader } from "../Header";
import { CreateExpenseForm } from "./create-expense-form";

export const CreateExpensePage: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <CreateHeader title="הוצאה חדשה" />
      <div className="flex-1 overflow-auto p-4">
        <CreateExpenseForm />
      </div>
    </div>
  );
};
