import * as types from "redux/actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  loading: true,
  isAuthenticated: null,
  authUser: {},
  users: [],
  user: {},
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        authUser: payload,
      };

    case types.REGISTER_SUCCESS:
    case types.LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
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

    case types.GET_USER:
      return {
        ...state,
        user: payload,
      };

    case types.UPDATE_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === payload.id ? { ...payload.user } : user
        ),
      };

    case types.REGISTER_FAIL:
    case types.LOGIN_FAIL:
    case types.AUTH_ERROR:
    case types.LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        authUser: null,
      };

    default:
      return state;
  }
};

export default authReducer;
