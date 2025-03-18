import { Box, Typography } from "@mui/material";
import { TopBar } from "../TopBar/TopBar";
import { UserButton } from "./UserButton";

export function NavBar() {
  return (
    <TopBar>
      <Box
        id="navbar"
        component="nav"
        display="flex"
        width="100%"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography id="navbar-title" variant="h4" component="h1">
          AmiPago
        </Typography>
        <UserButton />
      </Box>
    </TopBar>
  );
}
