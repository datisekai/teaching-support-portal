import { IRouter } from ".";
import Exam from "../pages/Exam/Exam";
import CreateExam from "../pages/Exam/CreateExam";
export const examRoutes: IRouter[] = [
  {
    path: "exam",
    element: <Exam />,
  },
  {
    path: "exam/create",
    element: <CreateExam />,
  },
];
