import { IRouter } from ".";
import { pathNames } from "../constants";
import CreateFaculty from "../pages/Faculty/CreateFaculty";
import Faculty from "../pages/Faculty/Faculty";
import EditFaculty from "../pages/Faculty/EditFaculty";

export const FacultyRoutes: IRouter[] = [
  {
    path: pathNames.FACULTY,
    element: <Faculty />,
  },
  {
    path: pathNames.FACULTY + "/create",
    element: <CreateFaculty />,
  },
  {
    path: pathNames.FACULTY + "/edit/:id",
    element: <EditFaculty />,
  },
];
