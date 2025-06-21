import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import { SIDEBAR_WIDTH, APPBAR_HEIGHT } from "cmp-core/src/Contants/const";
import MenuList from "components/layouts/MainLayout/Sidebar/MenuList";

import SimpleBar from "simplebar-react";
import Box from "@mui/material/Box";
import { useMediaQuery, useTheme } from "@mui/material";

export default function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Drawer
      anchor="left"
      sx={{ zIndex: "0" }}
      open={open}
      onClose={() => onClose()} // needed for temporary drawer
      variant={isSmallScreen ? "temporary" : "permanent"}
    >
      <SimpleBar
        style={{
          background: "#212129",
          height: height,
        }}
      >
        <Box>
          <MenuList />
        </Box>
      </SimpleBar>
    </Drawer>
  );
}

const height = `100vh`;

const Drawer = styled(MuiDrawer)(({ theme }) => ({
  width: SIDEBAR_WIDTH,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: SIDEBAR_WIDTH,
    overflowX: "hidden",
    border: "none",
    background: theme.palette.sidebar?.main || "#212129",
    height: height,
    marginTop: APPBAR_HEIGHT + "px",
    boxShadow: "-3px 3px 4px 4px #0000001A",
  },
}));
