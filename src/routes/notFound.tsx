import { Navigate } from "react-router-dom";

const MainRoutes = {
  path: "*",
  element: <Navigate to={"/"} replace />,
};

export default MainRoutes;
