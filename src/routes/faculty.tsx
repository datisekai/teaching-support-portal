import { IRouter } from ".";
import { pathNames } from "../constants";
import CreateFaculty from "../pages/Faculty/CreateFaculty";
import Faculty from "../pages/Faculty/Faculty";
import EditFaculty from "../pages/Faculty/EditFaculty";
import { RouteObject } from "react-router-dom";

export const facultyRoutes: RouteObject[] = [
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
    loader: ({ params }) => {
      console.log(params);
      return { id: "" };
    },
  },
];
