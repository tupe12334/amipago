import React, { useEffect, useState } from "react";
import { ExpensesList } from "../components/ExpensesList/ExpensesList";
import { NavBar } from "../components/NavBar/NavBar";
import { TopBar } from "../components/TopBar/TopBar";
import { getExpensesSortedByUpdate } from "../services/indexedDbService";

export const RecentActivityView = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExpenses = async () => {
    try {
      const data = await getExpensesSortedByUpdate();
      setExpenses(data);
    } catch (err) {
      setError("Error fetching expenses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <ExpensesList
        expenses={expenses}
        formatCurrency={(amount, currency) =>
          new Intl.NumberFormat("he-IL", {
            style: "currency",
            currency,
          }).format(amount)
        }
      />
    </div>
  );
};
