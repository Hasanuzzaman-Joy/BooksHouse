import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Error from "../Pages/Error";
import PrivateRoute from "../Services/PrivateRoute";
import Bookshelf from "../Pages/Books/Bookshelf";
import Profile from "../Pages/Profile/Profile";
import MyBooks from "../Pages/Books/MyBooks";
import AddBook from "../Pages/Books/AddBook";
import UpdateBook from "../Pages/Books/UpdateBook";
import Loading from "../Components/Loading";
import BookDetails from "../Pages/Books/BookDetails";
import CategoryBooks from "../Pages/Books/CategoryBooks";
import DashboardLayouts from "../Layouts/DashboardLayouts";
import Contact from "../Pages/Auth/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/bookshelf",
        Component: Bookshelf,
      },
      {
        path: "/categories/:category",
        loader: ({ params }) =>
          fetch(
            `${import.meta.env.VITE_SERVER_URL}/categories/${params.category}`
          ),
        element: <CategoryBooks />,
        hydrateFallbackElement: <Loading />,
        errorElement: <Error />,
      },
      {
        path: "book-details/:id",
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_SERVER_URL}/book/${params.id}`),
        element: <BookDetails />,
        hydrateFallbackElement: <Loading />,
        errorElement: <Error />,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/contact",
        Component: Contact,
      },
      {
        path: "*",
        Component: Error,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: DashboardLayouts,
    children: [
      {
        path: "my-books",
        element: (
          <PrivateRoute>
            <MyBooks />
          </PrivateRoute>
        ),
      },
      {
        path: "add-book",
        element: (
          <PrivateRoute>
            <AddBook />
          </PrivateRoute>
        ),
      },
      {
        path: "update-book/:id",
        element: (
          <PrivateRoute>
            <UpdateBook />
          </PrivateRoute>
        ),
        errorElement: <Error />,
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "*",
        Component: Error,
      },
    ],
  },
]);

export default router;
