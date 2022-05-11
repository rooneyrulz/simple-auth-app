import types from "redux/actions/types";
import { IAlertState, AlertActions } from "redux/types/alert";

const initialState: IAlertState[] = [];

const alertReducer = (
  state = initialState,
  action: AlertActions
): IAlertState[] => {
  switch (action.type) {
    case types.SET_ALERT:
      return [...state, action.payload];

    case types.REMOVE_ALERT:
      return state.filter((alert: IAlertState) => alert.id !== action.payload);

    default:
      return state;
  }
};

export default alertReducer;
