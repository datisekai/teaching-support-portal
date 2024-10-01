import { IRouter } from ".";
import Exam from "../pages/Exam/Exam";

export const examRoutes: IRouter[] = [
  {
    path: "exam",
    element: <Exam />,
  },
];
