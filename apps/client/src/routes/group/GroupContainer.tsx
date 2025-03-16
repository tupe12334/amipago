import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { StorageExpense } from "../../models/StorageExpense";
import { StorageGroup } from "../../models/StorageGroup";
import { getCreateExpenseForGroupPath } from "../../paths";
import {
  getExpensesByGroupId,
  getGroupById,
} from "../../services/indexedDbService";
import { GroupPageView } from "./";

export const GroupContainer = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  const [group, setGroup] = useState<StorageGroup | null>(null);
  const [expenses, setExpenses] = useState<StorageExpense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!groupId) {
        setError("מזהה קבוצה לא נמצא");
        setLoading(false);
        return;
      }
      try {
        // Fetch group data
        const groupData = await getGroupById(groupId);
        if (groupData) {
          setGroup(groupData);
          const groupExpenses = await getExpensesByGroupId(groupId);
          setExpenses(groupExpenses);
        } else {
          setError(`הקבוצה עם המזהה "${groupId}" לא נמצאה`);
        }
      } catch (err) {
        setError("אירעה שגיאה בטעינת הקבוצה");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [groupId]);

  const handleBackClick = () => {
    navigate("/");
  };

  const handleAddExpenseClick = () => {
    if (groupId) {
      navigate(getCreateExpenseForGroupPath(groupId));
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("he-IL", {
      style: "currency",
      currency,
    }).format(amount);
  };

  return (
    <GroupPageView
      group={group}
      expenses={expenses}
      loading={loading}
      error={error}
      onBackClick={handleBackClick}
      onAddExpenseClick={handleAddExpenseClick}
      formatCurrency={formatCurrency}
    />
  );
};
