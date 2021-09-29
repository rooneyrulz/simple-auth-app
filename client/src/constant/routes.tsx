import React from "react";

// Components
const Dashboard = React.lazy(() => import("pages/dashboard/Dashboard"));
const Users = React.lazy(() => import("pages/admin/Users"));
const Login = React.lazy(() => import("pages/auth/Login"));
const Register = React.lazy(() => import("pages/auth/Register"));
const NotFound = React.lazy(() => import("pages/not-found/NotFound"));

type ROUTES = {
  name: string;
  path: string;
  component: React.FC;
  exact?: boolean;
  role?: string;
  auth?: boolean;
};

export const LOGIN: ROUTES = {
  name: "login",
  path: "/",
  component: Login,
  exact: true,
  role: "guest",
  auth: false,
};

export const REGISTER: ROUTES = {
  name: "register",
  path: "/register",
  component: Register,
  exact: true,
  role: "guest",
  auth: false,
};

export const DASHBOARD: ROUTES = {
  name: "dashboard",
  path: "/dashboard",
  component: Dashboard,
  exact: true,
  role: "user",
  auth: true,
};

export const USERS: ROUTES = {
  name: "users",
  path: "/users",
  component: Users,
  exact: true,
  role: "admin",
  auth: true,
};

export const NOTFOUND: ROUTES = {
  name: "notfound",
  path: "*",
  component: NotFound,
};
