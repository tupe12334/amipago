import { FC, useState } from "react";
import {
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";

export const UserButton: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      handleClose();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
      <IconButton
        id="user-button"
        aria-label="User Profile"
        aria-controls={open ? "user-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        color="primary"
        sx={{
          bgcolor: "primary.main",
          color: "primary.contrastText",
          width: "3.5rem",
          height: "3.5rem",
          boxShadow: 3,
          "&:hover": {
            bgcolor: "primary.dark",
            transform: "scale(1.05)",
          },
          "&:active": {
            transform: "scale(0.95)",
          },
          transition: "all 0.3s",
        }}
      >
        <i className="fa fa-user" aria-hidden="true"></i>
      </IconButton>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem id="logout-button" onClick={handleLogout}>
          <ListItemIcon>
            <i className="fa fa-sign-out" aria-hidden="true"></i>
          </ListItemIcon>
          התנתק
        </MenuItem>
      </Menu>
    </>
  );
};
