import { IRouter } from ".";
import { pathNames } from "../constants";
import CreateNotification from "../pages/Notification/CreateNotification";
import EditNotification from "../pages/Notification/EditNotification";
import Notification from "../pages/Notification/Notification";

export const notificationRoutes: IRouter[] = [
  {
    path: pathNames.NOTIFICATION,
    element: <Notification />,
  },
  {
    path: pathNames.NOTIFICATION + "/create",
    element: <CreateNotification />,
  },
  {
    path: pathNames.NOTIFICATION + "/edit/:id",
    element: <EditNotification />,
  },
];
