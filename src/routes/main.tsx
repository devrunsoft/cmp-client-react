import Loadable from "uikit/src/PageLoader";
import React, { lazy } from "react";
import { Navigate } from "react-router-dom";

import { getToken } from "core/src/utils/auth";
// import { getPath, LinkEnum } from "../common/menu-items";
import MainLayout from "components/layouts/MainLayout";
import { getPath, LinkEnum } from "common/menu-items";

// redirect if user is not logged in
export const ProtectWrapper = ({ children }: { children: React.ReactNode }) => {
  const token = getToken();
  if (!token) return <Navigate to="/login" />;
  return children;
};

const MainRoutes = {
  path: "/",
  element: (
    <ProtectWrapper>
      <MainLayout />
    </ProtectWrapper>
  ),
  children: [],
};

export default MainRoutes;
