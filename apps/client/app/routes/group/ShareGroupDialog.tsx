import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import { QRCodeSVG } from "qrcode.react";

interface ShareGroupDialogProps {
  open: boolean;
  onClose: () => void;
  groupId: string;
  password: string;
}

export const ShareGroupDialog = ({
  open,
  onClose,
  groupId,
  password,
}: ShareGroupDialogProps) => {
  return (
    <Dialog
      id="qr-modal"
      open={open}
      onClose={onClose}
      aria-labelledby="qr-dialog-title"
      dir="rtl"
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
            value={`groupId:${groupId}, password:${password}`}
            size={180}
            aria-label="קוד QR לשיתוף הקבוצה"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          id="close-qr-modal"
          onClick={onClose}
          variant="contained"
          color="error"
          fullWidth
          aria-label="סגור חלון QR"
        >
          סגור
        </Button>
      </DialogActions>
    </Dialog>
  );
};
