import React from "react";
import { Route, Switch } from "react-router-dom";

import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import GuestRoute from "./GuestRoute";

import RoutesProps from "constant/routesProps";

const Routes: React.FC = (): JSX.Element => {
  const renderRoutes = RoutesProps?.map((routeProp, key) => {
    if (!routeProp.auth && routeProp.role === "guest") {
      return <GuestRoute {...routeProp} key={`guest__route__${key}`} />;
    }
    if (routeProp.auth && routeProp.role === "user") {
      return <PrivateRoute {...routeProp} key={`private__route__${key}`} />;
    }
    if (routeProp.auth && routeProp.role === "admin") {
      return <AdminRoute {...routeProp} key={`admin__route__${key}`} />;
    }
    return <Route {...routeProp} key={`notfound__route__${key}`} />;
  });

  return <Switch>{renderRoutes}</Switch>;
};

export default Routes;
