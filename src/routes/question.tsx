import { IRouter } from ".";
import CreateQuestion from "../pages/Question/CreateQuestion";
import EditQuestion from "../pages/Question/EditQuestion";
import MyQuestion from "../pages/Question/MyQuestion";
import Question from "../pages/Question/Question";

export const questionRoutes: IRouter[] = [
  {
    path: "question",
    element: <Question />,
  },
  {
    path: "my-question",
    element: <MyQuestion />,
  },
  {
    path: "question/create",
    element: <CreateQuestion />,
  },
  {
    path: "question/edit/:id",
    element: <EditQuestion />,
  },
];
