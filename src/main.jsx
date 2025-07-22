import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import mainRoutes from "./Routers/mainRoutes.jsx";
import AuthProvider from "./Provider/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={mainRoutes}></RouterProvider>
    </AuthProvider>
  </StrictMode>
);
