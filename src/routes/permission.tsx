import { IRouter } from ".";

import Permission from "../pages/Permission/Permission";
import PermissionAssign from "../pages/Permission/PermissionAssign";

export const permissionRoutes: IRouter[] = [
  {
    path: "permission",
    element: <Permission />,
  },
  {
    path: "permission/assign/:id",
    element: <PermissionAssign />,
  },
];
