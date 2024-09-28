import { IRouter } from ".";
import { pathNames } from "../constants";
import Class from "../pages/Class/Class";
import CreateClass from "../pages/Class/CreateClass";
import EditClass from "../pages/Class/EditClass";
import Statistic from "../pages/Statistic/Statistic";

export const classRoutes: IRouter[] = [
  {
    path: pathNames.CLASS,
    element: <Class />,
  },
  {
    path: pathNames.CLASS + "/create",
    element: <CreateClass />,
  },
  {
    path: pathNames.CLASS + "/edit/:id",
    element: <EditClass />,
  },
  {
    path: pathNames.CLASS + '/statistic/:id',
    element: <Statistic />,
  },
];
