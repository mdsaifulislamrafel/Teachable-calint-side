import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Home/Home";
import Error from "../Home/Error";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <Home />
            }
        ]
    },
]);