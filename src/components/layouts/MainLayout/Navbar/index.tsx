import MuiAppBar from "@mui/material/AppBar";
import MuiToolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Logout, ShoppingBag, ShoppingCart } from "@mui/icons-material";
import { getToken, logout } from "core/src/utils/auth";
import { APPBAR_HEIGHT } from "cmp-core/src/Contants/const";
import { useTheme, useMediaQuery, IconButton, Link } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "./sideBar.module.css";
import { APP_ROUTES } from "../../../../routes/app_route";
import { jwtDecode } from "jwt-decode";
import { Api_URL, Site_URL } from "core/src/utils/url";
import { useNavigate } from "react-router-dom";
import LocationSelect from "components/locationSelect/locationSelect";
import ShoppingCardIcon from "views/ShoppingCard/shopping_card_icon";

export default function AppBar({ onMenuClick }: { onMenuClick?: () => void }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [profile, setPtofile] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getProfile();
    getEmail();
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
  const [email, setEmail] = useState("");
  async function getEmail() {
    try {
      var token = await getToken();
      var decoded = jwtDecode(token?.token ?? "");
      setEmail(decoded["businessEmail"]);
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
        <Box
          sx={{
            display: "flex",
            flexDirection: isSmallScreen ? "column" : "row",
            gap: isSmallScreen ? "4px" : "8px",
            alignItems: isSmallScreen ? "flex-start" : "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <img src={`${Api_URL}/Common/Logo`} width={40} height={40} />
            <Box
              className="flex"
              flexDirection="column"
              alignItems="flex-start"
            >
              <Box className="flex items-center">
                {isSmallScreen && onMenuClick && (
                  <IconButton
                    onClick={onMenuClick}
                    sx={{ mr: 2, color: "#fff" }}
                  >
                    <MenuIcon />
                  </IconButton>
                )}
                <Link href="/" className="flex">
                  <Typography
                    color="text.tooltip"
                    variant="titleLg"
                    sx={{ mr: "24px" }}
                  >
                    CLIENT PORTAL
                  </Typography>
                </Link>
              </Box>

              {!isSmallScreen && (
                <Typography
                  sx={{
                    fontSize: "13px",
                    lineHeight: "15.6px",
                    letterSpacing: "0.08em",
                    textAlign: "left",
                    color: "rgba(255, 255, 255, 0.6)",
                    mt: "4px",
                  }}
                >
                  {email}
                </Typography>
              )}
            </Box>
          </Box>

          {/* Move this below logo/text on small screens */}
          <Box
            sx={{
              width: isSmallScreen ? "100%" : "auto",
              mt: isSmallScreen ? 1 : 0,
            }}
          >
            <LocationSelect />
          </Box>
        </Box>

        <div className={styles.navigSec}>
          <Box
            onClick={() => {
              navigate(APP_ROUTES.ShoppingCard);
            }}
          >
            <ShoppingCardIcon />
          </Box>

          {/* <button className={styles.notifiButton}>
            <img
              src="/assets/heroicons_bell.svg"
              alt="notifications"
              width={"24"}
              height={"24"}
            />
          </button> */}

          <Link href={`${APP_ROUTES.EditProfile}`}>
            {profile == null ? (
              <img
                src="/assets/avatar.png"
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
