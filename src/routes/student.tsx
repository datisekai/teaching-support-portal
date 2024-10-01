import { IRouter } from ".";
import { pathNames } from "../constants";
import CreateStudent from "../pages/Student/CreateStudent";
import EditStudent from "../pages/Student/EditStudent";
import Student from "../pages/Student/Student";

export const studentRoutes: IRouter[] = [
  {
    path: pathNames.STUDENT + "/detail/:id",
    element: <Student />,
  },
  {
    path: pathNames.STUDENT + "/create/:id",
    element: <CreateStudent />,
  },
  {
    path: pathNames.STUDENT + "/edit/:id",
    element: <EditStudent />,
  },
];
