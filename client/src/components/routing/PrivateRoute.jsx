import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import AppLoader from "../../layouts/AppLoader";

const PrivateRoute = ({
  component: Component,
  auth: { loading, isAuthenticated, authUser },
  ...rest
}) => {
  return (
    <Route
      render={(props) => {
        if (loading) {
          return <AppLoader />;
        }
        if (!isAuthenticated) {
          return <Redirect to='/' />;
        }
        if (isAuthenticated && authUser.role === "admin") {
          return <Redirect to='/users' />;
        }
        if (isAuthenticated && authUser.role === "user") {
          return <Component {...props} />;
        }
      }}
      {...rest}
    />
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
