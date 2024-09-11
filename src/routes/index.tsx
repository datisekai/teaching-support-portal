import { createBrowserRouter } from "react-router-dom"
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Preview from "../pages/Preview";

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/preview/:componentName',
        element: <Preview />
    },
    {
        path: '/',
        element: <AuthLayout />,
        children: [
            {
                path: '',
                element: <Home />
            }
        ]

    }
]);

export default router;