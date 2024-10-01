import { IRouter } from ".";
import { pathNames } from "../constants";
import CreateSubject from "../pages/Subject/CreateSubject";
import EditSubject from "../pages/Subject/EditSubject";
import Subject from "../pages/Subject/Subject";

export const subjectRoutes: IRouter[] = [
  {
    path: pathNames.SUBJECT,
    element: <Subject />,
  },
  {
    path: pathNames.SUBJECT + "/create",
    element: <CreateSubject />,
  },
  {
    path: pathNames.SUBJECT + "/edit/:id",
    element: <EditSubject />,
  },
];
