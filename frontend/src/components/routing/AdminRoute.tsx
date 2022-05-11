import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";

import AppLoader from "layouts/AppLoader";
import { RootState } from "redux/reducers";

type Props = {
  component: React.ComponentType<RouteProps>;
};

const AdminRoute: React.FC<Props> = ({
  component: Component,
  ...rest
}): JSX.Element => {
  const user = useSelector((state: RootState) => state.user);
  const admin = useSelector((state: RootState) => state.admin);

  return (
    <Route
      render={(props) => {
        if (admin.loading) {
          return <AppLoader />;
        }
        if (!admin.isAuthenticated) {
          return <Redirect to='/' />;
        }
        if (user.isAuthenticated && user.user.role === "user") {
          return <Redirect to='/dashboard' />;
        }
        if (admin.isAuthenticated && admin.admin.role === "admin") {
          return <Component {...props} />;
        }
      }}
      {...rest}
    />
  );
};

export default AdminRoute;
