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
import { majorRoutes } from "./major";
import { themeRoutes } from "./theme";
import { userRoutes } from "./user";
import { questionRoutes } from "./question";
import { examRoutes } from "./exam";
import { facultyRoutes } from "./faculty";
import { chapterRoutes } from "./chapter";
import { difficultyRoutes } from "./difficulty";
import Profile from "../pages/Profile";
import Logout from "../pages/Logout";
import { locationRoutes } from "./location";

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
          {
            path: pathNames.PROFILE,
            element: <Profile />,
          },
          {
            path: pathNames.LOGOUT,
            element: <Logout />,
          },
          ...classRoutes,
          ...facultyRoutes,
          ...attendanceRoutes,
          ...studentRoutes,
          ...majorRoutes,
          ...userRoutes,
          ...notificationRoutes,
          ...letterRoutes,
          ...permissionRoutes,
          ...themeRoutes,
          ...questionRoutes,
          ...examRoutes,
          ...chapterRoutes,
          ...difficultyRoutes,
          ...locationRoutes
        ],
      },
    ],
  },
]);

export default router;
