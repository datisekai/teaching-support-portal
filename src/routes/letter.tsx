import { IRouter } from ".";
import Letter from "../pages/Letter/Letter";

export const letterRoutes: IRouter[] = [
  {
    path: "letter",
    element: <Letter />,
  },
];
