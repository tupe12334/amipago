import React from "react";
import { Box, Typography, Paper, List, ListItem, Chip } from "@mui/material";

interface GroupMember {
  id: string;
  name: string;
}

interface GroupMembersProps {
  members?: GroupMember[];
  groupUserId: string;
}

export const GroupMembers = ({ members, groupUserId }: GroupMembersProps) => {
  return (
    <Box mb={6}>
      <Typography id="members-title" variant="h6" component="h2" fontWeight="medium" mb={2}>
        חברי קבוצה
      </Typography>
      <Paper elevation={0} sx={{ bgcolor: 'grey.50', borderRadius: 2, p: 2 }}>
        {members && members.length > 0 ? (
          <List id="members-list" aria-label="קבוצת חברים" sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {members.map((member) => (
              <ListItem key={member.id} sx={{ display: 'flex', alignItems: 'center' }}>
                <i className="fa fa-user-circle" aria-hidden="true" style={{ color: 'grey.500', marginInlineEnd: '0.5rem' }}></i>
                <Typography variant="body2" component="span">
                  {member.name}
                </Typography>
                {groupUserId === member.id && (
                  <Chip
                    label="מנהל"
                    size="small"
                    color="success"
                    sx={{ marginInlineStart: '0.5rem' }}
                  />
                )}
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2" color="text.secondary">
            אין חברים בקבוצה זו
          </Typography>
        )}
      </Paper>
    </Box>
  );
};
