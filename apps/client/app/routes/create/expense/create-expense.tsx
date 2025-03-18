import { CreateHeader } from "../Header";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getGroupById } from "../../../services/indexedDbService";
import { StorageGroup } from "../../../models/StorageGroup";
import { CreateExpenseFormContainer } from "./CreateExpenseFormContainer";

export const CreateExpensePage: React.FC = () => {
  const { t } = useTranslation();
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  const [groupDetails, setGroupDetails] = useState<StorageGroup | null>(null);
  const [loading, setLoading] = useState(!!groupId);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      if (groupId) {
        try {
          const group = await getGroupById(groupId);
          if (group) {
            setGroupDetails(group);
          } else {
            console.error(`קבוצה עם מזהה ${groupId} לא נמצאה`);
            // Navigate back if group not found
            navigate("/");
          }
        } catch (err) {
          console.error("שגיאה בטעינת פרטי הקבוצה:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    if (groupId) {
      fetchGroupDetails();
    }
  }, [groupId, navigate]);

  const title = groupDetails
    ? `${t("expense.title")} - ${groupDetails.name}`
    : t("expense.title");

  if (groupId && loading) {
    return (
      <div className="flex flex-col h-screen">
        <CreateHeader title={t("expense.loadingTitle")} />
        <div className="flex-1 flex justify-center items-center">
          <i className="fa fa-spinner fa-pulse text-3xl" aria-hidden="true"></i>
          <span className="sr-only">טוען פרטי קבוצה...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <CreateHeader title={title} />
      <div className="flex-1 overflow-auto p-4">
        {groupDetails && (
          <div
            className="bg-blue-50 p-3 rounded mb-4 text-center"
            id="expense-group-info"
          >
            <p className="text-blue-700">
              <i className="fa fa-info-circle ml-2" aria-hidden="true"></i>
              הוצאה זו תתווסף לקבוצה: <strong>{groupDetails.name}</strong>
            </p>
          </div>
        )}
        <CreateExpenseFormContainer />
      </div>
    </div>
  );
};
