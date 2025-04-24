import Loadable from "uikit/src/PageLoader";
import React, { lazy } from "react";
import { Navigate } from "react-router-dom";

import { getToken } from "core/src/utils/auth";
import MainLayout from "components/layouts/MainLayout";
import { getPath, LinkEnum } from "common/menu-items";
import { APP_ROUTES } from "./app_route";

const Home = Loadable(lazy(() => import("views/Home")));
const Address = Loadable(lazy(() => import("views/Address")));
const Services = Loadable(lazy(() => import("views/Services")));
const Enrollservice = Loadable(lazy(() => import("views/Enrollservice")));
const EnrollserviceEmergency = Loadable(lazy(() => import("views/Emergency")));
const Contract = Loadable(lazy(() => import("views/Contract")));
const Requests = Loadable(lazy(() => import("views/Requests")));
const Invoices = Loadable(lazy(() => import("views/invoices")));
const Profile = Loadable(lazy(() => import("views/Profile")));
const ShoppingCard = Loadable(
  lazy(() => import("views/ShoppingCard/shoppingCard"))
);

export const ProtectWrapper = ({ children }: { children: React.ReactNode }) => {
  const token = getToken();
  if (!token) return <Navigate to="/login" />;
  if (token.registered==false) return <Navigate to={`${APP_ROUTES.Activation}`} />;
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
    {
      path: getPath(LinkEnum.AddAddress),
      element: <Address />,
    },
    {
      path: getPath(LinkEnum.Services),
      element: <Services />,
    },
    {
      path: getPath(LinkEnum.EnroolServices),
      element: <Enrollservice />,
    },
    {
      path: getPath(LinkEnum.EmergencyServices),
      element: <EnrollserviceEmergency />,
    },
    {
      path: getPath(LinkEnum.Contract),
      element: <Contract />,
    },
    {
      path: getPath(LinkEnum.Requestservice),
      element: <Requests />,
    },
    {
      path: getPath(LinkEnum.invoices),
      element: <Invoices />,
    },
    {
      path: getPath(LinkEnum.Profile),
      element: <Profile />,
    },
    {
      path: getPath(LinkEnum.ShoppingCard),
      element: <ShoppingCard />,
    },

  ],
};

export default MainRoutes;
