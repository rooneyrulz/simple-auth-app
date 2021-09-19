import { v4 } from "uuid";
import * as types from "./types";

export const setAlert =
  (msg, status, alertType, alertId = null, timeout = 4000) =>
  (dispatch) => {
    const id = v4();

    // DISPATCH SET ALERT
    dispatch({
      type: types.SET_ALERT,
      payload: { id, msg, status, alertType, alertId },
    });

    // DISPATCH REMOVE ALERT
    setTimeout(() => {
      dispatch({ type: types.REMOVE_ALERT, payload: id });
    }, timeout);
  };

export const removeAlert = (id) => (dispatch) =>
  dispatch({ type: types.REMOVE_ALERT, payload: id });
