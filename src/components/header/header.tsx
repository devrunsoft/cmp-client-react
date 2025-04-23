import { useEffect, useState } from "react";
import styles from "./header.module.css";
import { IoLogInOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { getToken, logout } from "core/src/utils/auth";
import { jwtDecode } from "jwt-decode";
import { BASE_URL, Site_URL } from "core/src/utils/url";
import { Link } from "@mui/material";
import { APP_ROUTES } from "../../routes/app_route";
import MainLogo from "components/layouts/AuthLayout/MainLogo";
import ShoppingCardIcon from "views/ShoppingCard/shopping_card_icon";

export default function Header({ toggleMenu }) {
  const navigate = useNavigate();

  const [profile, setPtofile] = useState<string|null>(null);

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
    <div className={styles.container}>
      <button className={styles.menuButton} onClick={toggleMenu}>
        <RxHamburgerMenu size={35} />
      </button>
      <MainLogo />
      <div className={styles.navigSec}>
        <div className={styles.changeButtonDiv}>
          {/* <ButtonChangeUser/> */}
          <ShoppingCardIcon />
          <button className={styles.notifiButton}>
            <img
              src="/heroicons_bell.svg"
              alt="notifications"
              width={"24"}
              height={"24"}
            />
          </button>
          <Link href={`${APP_ROUTES.EditProfile}`}>
            {profile == null ? (
              <img
                src="/avatar.png"
                alt="avatar"
                width={54}
                height={54}
                style={{ borderRadius: "50%" }}
              />
            ) : (
              <img
                style={{ borderRadius: "50%" }}
                src={profile}
                alt="avatar"
                width={54}
                height={54}
              />
            )}
          </Link>
        </div>
        <IoLogInOutline
          color="rgba(246, 197, 23, 1)"
          size={"30px"}
          onClick={() => logout()}
        />
      </div>
    </div>
  );
}
