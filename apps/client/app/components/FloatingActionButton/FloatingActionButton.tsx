import React, { FC, useState } from "react";
import { Fab, Menu, MenuItem, Box } from "@mui/material";

type NonEmptyArray<T> = [T, ...T[]];

type OptionProps = {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
};

type Props = React.PropsWithChildren & {
  options?: NonEmptyArray<OptionProps>;
};

export const FloatingActionButton: FC<Props> = ({ children, options }) => {
  const [isActive, setIsActive] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const fabId = "floating-action-button";

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsActive(!isActive);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsActive(false);
  };

  const handleOptionClick = (optionOnClick?: () => void) => {
    if (optionOnClick) {
      optionOnClick();
    }
    handleClose();
  };

  return (
    <Box
      id={`${fabId}-container`}
      sx={{ position: "fixed", bottom: "1.5rem", right: "1.5rem" }}
    >
      <Fab
        id={`${fabId}-button`}
        color="primary"
        onClick={handleClick}
        aria-label="Add Item"
        aria-controls={isActive ? `${fabId}-menu` : undefined}
        aria-haspopup="true"
        aria-expanded={isActive ? "true" : undefined}
        sx={{
          "&:hover": { transform: "scale(1.05)" },
          "&:active": { transform: "scale(0.95)" },
          transition: "transform 0.3s",
        }}
      >
        {children}
      </Fab>

      <Menu
        id={`${fabId}-menu`}
        anchorEl={anchorEl}
        open={isActive}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        sx={{ mt: -2 }}
      >
        {options?.map((option, index) => (
          <MenuItem
            id={`${fabId}-option-${index}`}
            key={option.label}
            onClick={() => handleOptionClick(option.onClick)}
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "flex-end",
              textAlign: "end",
              "&:hover": { bgcolor: "action.hover" },
            }}
          >
            {option.label}
            {option.icon}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
