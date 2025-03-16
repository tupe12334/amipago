import React from "react";
import { useTranslation } from "react-i18next";
import { StorageGroup } from "../../models/StorageGroup";

export const GroupMetaData = ({ group }: { group: StorageGroup }) => {
  const { t } = useTranslation();
  return (
    <div className="border-t border-gray-200 pt-4">
      <div className="flex items-center text-gray-500 text-sm">
        <i className="fa fa-clock-o me-2" aria-hidden="true"></i>
        <span id="group-created-at">
          {t("נוצר")}: {new Date(group.createdAt).toLocaleDateString("he-IL")}
        </span>
      </div>
      {group.lastActivity && (
        <div className="flex items-center text-gray-500 text-sm mt-2">
          <i className="fa fa-refresh me-2" aria-hidden="true"></i>
          <span id="group-last-activity">
            {t("פעילות אחרונה")}:{" "}
            {new Date(group.lastActivity).toLocaleDateString("he-IL")}
          </span>
        </div>
      )}
    </div>
  );
};
