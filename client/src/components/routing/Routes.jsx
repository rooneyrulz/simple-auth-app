import React from "react";
import { Route, Switch } from "react-router-dom";

import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import GuestRoute from "./GuestRoute";

const Dashboard = React.lazy(() => import("../../pages/dashboard/Dashboard"));
const Users = React.lazy(() => import("../../pages/admin/Users"));
const Login = React.lazy(() => import("../../pages/auth/Login"));
const Register = React.lazy(() => import("../../pages/auth/Register"));
const NotFound = React.lazy(() => import("../../pages/not-found/NotFound"));

const Routes = () => {
  return (
    <Switch>
      <GuestRoute exact path='/' component={Login} />
      <GuestRoute exact path='/register' component={Register} />
      <PrivateRoute exact path='/dashboard' component={Dashboard} />
      <AdminRoute exact path='/users' component={Users} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
