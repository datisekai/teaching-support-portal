import { IRouter } from ".";
import CreateExam from "../pages/Exam/CreateExam";
import EditExam from "../pages/Exam/EditExam";
import Exam from "../pages/Exam/Exam";
import ExamHistory from "../pages/Exam/ExamHistory";
import ExamViewScore from "../pages/Exam/ExamViewScore";

export const examRoutes: IRouter[] = [
  {
    path: "exam",
    element: <Exam />,
  },
  {
    path: "exam/view/:id",
    element: <ExamViewScore />,
  },
  {
    path: "exam/create",
    element: <CreateExam />,
  },
  {
    path: "exam/edit/:id",
    element: <EditExam />,
  },
  {
    path: 'exam/history/:id',
    element: <ExamHistory />
  }
];
