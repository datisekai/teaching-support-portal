import { IRouter } from ".";
import CreateStudent from "../pages/Student/CreateStudent";
import EditStudent from "../pages/Student/EditStudent";
import Student from "../pages/Student/Student";

export const studentRoutes: IRouter[] = [
  {
    path: "student/detail/:id",
    element: <Student />,
  },
  {
    path: "student/create/:id",
    element: <CreateStudent />,
  },
  {
    path: "student/edit/:id",
    element: <EditStudent />,
  },
];
