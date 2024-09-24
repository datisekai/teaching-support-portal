import { IRouter } from ".";
import Class from "../pages/Class/Class";
import CreateClass from "../pages/Class/CreateClass";
import EditClass from "../pages/Class/EditClass";
import Statistic from "../pages/Statistic/Statistic";

export const classRoutes: IRouter[] = [
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
];
