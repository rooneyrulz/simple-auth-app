import types from "redux/actions/types";
import { IUser } from "./user";

export interface IAdmin {
  _id: any;
  username: string;
  password: string | null;
  role: string;
}

interface IAdminLoaded {
  type: typeof types.ADMIN_LOADED;
  payload: IAdmin;
}

interface IAdminRegisterSuccess {
  type: typeof types.ADMIN_REGISTER_SUCCESS;
  payload: { token: string; admin: IAdmin };
}

interface IAdminLoginSuccess {
  type: typeof types.ADMIN_LOGIN_SUCCESS;
  payload: { token: string; admin: IAdmin };
}

interface IGetUsers {
  type: typeof types.GET_USERS;
  payload: IUser[];
}

interface IUpdateUser {
  type: typeof types.UPDATE_USER;
  payload: {
    user: IUser;
    id: number;
  };
}

interface IDeleteUser {
  type: typeof types.DELETE_USER;
  payload: number;
}

interface IAdminRegisterFail {
  type: typeof types.ADMIN_REGISTER_FAIL;
}

interface IAdminLoginFail {
  type: typeof types.ADMIN_LOGIN_FAIL;
}

interface IAdminAuthError {
  type: typeof types.ADMIN_AUTH_ERROR;
}

interface IAdminLogout {
  type: typeof types.ADMIN_LOGOUT;
}

export type AdminActions =
  | IAdminLoaded
  | IAdminLoginSuccess
  | IAdminRegisterSuccess
  | IAdminRegisterFail
  | IAdminLoginFail
  | IAdminAuthError
  | IAdminLogout
  | IGetUsers
  | IUpdateUser
  | IDeleteUser;

export interface IAdminState {
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean | null;
  admin: IAdmin;
  users: IUser[];
}
