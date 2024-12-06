import { RouteObject } from "react-router-dom";
import { pathNames } from "../constants";
import Chapter from "../pages/Chapter/Chapter";
import CreateChapter from "../pages/Chapter/CreateChapter";

export const chapterRoutes: RouteObject[] = [
  {
    path: pathNames.CHAPTER,
    element: <Chapter />,
  },
  {
    path: pathNames.CHAPTER + "/create",
    element: <CreateChapter />,
  },
];
