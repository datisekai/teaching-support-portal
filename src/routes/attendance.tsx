import { IRouter } from ".";
import Attendance from "../pages/Attendance/Attendance";
import CreateAttendance from "../pages/Attendance/CreateAttendance";
import DetailAttendance from "../pages/Attendance/DetailAttendance";
import EditAttendance from "../pages/Attendance/EditAttendance";
import Logs from "../pages/Attendance/Logs";

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
  {
    path: "attendance/detail/:id",
    element: <DetailAttendance />,
  },
  {
    path: "attendance/logs/:id",
    element: <Logs />,
  },
];
