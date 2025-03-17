import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { ExpensesList } from "../../components/ExpensesList";
import { GroupMembers } from "../../components/GroupMembers/GroupMembers";
import { GroupMetaData } from "../../components/GroupMetaData/GroupMetaData";
import { StorageGroup } from "../../models/StorageGroup";

interface GroupPageProps {
  group: StorageGroup;
  expenses: any[];
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
      <Box
        id="loading-container"
        display="flex"
        flexDirection="column"
        minHeight="100vh"
      >
        <Box
          id="loading-header"
          component="header"
          p={2}
          display="flex"
          alignItems="center"
          borderBottom={1}
          borderColor="grey.300"
        >
          <Button
            id="loading-back-button"
            onClick={onBackClick}
            startIcon={<i className="fa fa-arrow-right" aria-hidden="true"></i>}
            color="primary"
          >
            חזור
          </Button>
        </Box>
        <Box
          id="loading-spinner"
          flexGrow={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
          aria-live="polite"
        >
          <CircularProgress />
          <span className="sr-only">טוען פרטי קבוצה...</span>
        </Box>
      </Box>
    );
  }

  if (error || !group) {
    return (
      <Box
        id="error-container"
        display="flex"
        flexDirection="column"
        minHeight="100vh"
      >
        <Box
          id="error-header"
          component="header"
          p={2}
          display="flex"
          alignItems="center"
          borderBottom={1}
          borderColor="grey.300"
        >
          <Button
            id="error-back-button"
            onClick={onBackClick}
            // TODO: add merging to the icon from texts
            startIcon={<i className="fa fa-arrow-left" aria-hidden="true"></i>}
            color="primary"
          >
            חזרה לדף הבית
          </Button>
        </Box>
        <Box
          id="error-content"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          flexGrow={1}
          p={2}
        >
          <Box
            id="group-error-alert"
            bgcolor="error.light"
            border={1}
            borderColor="error.main"
            color="error.contrastText"
            p={2}
            borderRadius={1}
            mb={2}
            maxWidth={400}
            width="100%"
          >
            <Box display="flex" alignItems="center" mb={1}>
              <i
                className="fa fa-exclamation-triangle me-2"
                aria-hidden="true"
              ></i>
              <Typography variant="subtitle1" fontWeight="bold">
                שגיאה בטעינת הקבוצה
              </Typography>
            </Box>
            <Typography variant="body2">
              {error || "הקבוצה המבוקשת לא נמצאה"}
            </Typography>
          </Box>
          <Button
            onClick={onBackClick}
            id="back-to-groups-button"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            startIcon={<i className="fa fa-home" aria-hidden="true"></i>}
          >
            חזרה לדף הבית
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      id="group-page"
      display="flex"
      flexDirection="column"
      minHeight="100vh"
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
        >
          חזור
        </Button>
        <Typography id="group-title" variant="h4" fontWeight="bold">
          {group.name}
        </Typography>
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
            >
              הוסף הוצאה לקבוצה
            </Button>
            <Button
              id="share-group-button"
              variant="contained"
              color="success"
              onClick={() => setShowQRCode(true)}
              startIcon={<i className="fa fa-qrcode" aria-hidden="true"></i>}
            >
              שתף קבוצה
            </Button>
          </Box>
        </Box>
      </Box>
      <Dialog
        id="qr-modal"
        open={showQRCode}
        onClose={() => setShowQRCode(false)}
        aria-labelledby="qr-dialog-title"
        aria-modal="true"
      >
        <DialogTitle id="qr-dialog-title">
          <Typography variant="h6" fontWeight="bold" align="center">
            QR לשיתוף קבוצה
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box display="flex" justifyContent="center">
            <QRCodeSVG
              id="group-qr-code"
              value={`groupId:${group.id}, password:${group.password}`}
              size={180}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            id="close-qr-modal"
            onClick={() => setShowQRCode(false)}
            variant="contained"
            color="error"
            fullWidth
          >
            סגור
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
