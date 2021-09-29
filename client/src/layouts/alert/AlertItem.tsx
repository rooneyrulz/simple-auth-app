import React from "react";
import { Alert as MatAlert } from "@material-ui/lab";
import { useDispatch } from "react-redux";
import { removeAlert } from "redux/actions/alert";
import { IAlertState } from "redux/types/alert";

type Props = {
  data: IAlertState;
};

const AlertItem: React.FC<Props> = ({ data }): JSX.Element => {
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
