import { IRouter } from ".";
import { pathNames } from "../constants";
import Theme from "../pages/Theme/Theme";

export const themeRoutes: IRouter[] = [
  {
    path: pathNames.THEME,
    element: <Theme />,
  },
];
