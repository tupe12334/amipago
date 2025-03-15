import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  getGroupById,
  getExpensesByGroupId,
} from "../services/indexedDbService";
import { StorageGroup } from "../models/StorageGroup";
import { StorageExpense } from "../models/StorageExpense";
import { GroupTypeHebrewLabel } from "../models/GroupType";
import NavBar from "../components/NavBar/NavBar";
import { TopBar } from "../components/TopBar/TopBar";
import { BackButton } from "../components/BackButton/BackButton";
import { getCreateExpenseForGroupPath } from "../paths";

export const GroupPage = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const [group, setGroup] = useState<StorageGroup | null>(null);
  const [expenses, setExpenses] = useState<StorageExpense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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

          // Fetch expenses for this group
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

  // Format currency for display
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("he-IL", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex flex-col h-screen">
        <NavBar />
        <div
          className="flex justify-center items-center flex-1"
          aria-live="polite"
        >
          <i className="fa fa-spinner fa-pulse text-3xl" aria-hidden="true"></i>
          <span className="sr-only">טוען פרטי קבוצה...</span>
        </div>
      </div>
    );
  }

  if (error || !group) {
    return (
      <div className="flex flex-col h-screen">
        <NavBar />
        <TopBar className="items-center">
          <BackButton />
          <h1 id="error-heading" className="text-xl font-medium">
            חזרה לדף הבית
          </h1>
        </TopBar>

        <div className="flex flex-col items-center justify-center flex-1 p-4">
          <div
            className="bg-red-100 border border-red-400 text-red-700 p-4 rounded mb-4 max-w-md w-full"
            role="alert"
            aria-live="assertive"
            id="group-error-alert"
          >
            <div className="flex items-center mb-2">
              <i
                className="fa fa-exclamation-triangle ms-2"
                aria-hidden="true"
              ></i>
              <p className="font-bold">שגיאה בטעינת הקבוצה</p>
            </div>
            <p>{error || "הקבוצה המבוקשת לא נמצאה"}</p>
          </div>

          <button
            onClick={handleBackClick}
            className="mt-4 bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
            id="back-to-groups-button"
            aria-label="חזור לרשימת הקבוצות"
          >
            <i className="fa fa-home ms-2" aria-hidden="true"></i>
            חזור לרשימת הקבוצות
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <TopBar>
        <button
          id="back-button"
          onClick={handleBackClick}
          className="flex items-center text-blue-600"
          aria-label="חזור לרשימת הקבוצות"
        >
          <i className="fa fa-arrow-right ms-2" aria-hidden="true"></i>
          חזור
        </button>
      </TopBar>

      <div className="p-4 flex-1 overflow-y-auto">
        {/* Removed card styling from the container */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h1 id="group-title" className="text-2xl font-bold">
              {group.name}
            </h1>
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              {GroupTypeHebrewLabel[group.type]}
            </span>
          </div>

          {group.description && (
            <div className="mb-6">
              <h2 id="description-title" className="text-lg font-medium mb-2">
                תיאור
              </h2>
              <p id="group-description" className="text-gray-600">
                {group.description}
              </p>
            </div>
          )}

          {/* Expenses section */}
          <div className="mb-6">
            <h2 id="expenses-title" className="text-lg font-medium mb-2">
              הוצאות
            </h2>

            {expenses.length > 0 ? (
              <ul id="expenses-list" className="divide-y divide-gray-200">
                {expenses.map((expense) => (
                  <li key={expense.id} className="py-3">
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
            ) : (
              <div className="text-center py-6 bg-gray-50 rounded">
                <p className="text-gray-500">אין הוצאות להצגה בקבוצה זו</p>
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center text-gray-500 text-sm">
              <i className="fa fa-clock-o ms-2" aria-hidden="true"></i>
              <span id="group-created-at">
                נוצר בתאריך:{" "}
                {new Date(group.createdAt).toLocaleDateString("he-IL")}
              </span>
            </div>

            {group.lastActivity && (
              <div className="flex items-center text-gray-500 text-sm mt-2">
                <i className="fa fa-refresh ms-2" aria-hidden="true"></i>
                <span id="group-last-activity">
                  פעילות אחרונה:{" "}
                  {new Date(group.lastActivity).toLocaleDateString("he-IL")}
                </span>
              </div>
            )}

            <div className="mt-6 flex justify-center">
              <button
                id="group-actions-button"
                className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
                onClick={handleAddExpenseClick}
                aria-label="הוסף הוצאה לקבוצה"
              >
                <i className="fa fa-plus-circle ms-2" aria-hidden="true"></i>
                הוסף הוצאה לקבוצה
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
