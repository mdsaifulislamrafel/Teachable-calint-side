import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Home/Home";
import Error from "../Home/Error";
import Login from "../Pages/Signup/Login";
import Registration from "../Pages/Signup/Registration";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Registration />
            }
        ]
    },
]);