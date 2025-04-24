import Loadable from "uikit/src/PageLoader";
import React, { lazy } from "react";

import AuthLayout from "components/layouts/AuthLayout";
import { Navigate, Outlet } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { getToken } from "core/src/utils/auth";
import { ProtectWrapper } from "./main";
import SignUp from "views/Auth/SignUp";
import { getPath, LinkEnum } from "common/menu-items";
import { APP_ROUTES } from "./app_route";
// import SignUp from "views/Auth/SignUp";

const Login = Loadable(lazy(() => import("views/Auth/Login")));
const Activation = Loadable(lazy(() => import("views/Activation")));
// const SignUp = Loadable(lazy(() => import("views/Auth/SignUp")));
// const BillingDetails = Loadable(
//   lazy(() => import("views/Auth/SignUp/BillingDetails"))
// );
// const OperationalAddress = Loadable(
//   lazy(() => import("views/Auth/SignUp/OperationalAddress"))
// );
// const BasicInformation = Loadable(
//   lazy(() => import("views/Auth/SignUp/BasicInformation"))
// );
// const DocumentSubmission = Loadable(
//   lazy(() => import("views/Auth/SignUp/DocumentSubmission"))
// );

// const SignUpDetail = Loadable(lazy(() => import("views/Auth/SignUpDetail")));

const ProtectLoginWrapper = ({ children }: { children: React.ReactNode }) => {
  const token = getToken();
  if (token) return <Navigate to="/" />;
  return children;
};

const MainRoutes = {
  path: "/",
  element: (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  ),
  children: [
    {
      path: "/login",
      element: (
        <ProtectLoginWrapper>
          <Login />
        </ProtectLoginWrapper>
      ),
    },
    {
      path: APP_ROUTES.SignUpDetail+"/:step",
      element: (
          <SignUp />
      ),
    },
    {
      path: getPath(LinkEnum.Activation),
      element: <Activation />,
    },
  ],
};

export default MainRoutes;
