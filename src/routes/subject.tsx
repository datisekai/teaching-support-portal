import { IRouter } from ".";
import CreateSubject from "../pages/Subject/CreateSubject";
import EditSubject from "../pages/Subject/EditSubject";
import Subject from "../pages/Subject/Subject";

export const subjectRoutes: IRouter[] = [
  {
    path: "subject",
    element: <Subject />,
  },
  {
    path: "subject/create",
    element: <CreateSubject />,
  },
  {
    path: "subject/edit/:id",
    element: <EditSubject />,
  },
];
