import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { logOutUser } from "redux/actions/user";
import { logOutAdmin } from "redux/actions/admin";
import { RootState } from "redux/reducers";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#222",
    zIndex: 2
  },
  title: {
    color: "#fff"
  },
  navLink: {
    textDecoration: 'none',
    color: '#f4f4f4',
    fontFamily: "Roboto",
    padding: theme.spacing(1, 2)
  }
}));

const AppHeader: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);
  const admin = useSelector((state: RootState) => state.admin);

  const topLinks =
    user.isAuthenticated && user.user.role === "user" ? (
      <NavLink exact to='/dashboard' className={`${classes.navLink} nav-link`}>
        Dashboard
      </NavLink>
    ) : admin.isAuthenticated && admin.admin.role === "admin" ? (
      <NavLink exact to='/users' className={`${classes.navLink} nav-link`}>
        Dashboard
      </NavLink>
    ) : null;

  const bottomLinks = user.isAuthenticated ? (
    <NavLink exact to='#' className={`${classes.navLink} nav-link`} onClick={(e) => dispatch(logOutUser())}>
      Logout
    </NavLink>
  ) : admin.isAuthenticated ? (
    <NavLink exact to='#' className={`${classes.navLink} nav-link`} onClick={(e) => dispatch(logOutAdmin())}>
      Logout
    </NavLink>
  ) : (
    <>
      <NavLink exact to='/register' className={`${classes.navLink} nav-link`}>
        Register
      </NavLink>
      <NavLink exact to='/' className={`${classes.navLink} nav-link`}>
        Login
      </NavLink>
    </>
  );

  return (
    <Toolbar className={classes.toolbar}>
      <Typography variant='h6' noWrap className={classes.title}>
        Multi Auth
      </Typography>
      <div>{topLinks}</div>
      <div>{bottomLinks}</div>
    </Toolbar>
  );
};

export default AppHeader;
