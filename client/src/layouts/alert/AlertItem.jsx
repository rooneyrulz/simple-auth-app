import React from "react";
import { Alert as MatAlert } from "@material-ui/lab";
import { useDispatch } from "react-redux";
import { removeAlert } from "redux/actions/alert";

const AlertItem = ({ data }) => {
  const dispatch = useDispatch();

  return (
    <MatAlert
      variant='filled'
      severity={data.alertType}
      onClose={() => dispatch(removeAlert(data.id))}
    >
      {data.msg}
    </MatAlert>
  );
};

export default AlertItem;
