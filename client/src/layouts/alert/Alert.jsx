import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import AlertItem from "./AlertItem";

const useStyles = makeStyles((theme) => ({
  alertWrapper: {
    position: "absolute",
    bottom: "5rem",
    right: "2rem",
    width: "20%",
    display: "flex",
    flexDirection: "column",
    gap: ".5rem",
  },
}));

const Alert = () => {
  const classes = useStyles();
  const alerts = useSelector((state) => state.alert);

  return alerts.length ? (
    <div className={clsx(classes.alertWrapper)}>
      {alerts.map((alert) => (
        <AlertItem data={alert} key={alert.id} />
      ))}
    </div>
  ) : null;
};

export default Alert;
