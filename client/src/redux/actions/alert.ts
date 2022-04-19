import { Dispatch } from "redux";
import { v4 } from "uuid";
import types from "./types";
import { IAlertState, AlertActions } from "redux/types/alert";

export const setAlert =
  (data: IAlertState) => (dispatch: Dispatch<AlertActions>) => {
    const id = v4();
    const { msg, status, alertType } = data;

    // DISPATCH SET ALERT
    dispatch({
      type: types.SET_ALERT,
      payload: { id, msg, status, alertType },
    });

    // DISPATCH REMOVE ALERT
    setTimeout(() => {
      dispatch({ type: types.REMOVE_ALERT, payload: id });
    }, 4000);
  };

export const removeAlert = (id: number) => (dispatch: Dispatch<AlertActions>) =>
  dispatch({ type: types.REMOVE_ALERT, payload: id });

export type AlertActionsType = typeof setAlert | typeof removeAlert
