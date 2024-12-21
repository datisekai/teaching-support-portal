import { IRouter } from ".";
import { pathNames } from "../constants";
import CreateLocation from "../pages/Location/CreateLocation";
import EditLocation from "../pages/Location/EditLocation";
import Location from "../pages/Location/Location";

export const locationRoutes: IRouter[] = [
    {
        path: pathNames.LOCATION,
        element: <Location />,
    },
    {
        path: pathNames.LOCATION + "/create",
        element: <CreateLocation />,
    },
    {
        path: pathNames.LOCATION + "/edit/:id",
        element: <EditLocation />,
    },
];
