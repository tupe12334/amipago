import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { ExpensesList } from "../../components/ExpensesList";
import { GroupMembers } from "../../components/GroupMembers/GroupMembers";
import { GroupMetaData } from "../../components/GroupMetaData/GroupMetaData";
import { StorageGroup } from "../../models/StorageGroup";
import { StorageExpense } from "../../models/StorageExpense";
import { useNavigate } from "react-router-dom";
import { getGroupSettingsPath } from "../../paths";
import { ShareGroupDialog } from "./ShareGroupDialog";

/**
 * Props interface for the GroupPageView component
 */
interface GroupPageProps {
  /** The group data to display */
  group: StorageGroup;
  /** List of expenses associated with this group */
  expenses: StorageExpense[];
  /** Handler for back button click */
  onBackClick: () => void;
  /** Handler for add expense button click */
  onAddExpenseClick: () => void;
  /** Function to format currency values */
  formatCurrency: (amount: number, currency: string) => string;
}

/**
 * View component for displaying group details page
 * Shows group information, expenses list, members and actions
 */
export const GroupPageView = ({
  group,
  expenses,
  onBackClick,
  onAddExpenseClick,
  formatCurrency,
}: GroupPageProps) => {
  const navigate = useNavigate();
  const [showQRCode, setShowQRCode] = useState(false);

  return (
    <Box
      id="group-page"
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      role="main"
      aria-label="דף קבוצה"
    >
      <Box
        id="group-header"
        component="header"
        p={2}
        display="flex"
        justifyContent="start"
        gap={2}
        alignItems="center"
        borderBottom={1}
        borderColor="grey.300"
      >
        <Button
          id="group-back-button"
          onClick={onBackClick}
          startIcon={<i className="fa fa-arrow-right" aria-hidden="true"></i>}
          color="primary"
          aria-label="חזור לדף הבית"
        >
          חזור
        </Button>
        <Typography id="group-title" variant="h4" fontWeight="bold">
          {group.name}
        </Typography>
        <Button
          id="group-settings-button"
          onClick={() => navigate(getGroupSettingsPath(group.id))}
          color="primary"
          sx={{ marginInlineStart: "auto" }}
          aria-label="הגדרות קבוצה"
        >
          <i className="fa fa-cog" aria-hidden="true"></i>
        </Button>
      </Box>
      <Box id="group-content" p={2} flexGrow={1} overflow="auto">
        <Box p={3}>
          {group.description && (
            <Box id="group-description-section" mb={3}>
              <Typography
                id="description-title"
                variant="h6"
                fontWeight="medium"
                mb={1}
              >
                תיאור
              </Typography>
              <Typography id="group-description" color="text.secondary">
                {group.description}
              </Typography>
            </Box>
          )}
          <Box id="expenses-section" mb={3}>
            <Typography
              id="expenses-title"
              variant="h6"
              fontWeight="medium"
              mb={1}
            >
              הוצאות
            </Typography>
            <ExpensesList expenses={expenses} formatCurrency={formatCurrency} />
          </Box>
          <GroupMembers members={group.members} groupUserId={group.userId} />
          <GroupMetaData group={group} />
          <Box
            id="group-actions"
            mt={3}
            display="flex"
            justifyContent="center"
            gap={2}
          >
            <Button
              id="group-actions-button"
              variant="contained"
              color="primary"
              onClick={onAddExpenseClick}
              startIcon={
                <i className="fa fa-plus-circle" aria-hidden="true"></i>
              }
              aria-label="הוסף הוצאה חדשה לקבוצה"
            >
              הוסף הוצאה לקבוצה
            </Button>
            <Button
              id="share-group-button"
              variant="contained"
              color="success"
              onClick={() => setShowQRCode(true)}
              startIcon={<i className="fa fa-qrcode" aria-hidden="true"></i>}
              aria-label="שתף קבוצה באמצעות קוד QR"
            >
              שתף קבוצה
            </Button>
          </Box>
        </Box>
      </Box>
      <ShareGroupDialog
        open={showQRCode}
        onClose={() => setShowQRCode(false)}
        groupId={group.id}
        password={group.password}
      />
    </Box>
  );
};
