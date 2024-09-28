import { IRouter } from ".";
import { pathNames } from "../constants";
import CreateDepartment from "../pages/Department/CreateDepartment";
import Department from "../pages/Department/Department";
import EditDepartment from "../pages/Department/EditDepartment";

export const departmentRoutes: IRouter[] = [
  {
    path: pathNames.DEPARTMENT,
    element: <Department />,
  },
  {
    path: pathNames.DEPARTMENT + "/create",
    element: <CreateDepartment />,
  },
  {
    path: pathNames.DEPARTMENT + "/edit/:id",
    element: <EditDepartment />,
  },
];
