import MuiAppBar from "@mui/material/AppBar";
import MuiToolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import { Logout } from "@mui/icons-material";
import { logout } from "core/src/utils/auth";
import { APPBAR_HEIGHT } from "cmp-core/src/Contants/const";
import { useTheme, useMediaQuery, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
export default function AppBar({ onMenuClick }: { onMenuClick?: () => void }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    // request.call({
    //   onSuccess: res => {
    //     dispatch(setUser(res.data))
    //   }
    // });
  };
  return (
    <MuiAppBar
      enableColorOnDark
      position="fixed"
      color="inherit"
      elevation={0}
      sx={{
        bgcolor: "#1F2229",
        height: APPBAR_HEIGHT + "px",
      }}
    >
      <MuiToolbar
        sx={{ height: APPBAR_HEIGHT + "px" }}
        className="flex items-center justify-between"
      >
        <Box className="flex items-center">
          {isSmallScreen && onMenuClick && (
            <IconButton onClick={onMenuClick} sx={{ mr: 2, color: "#fff" }}>
              <MenuIcon />
            </IconButton>
          )}
          <Link to="/" className="flex items-center">
            <Typography
              color="text.tooltip"
              variant="titleLg"
              sx={{ mr: "24px" }}
            >
              PROVIDER PORTAL
            </Typography>
          </Link>
        </Box>
        <Logout
          sx={{ color: "rgba(246, 197, 23, 1)" }}
          onClick={() => logout()}
        />
      </MuiToolbar>
    </MuiAppBar>
  );
}
