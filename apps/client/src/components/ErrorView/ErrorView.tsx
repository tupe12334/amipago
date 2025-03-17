import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface ErrorViewProps {
  onBackClick: () => void;
  error: string | null;
  defaultErrorMessage?: string;
}

export const ErrorView = ({
  onBackClick,
  error,
  defaultErrorMessage = "הקבוצה המבוקשת לא נמצאה",
}: ErrorViewProps) => {
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
          startIcon={<i className="fa fa-arrow-left" aria-hidden="true"></i>}
          color="primary"
          aria-label="חזור לדף הבית"
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
          role="alert"
          aria-live="assertive"
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
            {error || defaultErrorMessage}
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
};
