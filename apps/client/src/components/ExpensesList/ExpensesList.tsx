import React from "react";
import { ExpenseDto } from "./types";

interface ExpensesListProps {
  expenses: ExpenseDto[];
  formatCurrency: (amount: number, currency: string) => string;
}

export const ExpensesList: React.FC<ExpensesListProps> = ({
  expenses,
  formatCurrency,
}) => {
  if (expenses.length === 0) {
    return (
      <div
        className="text-center py-6 bg-gray-50 rounded"
        id="expenses-empty-state"
      >
        <p className="text-gray-500">אין הוצאות להצגה בקבוצה זו</p>
      </div>
    );
  }

  return (
    <ul
      id="expenses-list"
      className="divide-y divide-gray-200"
      aria-label="רשימת הוצאות"
    >
      {expenses.map((expense) => (
        <li key={expense.id} className="py-3" id={`expense-item-${expense.id}`}>
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium">
                {expense.description || "הוצאה ללא תיאור"}
              </p>
              <p className="text-sm text-gray-500">
                <span>שולם על ידי: {expense.payer}</span>
                <span className="mx-2">•</span>
                <span>
                  {new Date(expense.date).toLocaleDateString("he-IL")}
                </span>
              </p>
            </div>
            <span className="font-bold text-green-600">
              {formatCurrency(expense.amount, expense.currency)}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};
