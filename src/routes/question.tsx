import { IRouter } from ".";
import CreateQuestion from "../pages/Question/CreateQuestion";
import Question from "../pages/Question/Question";

export const questionRoutes: IRouter[] = [
  {
    path: "question",
    element: <Question />,
  },
  {
    path: "question/create",
    element: <CreateQuestion />,
  },
];
