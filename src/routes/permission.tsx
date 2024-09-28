import { IRouter } from ".";
import { pathNames } from "../constants";

import Permission from "../pages/Permission/Permission";
import PermissionAssign from "../pages/Permission/PermissionAssign";

export const permissionRoutes: IRouter[] = [
  {
    path: pathNames.PERMISSION,
    element: <Permission />,
  },
  {
    path: pathNames.PERMISSION + "/assign/:id",
    element: <PermissionAssign />,
  },
];
