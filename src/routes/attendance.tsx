import { IRouter } from ".";
import Attendance from "../pages/Attendance/Attendance";
import CreateAttendance from "../pages/Attendance/CreateAttendance";
import EditAttendance from "../pages/Attendance/EditAttendance";

export const attendanceRoutes: IRouter[] = [
  {
    path: "attendance",
    element: <Attendance />,
  },
  {
    path: "attendance/create",
    element: <CreateAttendance />,
  },
  {
    path: "attendance/edit/:id",
    element: <EditAttendance />,
  },
];
