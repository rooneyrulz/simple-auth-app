import * as types from "redux/actions/types";

const initialState = {
  token: localStorage.getItem("admin__token"),
  loading: true,
  isAuthenticated: null,
  admin: {},
  users: [],
};

const adminReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.ADMIN_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        admin: payload,
      };

    case types.ADMIN_LOGIN_SUCCESS:
      localStorage.setItem("admin__token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };

    case types.GET_USERS:
      return {
        ...state,
        users: payload,
      };

    case types.DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== payload),
      };

    case types.UPDATE_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === payload.id ? { ...payload.user } : user
        ),
      };

    case types.ADMIN_LOGIN_FAIL:
    case types.ADMIN_AUTH_ERROR:
    case types.ADMIN_LOGOUT:
      localStorage.removeItem("admin__token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        admin: null,
        users: [],
      };

    default:
      return state;
  }
};

export default adminReducer;
