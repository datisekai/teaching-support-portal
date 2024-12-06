import { RouteObject } from "react-router-dom";
import { pathNames } from "../constants";
import CreateDifficulty from "../pages/Difficulty/CreateDifficulty";
import Difficulty from "../pages/Difficulty/Difficulty";

export const difficultyRoutes: RouteObject[] = [
  {
    path: pathNames.DIFFICULTY,
    element: <Difficulty />,
  },
  {
    path: pathNames.DIFFICULTY + "/create",
    element: <CreateDifficulty />,
  },
];
