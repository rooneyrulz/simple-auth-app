import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import AppLoader from "layouts/AppLoader";

const PrivateRoute = ({ component: Component, user, admin, ...rest }) => {
  return (
    <Route
      render={(props) => {
        if (user.loading) {
          return <AppLoader />;
        }
        if (!user.isAuthenticated) {
          return <Redirect to='/' />;
        }
        if (admin.isAuthenticated && admin.admin.role === "admin") {
          return <Redirect to='/users' />;
        }
        if (user.isAuthenticated && user.user.role === "user") {
          return <Component {...props} />;
        }
      }}
      {...rest}
    />
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  admin: state.admin,
});

export default connect(mapStateToProps)(PrivateRoute);
