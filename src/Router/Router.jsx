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
import Users from "../Components/DashBoard/AllUsers/Users";
import TeacherRequest from "../Components/DashBoard/TeacherRequest/TeacherRequest";
import AddClass from "../Components/DashBoard/Teachers/AddClass/AddClass";
import MyClass from "../Components/DashBoard/Teachers/MyClass/MyClass";
import Update from "../Components/DashBoard/Teachers/Update/Update";
import MyClassDetails from "../Components/DashBoard/Teachers/MyClassDetails/MyClassDetails";
import AllClasses from "../Components/DashBoard/AllClasses/AllClasses";




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
        element: <PrivateRoute><DashBoard /></PrivateRoute>,
        errorElement: <Error />,
        children: [
            {
                path: 'myEnrollClass',
                element: <PrivateRoute><MyEnrollClass /></PrivateRoute>
            },
            {
                path: 'myEnrollClassDetails/:id',
                element: <MyEnrollDetails />,
                loader: ({ params }) => fetch(`http://localhost:5000/carts/${params.id}`)
                // loader: ({ params }) => fetch(`https://techers-cource.vercel.app/carts/${params.id}`)

            },
            {
                path: 'profile',
                element: <Profile />
            },
            {
                path: 'teacherApplicationForm',
                element: <TeacherApplicationForm />
            },
            // admin routes
            {
                path: 'teacherRequest',
                element: <TeacherRequest />
            },
            {
                path: 'users',
                element: <Users />
            },
            {
                path: 'allClasses',
                element: <AllClasses />
            },
            // teacher routes
            {
                path: 'addClass',
                element: <AddClass />
            },
            {
                path: 'myClass',
                element: <MyClass />
            },
            {
                path: 'update/:id',
                element: <Update />,
                loader: ({ params }) => fetch(`http://localhost:5000/classes/${params.id}`)
            },
            {
                path: 'myClassDetails/:id',
                element: <MyClassDetails />,
                loader: ({ params }) => fetch(`http://localhost:5000/classes/${params.id}`)
            }
        ]
    }
]);