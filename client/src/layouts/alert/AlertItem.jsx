import React from "react";
import { Alert as MatAlert } from "@material-ui/lab";

const AlertItem = ({ data }) => {
  return (
    <MatAlert variant='filled' severity={data.alertType}>
      {data.msg}
    </MatAlert>
  );
};

export default AlertItem;
