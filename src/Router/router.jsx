import { createBrowserRouter } from "react-router"
import MainLayout from '../Layouts/MainLayout'
import Home from '../Pages/Home/Home'
import Login from "../Pages/Auth/Login"
import Register from '../Pages/Auth/Register'
import Error from "../Pages/Error"
import PrivateRoute from '../Services/PrivateRoute'
import Bookshelf from '../Pages/Books/Bookshelf'
import Profile from '../Pages/Profile'
import MyBooks from '../Pages/Books/MyBooks'
import AddBook from '../Pages/Books/AddBook'
import UpdateBook from "../Pages/Books/UpdateBook"
import Loading from "../Components/Loading"

const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path:'/bookshelf',
                Component:Bookshelf
            },
            {
                path:'/my-books',
                element:<PrivateRoute>
                    <MyBooks />
                </PrivateRoute>
            },
            {
                path:'/add-book',
                element:<PrivateRoute>
                    <AddBook />
                </PrivateRoute>
            },
            {
                path:'/update-book/:id',
                loader:({params}) => fetch(`${import.meta.env.VITE_SERVER_URL}/book/${params.id}`),
                element:<PrivateRoute>
                    <UpdateBook />
                </PrivateRoute>,
                hydrateFallbackElement:<Loading />
            },
            {
                path:'/profile',
                element:<PrivateRoute>
                    <Profile />
                </PrivateRoute>
            },
            {
                path:'/login',
                Component:Login
            },
            {
                path:'/register',
                Component:Register
            }
        ]
    },
    {
        path: "*",
        Component: Error
    }
])

export default router