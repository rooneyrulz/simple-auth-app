import * as types from "redux/actions/types";

const initialState = {
  token: localStorage.getItem("user__token"),
  loading: true,
  isAuthenticated: null,
  user: {},
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };

    case types.USER_REGISTER_SUCCESS:
    case types.USER_LOGIN_SUCCESS:
      localStorage.setItem("user__token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };

    case types.USER_REGISTER_FAIL:
    case types.USER_LOGIN_FAIL:
    case types.USER_AUTH_ERROR:
    case types.USER_LOGOUT:
      localStorage.removeItem("user__token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };

    default:
      return state;
  }
};

export default userReducer;
