import { IRouter } from ".";
import { pathNames } from "../constants";
import CreateMajor from "../pages/Major/CreateMajor";
import EditMajor from "../pages/Major/EditMajor";
import Major from "../pages/Major/Major";
import ScoreColumnManagementMajor from "../pages/Major/ScoreColumnManagementMajor";

export const majorRoutes: IRouter[] = [
  {
    path: pathNames.MAJOR,
    element: <Major />,
  },
  {
    path: pathNames.MAJOR + "/create",
    element: <CreateMajor />,
  },
  {
    path: pathNames.MAJOR + "/edit/:id",
    element: <EditMajor />,
  },
  {
    path: pathNames.MAJOR + "/score-column-management/:id",
    element: <ScoreColumnManagementMajor />,
  },
];
