import { IAdminState, AdminActions } from "./admin";
import { IUserState, UserActions } from "./user";
import { IAlertState, AlertActions } from "./alert";

export type AppState = IAdminState | IUserState | IAlertState;
export type AppActions = AdminActions | UserActions | AlertActions;
