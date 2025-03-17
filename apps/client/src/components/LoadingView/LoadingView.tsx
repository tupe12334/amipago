import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

interface LoadingViewProps {
  onBackClick: () => void;
  loadingMessage?: string;
}

export const LoadingView = ({
  onBackClick,
  loadingMessage = "טוען פרטי קבוצה...",
}: LoadingViewProps) => {
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
          aria-label="חזור לדף הקודם"
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
        <span className="sr-only">{loadingMessage}</span>
      </Box>
    </Box>
  );
};
