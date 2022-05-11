import React from "react";

type ROUTES = {
  name: string;
  path: string;
  component: React.FC;
  exact?: boolean;
  role?: string;
  auth?: boolean;
};

const routesProps: ROUTES[] = [
  {
    name: "login",
    path: "/",
    component: React.lazy(() => import("pages/auth/Login")),
    exact: true,
    role: "guest",
    auth: false,
  },
  {
    name: "register",
    path: "/register",
    component: React.lazy(() => import("pages/auth/Register")),
    exact: true,
    role: "guest",
    auth: false,
  },
  {
    name: "dashboard",
    path: "/dashboard",
    component: React.lazy(() => import("pages/dashboard/Dashboard")),
    exact: true,
    role: "user",
    auth: true,
  },
  {
    name: "users",
    path: "/users",
    component: React.lazy(() => import("pages/admin/Users")),
    exact: true,
    role: "admin",
    auth: true,
  },
  {
    name: "notfound",
    path: "*",
    component: React.lazy(() => import("pages/not-found/NotFound")),
  },
];

export default routesProps;
