import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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
  onBackClick: () => void;
  onAddExpenseClick: () => void;
  formatCurrency: (amount: number, currency: string) => string;
}

export const GroupPageView = ({
  group,
  expenses,
  onBackClick,
  onAddExpenseClick,
  formatCurrency,
}: GroupPageProps) => {
  const [showQRCode, setShowQRCode] = useState(false);

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
