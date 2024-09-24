import { IRouter } from ".";
import CreateDepartment from "../pages/Department/CreateDepartment";
import Department from "../pages/Department/Department";
import EditDepartment from "../pages/Department/EditDepartment";

export const departmentRoutes: IRouter[] = [
  {
    path: "department",
    element: <Department />,
  },
  {
    path: "department/create",
    element: <CreateDepartment />,
  },
  {
    path: "department/edit/:id",
    element: <EditDepartment />,
  },
];
