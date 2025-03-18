import { FC } from "react";
import { IconButton, Avatar } from "@mui/material";

export const UserButton: FC = () => {
  return (
    <IconButton
      id="user-button"
      aria-label="User Profile"
      color="primary"
      sx={{
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        width: '3.5rem',
        height: '3.5rem',
        boxShadow: 3,
        '&:hover': {
          bgcolor: 'primary.dark',
          transform: 'scale(1.05)'
        },
        '&:active': {
          transform: 'scale(0.95)'
        },
        transition: 'all 0.3s'
      }}
    >
      <i className="fa fa-user" aria-hidden="true"></i>
    </IconButton>
  );
};
