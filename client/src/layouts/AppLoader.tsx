import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100vh",
    display: "flex",
    displayDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const AppLoader: React.FC = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
};

export default AppLoader;
