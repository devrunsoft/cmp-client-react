import Loadable from "uikit/src/PageLoader";
import React, { lazy } from "react";
import { Navigate } from "react-router-dom";

import { getToken } from "core/src/utils/auth";
import MainLayout from "components/layouts/MainLayout";
import { getPath, LinkEnum } from "common/menu-items";

const Home = Loadable(lazy(() => import("views/Home")));
const Address = Loadable(lazy(() => import("views/Address")));

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
  children: [
    {
      path: getPath(LinkEnum.Home),
      element: <Home />,
    },
    {
      path: getPath(LinkEnum.Address),
      element: <Address />,
    },
  ],
};

export default MainRoutes;
