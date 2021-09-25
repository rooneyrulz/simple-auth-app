import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import AppLoader from "layouts/AppLoader";

const AdminRoute = ({ component: Component, user, admin, ...rest }) => {
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

const mapStateToProps = (state) => ({
  user: state.user,
  admin: state.admin,
});

export default connect(mapStateToProps)(AdminRoute);
