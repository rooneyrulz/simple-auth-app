import React from "react";
import { Slide } from "@material-ui/core";
import { Alert as MatAlert } from "@material-ui/lab";

const AlertItem = ({ data }) => {
  return (
    <Slide direction='up' in={true} mountOnEnter unmountOnExit>
      <MatAlert variant='filled' severity={data.alertType}>
        {data.msg}
      </MatAlert>
    </Slide>
  );
};

export default AlertItem;
