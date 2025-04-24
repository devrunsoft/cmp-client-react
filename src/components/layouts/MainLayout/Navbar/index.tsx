import MuiAppBar from "@mui/material/AppBar";
import MuiToolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Logout } from "@mui/icons-material";
import { getToken, logout } from "core/src/utils/auth";
import { APPBAR_HEIGHT } from "cmp-core/src/Contants/const";
import { useTheme, useMediaQuery, IconButton, Link } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCardIcon from "views/ShoppingCard/shopping_card_icon";
import styles from "./sideBar.module.css";
import { APP_ROUTES } from "../../../../routes/app_route";
import { IoLogInOutline } from "react-icons/io5";
import { jwtDecode } from "jwt-decode";
import { Site_URL } from "core/src/utils/url";
export default function AppBar({ onMenuClick }: { onMenuClick?: () => void }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [profile, setPtofile] = useState<string | null>(null);

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    try {
      var token = await getToken();
      var decoded = jwtDecode(token?.token ?? "");
      var profile = decoded["ProfilePicture"];
      if (profile) {
        var image = Site_URL + profile;
        setPtofile(image);
      }
    } catch (error) {}
  }

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
          <Link href="/" className="flex items-center">
            <Typography
              color="text.tooltip"
              variant="titleLg"
              sx={{ mr: "24px" }}
            >
              CLIENT PORTAL
            </Typography>
          </Link>
        </Box>
        <div className={styles.navigSec}>
        <ShoppingCardIcon />

          <button className={styles.notifiButton}>
            
            <img
              src="/src/assets/heroicons_bell.svg"
              alt="notifications"
              width={"24"}
              height={"24"}
            />
          </button>

          <Link href={`${APP_ROUTES.EditProfile}`}>
            {profile == null ? (
              <img
                src="/src/assets/avatar.png"
                alt="avatar"
                width={45}
                height={45}
                style={{ borderRadius: "50%" }}
              />
            ) : (
              <img
                style={{ borderRadius: "50%" }}
                src={profile}
                alt="avatar"
                width={45}
                height={45}
              />
            )}
          </Link>

          <Logout
            sx={{ color: "rgba(246, 197, 23, 1)" }}
            onClick={() => logout()}
          />
        </div>
      </MuiToolbar>
    </MuiAppBar>
  );
}
