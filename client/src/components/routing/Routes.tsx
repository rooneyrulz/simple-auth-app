import React from "react";
import { Route, Switch } from "react-router-dom";
import * as UUID from "uuid"

import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import GuestRoute from "./GuestRoute";

import RoutesProps from "constant/routesProps";

const Routes: React.FC = (): JSX.Element => {
  const renderRoutes = RoutesProps?.map((routeProp) => {
    if (!routeProp.auth && routeProp.role === "guest") {
      return <GuestRoute {...routeProp} key={`guest__route__${UUID.v4()}`} />;
    }
    if (routeProp.auth && routeProp.role === "user") {
      return <PrivateRoute {...routeProp} key={`private__route__${UUID.v4()}`} />;
    }
    if (routeProp.auth && routeProp.role === "admin") {
      return <AdminRoute {...routeProp} key={`admin__route__${UUID.v4()}`} />;
    }
    return <Route {...routeProp} key={`notfound__route__${UUID.v4()}`} />;
  });

  return <Switch>{renderRoutes}</Switch>;
};

export default Routes;
