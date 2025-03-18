import classNames from "classnames";
import React, { FC } from "react";
import { Box, BoxProps } from "@mui/material";

type Props = React.PropsWithChildren & {
  className?: string;
} & Omit<BoxProps, 'className'>;

export const TopBar: FC<Props> = ({ children, className, ...boxProps }) => {
  return (
    <Box
      id="topbar-container"
      display="flex"
      width="100%"
      px={2}
      py={3}
      className={classNames(className)}
      {...boxProps}
    >
      {children}
    </Box>
  );
};
