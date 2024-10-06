import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { pathNames } from "../constants";
import AuthLayout from "../layouts/AuthLayout";
import MasterLayout from "../layouts/MasterLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import { attendanceRoutes } from "./attendance";
import { classRoutes } from "./class";
import { letterRoutes } from "./letter";
import { notificationRoutes } from "./notification";
import { permissionRoutes } from "./permission";
import { studentRoutes } from "./student";
import { subjectRoutes } from "./subject";
import { themeRoutes } from "./theme";
import { userRoutes } from "./user";
import { questionRoutes } from "./question";
import { examRoutes } from "./exam";
import { FacultyRoutes } from "./faculty";

export interface IRouter {
  path: string;
  element: React.ReactNode;
  children?: IRouter[];
}

const router = createBrowserRouter([
  {
    path: "",
    element: <MasterLayout />,
    children: [
      {
        path: pathNames.LOGIN,
        element: <Login />,
      },
      {
        path: pathNames.HOME,
        element: <AuthLayout />,
        children: [
          {
            path: pathNames.HOME,
            element: <Home />,
          },
          ...classRoutes,
          ...FacultyRoutes,
          ...attendanceRoutes,
          ...studentRoutes,
          ...subjectRoutes,
          ...userRoutes,
          ...notificationRoutes,
          ...letterRoutes,
          ...permissionRoutes,
          ...themeRoutes,
          ...questionRoutes,
          ...examRoutes,
        ],
      },
    ],
  },
]);

export default router;
