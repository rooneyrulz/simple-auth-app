import React from "react";

// Components
const Dashboard = React.lazy(() => import("pages/dashboard/Dashboard"));
const Users = React.lazy(() => import("pages/admin/Users"));
const Login = React.lazy(() => import("pages/auth/Login"));
const Register = React.lazy(() => import("pages/auth/Register"));
const NotFound = React.lazy(() => import("pages/not-found/NotFound"));

export const LOGIN = {
  name: "login",
  path: "/",
  component: Login,
  exact: true,
  role: "guest",
  auth: false,
};

export const REGISTER = {
  name: "register",
  path: "/register",
  component: Register,
  exact: true,
  role: "guest",
  auth: false,
};

export const DASHBOARD = {
  name: "dashboard",
  path: "/dashboard",
  component: Dashboard,
  exact: true,
  role: "user",
  auth: true,
};

export const USERS = {
  name: "users",
  path: "/users",
  component: Users,
  exact: true,
  role: "admin",
  auth: true,
};

export const NOTFOUND = {
  name: "notfound",
  path: "*",
  component: NotFound,
};
