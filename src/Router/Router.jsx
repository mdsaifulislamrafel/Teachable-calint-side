import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Home/Home";
import Error from "../Home/Error";
import Login from "../Components/Login/Login";
import Registration from "../Components/Registration/Registration";
import AllClass from "../Components/AllClass/AllClass";
import ClassDetails from "../Components/ClassDetails/ClassDetails";
import PrivateRoute from "../Provider/PrivatRoute";
import Payment from "../Components/Payment/Payment";
import DashBoard from "../Components/DashBoard/DashBoard";
import MyEnrollClass from "../Components/DashBoard/MyEnrollClass/MyEnrollClass";
import TeacherApplicationForm from "../Components/DashBoard/TeacherApplicationForm/TeacherApplicationForm";
import Profile from "../Components/DashBoard/Profile/Profile";
import MyEnrollDetails from "../Components/DashBoard/MyEnrollDetails/MyEnrollDetails";


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
                path: '/allClass',
                element: <AllClass />
            },
            {
                path: '/classDetails/:id',
                element: <PrivateRoute><ClassDetails /></PrivateRoute>
            },
            {
                path: '/payment/:id',
                element: <PrivateRoute><Payment /></PrivateRoute>
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Registration />,
            }
        ]

    },
    {
        path: 'dashboard',
        element: <DashBoard />,
        errorElement: <Error />,
        children: [
            {
                path: 'myEnrollClass',
                element: <PrivateRoute><MyEnrollClass /></PrivateRoute>
            },
            {
                path: 'myEnrollClassDetails/:id',
                element: <PrivateRoute><MyEnrollDetails /></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/carts/${params.id}`)

            },
            {
                path: 'profile',
                element: <PrivateRoute><Profile /></PrivateRoute>
            },
            {
                path: 'teacherApplicationForm',
                element: <TeacherApplicationForm />
            }
        ]
    }
]);