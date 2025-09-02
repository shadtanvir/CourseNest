import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import CourseDetails from "../Pages/CourseDetails";
import PrivateRoute from "./PrivateRoute";
import AddCourse from "../Pages/AddCourse";
import ManageCourses from "../Pages/ManageCourses";
import EditCourse from "../Pages/EditCourse";

const mainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <h1></h1>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/courses/:id",
        element: <CourseDetails></CourseDetails>,
      },

      {
        path: "/courses",
        element: (
          <PrivateRoute>
            <ManageCourses></ManageCourses>
          </PrivateRoute>
        ),
      },
      {
        path: "/edit-course/:id",
        element: (
          <PrivateRoute>
          <EditCourse></EditCourse>
          </PrivateRoute>
        ),
      },
      {
        path: "/add-course",
        element: (
          <PrivateRoute>
            <AddCourse></AddCourse>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/auth/register",
        element: <Register></Register>,
      },
      {
        path: "/auth/login",
        element: <Login></Login>,
      },
    ],
  },
]);

export default mainRoutes;
