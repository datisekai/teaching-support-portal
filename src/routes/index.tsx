import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Preview from "../pages/Preview";
import Class from "../pages/Class";
import Attendance from "../pages/Attendance";
import Department from "../pages/Department";

const router = createBrowserRouter([
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
        path: 'attendance',
        element: <Attendance />
      },
      {
        path: 'department',
        element: <Department />
      }
    ],
  },
]);

export default router;
