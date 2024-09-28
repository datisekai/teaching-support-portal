import { IRouter } from ".";
import { pathNames } from "../constants";
import Letter from "../pages/Letter/Letter";

export const letterRoutes: IRouter[] = [
  {
    path: pathNames.LETTER,
    element: <Letter />,
  },
];
