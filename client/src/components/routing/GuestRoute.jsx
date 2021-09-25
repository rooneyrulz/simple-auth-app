import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import AppLoader from "layouts/AppLoader";

const GuestRoute = ({ component: Component, user, admin, ...rest }) => {
  return (
    <Route
      render={(props) => {
        if (user.loading || admin.loading) {
          return <AppLoader />;
        } else if (user.isAuthenticated && user.user.role === "user") {
          return <Redirect to='/dashboard' />;
        } else if (admin.isAuthenticated && admin.admin.role === "admin") {
          return <Redirect to='/users' />;
        } else {
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

export default connect(mapStateToProps)(GuestRoute);
