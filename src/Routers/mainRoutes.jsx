import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";

const mainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout> ,
    errorElement: <h1></h1> ,
    children: [
      {
        index:true,
        element: <Home></Home> ,
      },
      {
        path: "login",
        element: <h1></h1>,
      },
      {
        path: "registration",
        element: <h1></h1> ,
      },
      {},
    ],
  },
]);

export default mainRoutes;
