import { useTranslation } from "react-i18next";
import { StorageGroup } from "../../models/StorageGroup";
import { 
  Box, 
  List, 
  ListItem, 
  Typography, 
  Paper, 
  Chip, 
  Divider, 
  Alert, 
  Button, 
  CircularProgress 
} from "@mui/material";

interface GroupListProps {
  groups: StorageGroup[];
  isLoading: boolean;
  error: string | null;
  currentUserId: string | null;
  onGroupClick: (groupId: string) => void;
}

export const GroupList = ({
  groups,
  isLoading,
  error,
  currentUserId,
  onGroupClick,
}: GroupListProps) => {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        p={4} 
        aria-live="polite"
      >
        <CircularProgress size={32} aria-hidden="true" />
        <Box component="span" className="sr-only">טוען קבוצות...</Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert 
        id="group-list-error" 
        severity="error" 
        role="alert"
        sx={{ mb: 2 }}
      >
        {error}
      </Alert>
    );
  }

  if (groups.length === 0) {
    return (
      <Paper 
        id="empty-groups-message"
        elevation={0} 
        sx={{ 
          textAlign: 'center', 
          p: 4, 
          bgcolor: 'grey.100',
          borderRadius: 2
        }}
      >
        <Typography variant="body1">{t("אין קבוצות להצגה")}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          {t('לחץ על כפתור "הוסף" כדי ליצור קבוצה חדשה')}
        </Typography>
      </Paper>
    );
  }

  return (
    <Box id="group-list-wrapper" position="relative">
      <List 
        id="group-list-container"
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        aria-label="רשימת קבוצות"
        data-testid="group-list-container"
      >
        {groups.map((group) => (
          <ListItem 
            key={group.id} 
            component={Paper} 
            elevation={2}
            onClick={() => onGroupClick(group.id)}
            aria-label={`קבוצה: ${group.name}`}
            sx={{ 
              p: 2, 
              display: 'flex', 
              flexDirection: 'column', 
              cursor: 'pointer',
              '&:hover': { 
                boxShadow: 3
              },
              transition: 'box-shadow 0.3s'
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="start" width="100%">
              <Typography variant="h6" component="h3" fontWeight="bold" gutterBottom>
                {group.name}
              </Typography>
              <Box display="flex" flexDirection="column" alignItems="flex-end" gap={0.5}>
                {currentUserId && group.userId === currentUserId && (
                  <Chip
                    id={`admin-badge-${group.id}`}
                    size="small"
                    label={
                      <Box display="flex" alignItems="center">
                        <i className="fa fa-user-circle" aria-hidden="true" style={{ marginInlineEnd: '0.25rem' }}></i>
                        {t("המנהל שלי")}
                      </Box>
                    }
                    color="success"
                  />
                )}
                <Chip
                  id={`members-count-${group.id}`}
                  size="small"
                  label={`${group.members?.length || 0} ${t("חברים")}`}
                  color="primary"
                />
              </Box>
            </Box>

            {group.description && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                {group.description}
              </Typography>
            )}

            {group.members && group.members.length > 0 && (
              <Box mb={1.5}>
                <Typography variant="subtitle2" color="text.primary" sx={{ mb: 0.5 }}>
                  חברים:
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {group.members.slice(0, 3).map((member) => (
                    <Chip
                      key={member.id}
                      size="small"
                      variant="outlined"
                      label={
                        <Box display="flex" alignItems="center">
                          <i className="fa fa-user" aria-hidden="true" style={{ marginInlineEnd: '0.25rem' }}></i>
                          {member.name}
                        </Box>
                      }
                    />
                  ))}
                  {group.members.length > 3 && (
                    <Typography variant="caption" color="text.secondary">
                      +{group.members.length - 3} נוספים
                    </Typography>
                  )}
                </Box>
              </Box>
            )}

            {group.tags && group.tags.length > 0 && (
              <Box display="flex" flexWrap="wrap" gap={1} mb={1.5}>
                {group.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    size="small"
                    label={tag}
                    variant="outlined"
                    sx={{ bgcolor: 'grey.100' }}
                  />
                ))}
              </Box>
            )}

            <Box color="text.secondary" display="flex" alignItems="center" mt={1}>
              <i className="fa fa-clock-o" aria-hidden="true" style={{ marginInlineEnd: '0.5rem' }}></i>
              <Typography variant="body2">
                {t("פעילות אחרונה")}: {new Date(group.lastActivity || group.createdAt).toLocaleDateString("he-IL")}
              </Typography>
            </Box>

            <Divider sx={{ my: 1.5, width: '100%' }} />
            
            <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
              <Typography variant="caption" color="text.secondary">
                {t("נוצר")}: {new Date(group.createdAt).toLocaleDateString("he-IL")}
              </Typography>
              <Button
                id={`view-group-${group.id}`}
                variant="text" 
                size="small" 
                color="primary"
                aria-label={`${t("צפה בקבוצה")} ${group.name}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onGroupClick(group.id);
                }}
              >
                {t("צפה")}
              </Button>
            </Box>
          </ListItem>
        ))}
      </List>
      
      {groups.length > 3 && (
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            mb: 1,
            color: 'text.secondary',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <i className="fa fa-arrow-down" aria-hidden="true" style={{ marginInlineEnd: '0.25rem' }}></i>
          <Typography variant="caption">גלול כדי לראות עוד</Typography>
        </Box>
      )}
    </Box>
  );
};
