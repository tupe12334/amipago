import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getAllGroups } from "../../services/indexedDbService";
import { StorageGroup, StorageGroupSchema } from "../../models/StorageGroup";

export const GroupList = () => {
  const { t } = useTranslation();
  const [groups, setGroups] = useState<StorageGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch groups from IndexedDB
    const fetchGroups = async () => {
      try {
        setIsLoading(true);
        const dbGroups = await getAllGroups();

        // Validate data with zod
        const validatedGroups = dbGroups
          .map((group) => {
            try {
              return StorageGroupSchema.parse(group);
            } catch (err) {
              console.error("Invalid group data:", group, err);
              return null;
            }
          })
          .filter((group): group is StorageGroup => group !== null);

        setGroups(validatedGroups);
        setError(null);
      } catch (err) {
        setError("שגיאה בטעינת הקבוצות");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroups();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8" aria-live="polite">
        <i className="fa fa-spinner fa-pulse text-2xl" aria-hidden="true"></i>
        <span className="sr-only">טוען קבוצות...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 p-4 rounded mb-4"
        role="alert"
      >
        <p>{error}</p>
      </div>
    );
  }

  if (groups.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-100 rounded-md">
        <p>{t("אין קבוצות להצגה")}</p>
        <p className="text-gray-500 text-sm mt-2">
          {t('לחץ על כפתור "הוסף" כדי ליצור קבוצה חדשה')}
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-4" aria-label="רשימת קבוצות">
      {groups.map((group) => (
        <li
          key={group.id}
          className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
        >
          {/* <div className="text-gray-500 text-sm mt-2 flex items-center">
            <i className="fa fa-clock-o me-2" aria-hidden="true"></i>
            <span>
              {new Date(group.lastActivity).toLocaleDateString("he-IL")}
            </span>
          </div>
          <div className="text-gray-400 text-xs mt-2">
            {t("נוצר")}: {new Date(group.createdAt).toLocaleDateString("he-IL")}
          </div> */}
        </li>
      ))}
    </ul>
  );
};

export default GroupList;
