import { IRouter } from ".";
import { pathNames } from "../constants";
import Attendance from "../pages/Attendance/Attendance";
import CreateAttendance from "../pages/Attendance/CreateAttendance";
import DetailAttendance from "../pages/Attendance/DetailAttendance";
import EditAttendance from "../pages/Attendance/EditAttendance";
import Logs from "../pages/Attendance/Logs";

export const attendanceRoutes: IRouter[] = [
  {
    path: pathNames.ATTENDANCE,
    element: <Attendance />,
  },
  {
    path: pathNames.ATTENDANCE + '/create',
    element: <CreateAttendance />,
  },
  {
    path: pathNames.ATTENDANCE + "/edit/:id",
    element: <EditAttendance />,
  },
  {
    path: pathNames.ATTENDANCE + "/detail/:id",
    element: <DetailAttendance />,
  },
  {
    path: pathNames.ATTENDANCE + "/logs/:id",
    element: <Logs />,
  },
];
