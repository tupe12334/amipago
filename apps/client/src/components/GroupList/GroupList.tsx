import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { getAllGroups, getUserGlobalId } from "../../services/indexedDbService";
import { StorageGroup, StorageGroupSchema } from "../../models/StorageGroup";
import { getGroupPath } from "../../paths";

export const GroupList = () => {
  const { t } = useTranslation();
  const [groups, setGroups] = useState<StorageGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch groups from IndexedDB and the current user ID
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [dbGroups, userId] = await Promise.all([
          getAllGroups(),
          getUserGlobalId(),
        ]);

        setCurrentUserId(userId);

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

    fetchData();
  }, []);

  const handleGroupClick = (groupId: string) => {
    navigate(getGroupPath(groupId));
  };

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

  if (groups.length !== 0) {
    return (
      <div className="relative">
        <ul
          className="space-y-4 flex-1 overflow-y-auto"
          aria-label="רשימת קבוצות"
          data-testid="group-list-container"
        >
          {groups.map((group) => (
            <li
              key={group.id}
              className="bg-white rounded-lg shadow-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleGroupClick(group.id)}
              aria-label={`קבוצה: ${group.name}`}
            >
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg mb-2">{group.name}</h3>
                <div className="flex flex-col items-end gap-1">
                  {currentUserId && group.userId === currentUserId && (
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      <i
                        className="fa fa-user-circle ml-1"
                        aria-hidden="true"
                      ></i>
                      {t("המנהל שלי")}
                    </span>
                  )}
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {group.members?.length || 0} {t("חברים")}
                  </span>
                </div>
              </div>

              {group.description && (
                <p className="text-gray-600 mb-3">{group.description}</p>
              )}

              {/* Display members if available */}
              {group.members && group.members.length > 0 && (
                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    חברים:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.members.slice(0, 3).map((member) => (
                      <span
                        key={member.id}
                        className="bg-gray-50 text-gray-700 text-xs px-2 py-1 rounded flex items-center"
                      >
                        <i className="fa fa-user me-1" aria-hidden="true"></i>
                        {member.name}
                      </span>
                    ))}
                    {group.members.length > 3 && (
                      <span className="text-gray-500 text-xs">
                        +{group.members.length - 3} נוספים
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-3">
                {group.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="text-gray-500 text-sm mt-2 flex items-center">
                <i className="fa fa-clock-o me-2" aria-hidden="true"></i>
                <span>
                  {t("פעילות אחרונה")}:{" "}
                  {new Date(
                    group.lastActivity || group.createdAt
                  ).toLocaleDateString("he-IL")}
                </span>
              </div>

              <div className="flex justify-between items-center mt-4 pt-2 border-t border-gray-100">
                <div className="text-gray-400 text-xs">
                  {t("נוצר")}:{" "}
                  {new Date(group.createdAt).toLocaleDateString("he-IL")}
                </div>
                <button
                  className="text-blue-600 flex items-center"
                  aria-label={`${t("צפה בקבוצה")} ${group.name}`}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering parent onClick
                    handleGroupClick(group.id);
                  }}
                >
                  <span>{t("צפה")}</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div
          className="absolute bottom-0 start-1/2 transform -translate-x-1/2 mb-2 text-gray-500 text-sm flex items-center"
          aria-hidden="true"
        >
          <i className="fa fa-arrow-down me-1" aria-hidden="true"></i>
          <span>גלול כדי לראות עוד</span>
        </div>
      </div>
    );
  }

  return null;
};

export default GroupList;
