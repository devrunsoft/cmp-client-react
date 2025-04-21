import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import styles from "../AuthLayout/index.module.css";
import MainLogo from "./MainLogo";

interface AuthLayoutProps {
  children?: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.sideBg}>
        <MainLogo />
      </div>
      <div className={styles.content}>
        <div className={styles.loginPageContainer}>
          {children || <Outlet />}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
