import types from "redux/actions/types";
import { IAdmin } from "redux/types/admin";
import { IUser } from "redux/types/user";
import { IAdminState, AdminActions } from "../types/admin";

const initialState: IAdminState = {
  token: localStorage.getItem("admin__token"),
  loading: true,
  isAuthenticated: null,
  admin: {} as IAdmin,
  users: [] as IUser[],
};

const adminReducer = (
  state = initialState,
  action: AdminActions
): IAdminState => {
  switch (action.type) {
    case types.ADMIN_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        admin: action.payload,
      };

    case types.ADMIN_LOGIN_SUCCESS:
    case types.ADMIN_REGISTER_SUCCESS:
      localStorage.setItem("admin__token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };

    case types.GET_USERS:
      return {
        ...state,
        users: action.payload,
      };

    case types.DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
      };

    case types.UPDATE_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload.id ? { ...action.payload.user } : user
        ),
      };

    case types.ADMIN_LOGIN_FAIL:
    case types.ADMIN_REGISTER_FAIL:
    case types.ADMIN_AUTH_ERROR:
    case types.ADMIN_LOGOUT:
      localStorage.removeItem("admin__token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        admin: {} as IAdmin,
        users: [],
      };

    default:
      return state;
  }
};

export default adminReducer;
