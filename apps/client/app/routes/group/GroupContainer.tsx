import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ErrorView } from "../../components/ErrorView";
import { LoadingView } from "../../components/LoadingView";
import { StorageExpense } from "../../models/StorageExpense";
import { StorageGroup } from "../../models/StorageGroup";
import { getCreateExpenseForGroupPath } from "../../paths";
import {
  getExpensesByGroupId,
  getGroupById,
} from "../../services/indexedDbService";
import { GroupPageView } from ".";

/**
 * Container component for the Group page
 * Manages state, data fetching, and navigation for group details
 */
export const GroupContainer = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  const [group, setGroup] = useState<StorageGroup | null>(null);
  const [expenses, setExpenses] = useState<StorageExpense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    /**
     * Fetches group data and associated expenses
     * Sets error state if group not found or fetch fails
     */
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

  /**
   * Navigates back to the homepage
   */
  const handleBackClick = () => {
    navigate("/");
  };

  /**
   * Navigates to the expense creation page for this group
   */
  const handleAddExpenseClick = () => {
    if (groupId) {
      navigate(getCreateExpenseForGroupPath(groupId));
    }
  };

  /**
   * Formats a currency value with the appropriate locale
   * @param amount - The amount to format
   * @param currency - The currency code (e.g., 'ILS', 'USD')
   * @returns Formatted currency string
   */
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("he-IL", {
      style: "currency",
      currency,
    }).format(amount);
  };

  if (loading) {
    return <LoadingView onBackClick={handleBackClick} />;
  }

  if (error || !group) {
    return <ErrorView onBackClick={handleBackClick} error={error} />;
  }

  return (
    <GroupPageView
      group={group}
      expenses={expenses}
      onBackClick={handleBackClick}
      onAddExpenseClick={handleAddExpenseClick}
      formatCurrency={formatCurrency}
    />
  );
};
