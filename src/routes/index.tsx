import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Preview from "../pages/Preview";
import Attendance from "../pages/Attendance/Attendance";
import Department from "../pages/Department/Department";
import MasterLayout from "../layouts/MasterLayout";
import EditDepartment from "../pages/Department/EditDepartment";
import CreateDepartment from "../pages/Department/CreateDepartment";
import Subject from "../pages/Subject/Subject";
import CreateSubject from "../pages/Subject/CreateSubject";
import EditSubject from "../pages/Subject/EditSubject";
import Class from "../pages/Class/Class";
import CreateClass from "../pages/Class/CreateClass";
import EditClass from "../pages/Class/EditClass";
import Student from "../pages/Student/Student";
import CreateStudent from "../pages/Student/CreateStudent";
import EditStudent from "../pages/Student/EditStudent";
import Statistic from "../pages/Statistic/Statistic";
import React from "react";
import { classRoutes } from "./class";
import { departmentRoutes } from "./department";
import { attendanceRoutes } from "./attendance";
import { studentRoutes } from "./student";
import { subjectRoutes } from "./subject";
import { userRoutes } from "./user";
import { notificationRoutes } from "./notification";
import { letterRoutes } from "./letter";

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
        path: "/login",
        element: <Login />,
      },
      {
        path: "/preview/:componentName",
        element: <Preview />,
      },
      {
        path: "/",
        element: <AuthLayout />,
        children: [
          {
            path: "",
            element: <Home />,
          },
          ...classRoutes,
          ...departmentRoutes,
          ...attendanceRoutes,
          ...studentRoutes,
          ...subjectRoutes,
          ...userRoutes,
          ...notificationRoutes,
          ...letterRoutes,
        ],
      },
    ],
  },
]);

export default router;
