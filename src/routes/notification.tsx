import { IRouter } from ".";
import CreateNotification from "../pages/Notification/CreateNotification";
import EditNotification from "../pages/Notification/EditNotification";
import Notification from "../pages/Notification/Notification";

export const notificationRoutes: IRouter[] = [
  {
    path: "notification",
    element: <Notification />,
  },
  {
    path: "notification/create",
    element: <CreateNotification />,
  },
  {
    path: "notification/edit/:id",
    element: <EditNotification />,
  },
];
