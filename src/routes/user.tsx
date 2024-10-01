import { IRouter } from ".";
import { pathNames } from "../constants";
import CreateUser from "../pages/User/CreateUser";
import EditUser from "../pages/User/EditUser";
import User from "../pages/User/User";

export const userRoutes: IRouter[] = [
  {
    path: pathNames.USER,
    element: <User />,
  },
  {
    path: pathNames.USER + "/create",
    element: <CreateUser />,
  },
  {
    path: pathNames.USER + "/edit/:id",
    element: <EditUser />,
  },
];
