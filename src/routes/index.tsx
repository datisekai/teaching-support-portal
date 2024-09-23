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
          {
            path: "class",
            element: <Class />,
          },
          {
            path: "attendance",
            element: <Attendance />,
          },
          {
            path: "department",
            element: <Department />,
          },
          {
            path: "department/create",
            element: <CreateDepartment />,
          },
          {
            path: "department/edit/:id",
            element: <EditDepartment />,
          },
          {
            path: "subject",
            element: <Subject />,
          },
          {
            path: "subject/create",
            element: <CreateSubject />,
          },
          {
            path: "subject/edit/:id",
            element: <EditSubject />,
          },
          {
            path: "class",
            element: <Class />,
          },
          {
            path: "class/create",
            element: <CreateClass />,
          },
          {
            path: "class/edit/:id",
            element: <EditClass />,
          },
          {
            path: "class/statistic/:id",
            element: <Statistic />,
          },
          {
            path: "student/detail/:id",
            element: <Student />,
          },
          {
            path: "student/create/:id",
            element: <CreateStudent />,
          },
          {
            path: "student/edit/:id",
            element: <EditStudent />,
          },
        ],
      },
    ],
  },
]);

export default router;
