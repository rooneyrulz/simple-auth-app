import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import AlertItem from "./AlertItem";
import { RootState } from "redux/reducers";
import { IAlertState } from "redux/types/alert";

const useStyles = makeStyles((theme) => ({
  alertWrapper: {
    position: "absolute",
    top: "5rem",
    right: "2rem",
    width: "20%",
    display: "flex",
    flexDirection: "column",
    gap: ".5rem",
  },
}));

const Alert: React.FC = (): JSX.Element | null => {
  const classes = useStyles();
  const alerts = useSelector((state: RootState) => state.alert);

  return alerts.length ? (
    <div className={clsx(classes.alertWrapper)}>
      {alerts.map((alert: IAlertState) => (
        <AlertItem data={alert} key={alert.id} />
      ))}
    </div>
  ) : null;
};

export default Alert;
