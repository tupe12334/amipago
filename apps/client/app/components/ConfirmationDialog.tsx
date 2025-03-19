import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

type ConfirmationDialogProps = {
  open: boolean;
  title: string;
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmationDialog = ({
  open,
  title,
  content,
  onConfirm,
  onCancel,
}: ConfirmationDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
    >
      <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="confirmation-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          ביטול
        </Button>
        <Button onClick={onConfirm} color="error" autoFocus>
          אישור
        </Button>
      </DialogActions>
    </Dialog>
  );
};
