import { useRoutes } from "react-router-dom";

import notFoundRoutes from "./notFound";
import mainRoutes from "./main";
import authRoutes from "./auth";

export default function PVRoutes() {
  return useRoutes([mainRoutes, authRoutes, notFoundRoutes], "");
}
