import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAllGroups } from "../../services/indexedDbService";
import { StorageGroup, StorageGroupSchema } from "../../models/StorageGroup";
import { getGroupPath } from "../../paths";
import { getUserGlobalId } from "../../services/localStorageService";
import { GroupList } from "./GroupList";

export const GroupListContainer = () => {
  const [groups, setGroups] = useState<StorageGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
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

  return (
    <GroupList
      groups={groups}
      isLoading={isLoading}
      error={error}
      currentUserId={currentUserId}
      onGroupClick={handleGroupClick}
    />
  );
};
