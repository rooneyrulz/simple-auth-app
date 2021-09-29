import types from "redux/actions/types";
import { Color } from "@material-ui/lab";

export interface IAlertState {
  id?: any;
  msg: string;
  status: number;
  alertType: Color | undefined;
}

interface ISetAlertAction {
  type: typeof types.SET_ALERT;
  payload: IAlertState;
}

interface IRemoveAlertAction {
  type: typeof types.REMOVE_ALERT;
  payload: any;
}

export type AlertActions = ISetAlertAction | IRemoveAlertAction;
