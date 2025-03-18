import React from "react";
import { useTranslation } from "react-i18next";
import { StorageGroup } from "../../models/StorageGroup";
import { Box, Typography } from "@mui/material";

export const GroupMetaData = ({ group }: { group: StorageGroup }) => {
  const { t } = useTranslation();
  return (
    <Box borderTop={1} borderColor="grey.200" pt={2}>
      <Box
        display="flex"
        alignItems="center"
        color="text.secondary"
        fontSize="small"
      >
        <i
          className="fa fa-clock-o"
          aria-hidden="true"
          style={{ marginInlineEnd: "0.5rem" }}
        ></i>
        <Typography id="group-created-at" variant="body2">
          {t("נוצר")}: {new Date(group.createdAt).toLocaleDateString("he-IL")}
        </Typography>
      </Box>
      {group.lastActivity && (
        <Box
          display="flex"
          alignItems="center"
          color="text.secondary"
          fontSize="small"
          mt={1}
        >
          <i
            className="fa fa-refresh"
            aria-hidden="true"
            style={{ marginInlineEnd: "0.5rem" }}
          ></i>
          <Typography id="group-last-activity" variant="body2">
            {t("פעילות אחרונה")}:{" "}
            {new Date(group.lastActivity).toLocaleDateString("he-IL")}
          </Typography>
        </Box>
      )}
    </Box>
  );
};
