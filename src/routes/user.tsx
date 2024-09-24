import { IRouter } from ".";
import CreateUser from "../pages/User/CreateUser";
import EditUser from "../pages/User/EditUser";
import User from "../pages/User/User";

export const userRoutes: IRouter[] = [
  {
    path: "user",
    element: <User />,
  },
  {
    path: "user/create",
    element: <CreateUser />,
  },
  {
    path: "user/edit/:id",
    element: <EditUser />,
  },
];
