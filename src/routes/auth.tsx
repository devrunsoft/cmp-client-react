import Loadable from "uikit/src/PageLoader";
import React, { lazy } from "react";

import { Navigate, Outlet } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import getTheme from "theme";
import { getToken } from "core/src/utils/auth";
import { ProtectWrapper } from "./main";

const ProtectLoginWrapper = ({ children }: { children: React.ReactNode }) => {
  const token = getToken();
  if (token) return <Navigate to="/" />;
  return children;
};

const MainRoutes = {
  path: "/",
  element: <></>,
  children: [],
};

export default MainRoutes;
