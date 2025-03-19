import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { getGroupById, updateGroup } from "../../services/indexedDbService";
import { StorageGroup } from "../../models/StorageGroup";
import { getGroupPath } from "../../paths";

export const GroupSettingsPage = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  const [group, setGroup] = useState<StorageGroup | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const loadGroup = async () => {
      if (!groupId) {
        navigate("/");
        return;
      }

      try {
        const groupData = await getGroupById(groupId);
        if (groupData) {
          setGroup(groupData);
          setName(groupData.name);
          setDescription(groupData.description || "");
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Failed to load group:", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    loadGroup();
  }, [groupId, navigate]);

  const handleBack = () => {
    navigate(getGroupPath(groupId!));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!group) return;

    try {
      const updatedGroup = {
        ...group,
        name,
        description,
      };
      await updateGroup(updatedGroup);
      navigate(getGroupPath(groupId!));
    } catch (error) {
      console.error("Failed to update group:", error);
    }
  };

  if (loading) {
    return <div>טוען...</div>;
  }

  return (
    <Container maxWidth="sm">
      <Box component="header" display="flex" alignItems="center" gap={2} py={2}>
        <Button
          onClick={handleBack}
          startIcon={<i className="fa fa-arrow-right" aria-hidden="true" />}
        >
          חזור
        </Button>
        <Typography variant="h5" component="h1">
          הגדרות קבוצה
        </Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit} py={3}>
        <TextField
          id="group-name-field"
          label="שם הקבוצה"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
          required
          InputProps={{
            startAdornment: (
              <i
                className="fa fa-users"
                style={{ marginInlineEnd: "8px" }}
                aria-hidden="true"
              />
            ),
          }}
        />

        <TextField
          id="group-description-field"
          label="תיאור"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={4}
          InputProps={{
            startAdornment: (
              <i
                className="fa fa-info-circle"
                style={{ marginInlineEnd: "8px" }}
                aria-hidden="true"
              />
            ),
          }}
        />

        <Button
          id="save-settings-button"
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
          startIcon={<i className="fa fa-save" aria-hidden="true" />}
        >
          שמור שינויים
        </Button>
      </Box>
    </Container>
  );
};

export default GroupSettingsPage;
