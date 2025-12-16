import React from "react";
import { createBrowserRouter } from "react-router-dom";

// User Layout
import Layout from "./Layout/Layout";

// Admin Layout
import AdminLayout from "./Layout/AdminLayout";

// User Pages
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import CarList from "./pages/Cars";
import CarDetails from "./pages/CarDetails";
import BlogList from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";
import LoginPage from "./pages/Login";

// Admin Pages

import ScrollToTop from "./components/ScrollToTop";
import RouteProgressBar from "./components/TopLoader";
import ErrorPage from "./pages/ErrorPage";
import Dashboard from "./pages/Dashboard";
import ManageBlogs from "./components/admin/ManageBlogs";
import ManageMessages from "./components/admin/ManageMessage";
import ManageCars from "./components/admin/ManageCars";

const router = createBrowserRouter([
  // =========================
  // USER ROUTES
  // =========================
  {
    path: "/",
    element: (
      <>
        <ScrollToTop />
        <RouteProgressBar />
        <Layout />
      </>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "contact", element: <Contact /> },
      { path: "cars", element: <CarList /> },
      { path: "cars/:documentId", element: <CarDetails /> },
      { path: "blog", element: <BlogList /> },
      { path: "blog/:documentId", element: <BlogDetails /> },
      { path: "login", element: <LoginPage /> },
    ],
  },

  // =========================
  // ADMIN ROUTES
  // =========================
  {
    path: "/admin",
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: < Dashboard/> },
      { path: "dashboard", element: < Dashboard/> },
      { path: "blogs", element: <ManageBlogs /> },
      { path: "message", element: <ManageMessages /> },
      { path: "cars", element: <ManageCars /> },
      // { path: "cars", element: <ManageCars /> },
    ],
  },
]);

export default router;
