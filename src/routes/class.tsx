import { IRouter } from ".";
import { pathNames } from "../constants";
import Class from "../pages/Class/Class";
import CreateClass from "../pages/Class/CreateClass";
import EditClass from "../pages/Class/EditClass";
import ScoreColumnManagement from "../pages/Class/ScoreColumnManagement";
import ScoreManagement from "../pages/Class/ScoreManagement";
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
    path: pathNames.CLASS + "/statistic/:id",
    element: <Statistic />,
  },
  {
    path: pathNames.CLASS + "/score-column-management/:id",
    element: <ScoreColumnManagement />,
  },
  {
    path: pathNames.CLASS + "/score/:id",
    element: <ScoreManagement />,
  },
];
