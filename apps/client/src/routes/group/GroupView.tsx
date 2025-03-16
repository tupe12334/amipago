import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { BackButton } from "../../components/BackButton/BackButton";
import { ExpensesList } from "../../components/ExpensesList";
import { TopBar } from "../../components/TopBar/TopBar";
import { GroupTypeHebrewLabel } from "../../models/GroupType";
import { StorageGroup } from "../../models/StorageGroup";
import { GroupMembers } from "../../components/GroupMembers/GroupMembers";

interface GroupPageProps {
  group: StorageGroup;
  expenses: any[]; // ...existing type StorageExpense...
  loading: boolean;
  error: string | null;
  onBackClick: () => void;
  onAddExpenseClick: () => void;
  formatCurrency: (amount: number, currency: string) => string;
}

export const GroupPageView = ({
  group,
  expenses,
  loading,
  error,
  onBackClick,
  onAddExpenseClick,
  formatCurrency,
}: GroupPageProps) => {
  const [showQRCode, setShowQRCode] = useState(false);

  if (loading) {
    return (
      <div className="flex flex-col h-screen">
        <header className="p-4 flex items-center border-b border-gray-200">
          <button
            id="loading-back-button"
            onClick={onBackClick}
            className="flex items-center text-blue-600"
            aria-label="Go back to groups"
          >
            <i className="fa fa-arrow-right me-2" aria-hidden="true"></i>
            חזור
          </button>
        </header>
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
        <header className="p-4 flex items-center border-b border-gray-200">
          <button
            id="error-back-button"
            onClick={onBackClick}
            className="flex items-center text-blue-600"
            aria-label="Go back to home"
          >
            <i className="fa fa-arrow-left me-2" aria-hidden="true"></i>
            חזרה לדף הבית
          </button>
        </header>
        <div className="flex flex-col items-center justify-center flex-1 p-4">
          <div
            className="bg-red-100 border border-red-400 text-red-700 p-4 rounded mb-4 max-w-md w-full"
            role="alert"
            aria-live="assertive"
            id="group-error-alert"
          >
            <div className="flex items-center mb-2">
              <i
                className="fa fa-exclamation-triangle me-2"
                aria-hidden="true"
              ></i>
              <p className="font-bold">שגיאה בטעינת הקבוצה</p>
            </div>
            <p>{error || "הקבוצה המבוקשת לא נמצאה"}</p>
          </div>
          <button
            onClick={onBackClick}
            className="mt-4 bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
            id="back-to-groups-button"
            aria-label="Go back to groups"
          >
            <i className="fa fa-home me-2" aria-hidden="true"></i>
            חזרה לדף הבית
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="p-4 flex justify-between items-center border-b border-gray-200">
        <h1 id="group-title" className="text-2xl font-bold">
          {group.name}
        </h1>
        <button
          id="group-back-button"
          onClick={onBackClick}
          className="flex items-center text-blue-600"
          aria-label="Go back to groups"
        >
          <i className="fa fa-arrow-left me-2" aria-hidden="true"></i>
          חזור
        </button>
      </header>
      <div className="p-4 flex-1 overflow-y-auto">
        <div className="p-6">
          {/* Removed duplicate group title */}
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
          <div className="mb-6">
            <h2 id="expenses-title" className="text-lg font-medium mb-2">
              הוצאות
            </h2>
            <ExpensesList expenses={expenses} formatCurrency={formatCurrency} />
          </div>
          <GroupMembers members={group.members} groupUserId={group.userId} />
          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center text-gray-500 text-sm">
              <i className="fa fa-clock-o me-2" aria-hidden="true"></i>
              <span id="group-created-at">
                נוצר בתאריך:{" "}
                {new Date(group.createdAt).toLocaleDateString("he-IL")}
              </span>
            </div>
            {group.lastActivity && (
              <div className="flex items-center text-gray-500 text-sm mt-2">
                <i className="fa fa-refresh me-2" aria-hidden="true"></i>
                <span id="group-last-activity">
                  פעילות אחרונה:{" "}
                  {new Date(group.lastActivity).toLocaleDateString("he-IL")}
                </span>
              </div>
            )}
            <div className="mt-6 flex justify-center gap-4">
              <button
                id="group-actions-button"
                className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
                onClick={onAddExpenseClick}
                aria-label="Add expense to group"
              >
                <i className="fa fa-plus-circle me-2" aria-hidden="true"></i>
                הוסף הוצאה לקבוצה
              </button>
              <button
                id="share-group-button"
                className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-colors flex items-center"
                onClick={() => setShowQRCode(true)}
                aria-label="Share group via QR"
              >
                <i className="fa fa-qrcode me-2" aria-hidden="true"></i>
                שתף קבוצה
              </button>
            </div>
          </div>
        </div>
      </div>
      {showQRCode && group && (
        <div
          id="qr-modal"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          role="dialog"
          aria-modal="true"
          aria-label="QR code for group sharing"
        >
          <div className="bg-white rounded-lg p-6 max-w-xs w-full">
            <h2 className="text-xl font-bold mb-4 text-center">
              QR לשיתוף קבוצה
            </h2>
            <QRCodeSVG
              id="group-qr-code"
              value={`groupId:${group.id}, password:${group.password}`}
              size={180}
            />
            <button
              id="close-qr-modal"
              onClick={() => setShowQRCode(false)}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded w-full hover:bg-red-600 transition-colors"
              aria-label="Close QR"
            >
              סגור
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
