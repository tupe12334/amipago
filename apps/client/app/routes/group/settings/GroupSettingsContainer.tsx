import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getGroupById,
  updateGroup,
  deleteGroup,
} from "../../../services/indexedDbService";
import { StorageGroup } from "../../../models/StorageGroup";
import { GroupSettingsView } from "./GroupSettingsView";
import {
  GroupSettingsInput,
  GroupSettingsInputSchema,
} from "./GroupSettingsInput";
import { LoadingView } from "../../../components/LoadingView";
import { ErrorView } from "../../../components/ErrorView";
import { getGroupPath } from "../../../paths";

export const GroupSettingsContainer = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  const [group, setGroup] = useState<StorageGroup | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GroupSettingsInput>({
    resolver: zodResolver(GroupSettingsInputSchema),
  });

  useEffect(() => {
    const fetchGroup = async () => {
      if (!groupId) {
        setError("מזהה קבוצה לא נמצא");
        setLoading(false);
        return;
      }

      try {
        const groupData = await getGroupById(groupId);
        if (groupData) {
          setGroup(groupData);
          reset({
            name: groupData.name,
            description: groupData.description || "",
            type: groupData.type,
          });
        } else {
          setError(`הקבוצה עם המזהה "${groupId}" לא נמצאה`);
        }
      } catch (err) {
        setError("אירעה שגיאה בטעינת הקבוצה");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGroup();
  }, [groupId, reset]);

  const handleSave = handleSubmit(async (data) => {
    if (!group || !groupId) return;

    setSaving(true);
    try {
      const updatedGroup = {
        ...group,
        ...data,
      };
      await updateGroup(updatedGroup);
      navigate(getGroupPath(groupId));
    } catch (err) {
      setError("אירעה שגיאה בשמירת השינויים");
      console.error(err);
    } finally {
      setSaving(false);
    }
  });

  const handleDelete = async () => {
    if (!groupId || !window.confirm("האם אתה בטוח שברצונך למחוק את הקבוצה?")) {
      return;
    }

    setSaving(true);
    try {
      await deleteGroup(groupId);
      navigate("/");
    } catch (err) {
      setError("אירעה שגיאה במחיקת הקבוצה");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate(getGroupPath(groupId || ""));
  };

  if (loading) {
    return <LoadingView onBackClick={handleCancel} />;
  }

  if (error || !group) {
    return <ErrorView onBackClick={handleCancel} error={error} />;
  }

  return (
    <GroupSettingsView
      control={control}
      errors={errors}
      onSave={handleSave}
      onDelete={handleDelete}
      onCancel={handleCancel}
      loading={saving}
    />
  );
};

export default GroupSettingsContainer;
