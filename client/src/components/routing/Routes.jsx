import React from "react";
import { Route, Switch } from "react-router-dom";

import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import GuestRoute from "./GuestRoute";

import * as ROUTES from "constant/routes";

const Routes = () => {
  return (
    <Switch>
      <GuestRoute {...ROUTES.LOGIN} />
      <GuestRoute {...ROUTES.REGISTER} />
      <PrivateRoute {...ROUTES.DASHBOARD} />
      <AdminRoute {...ROUTES.USERS} />
      <Route {...ROUTES.NOTFOUND} />
    </Switch>
  );
};

export default Routes;
