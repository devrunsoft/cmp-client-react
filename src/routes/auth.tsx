import Loadable from "uikit/src/PageLoader";
import React, { lazy } from "react";

import AuthLayout from "components/layouts/AuthLayout";
import { Navigate, Outlet } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { getToken } from "core/src/utils/auth";
import { ProtectWrapper } from "./main";
// import SignUp from "views/Auth/SignUp";

const Login = Loadable(lazy(() => import("views/Auth/Login")));
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
  ],
};

export default MainRoutes;
