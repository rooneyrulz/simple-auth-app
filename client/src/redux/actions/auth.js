import axios from "axios";
import * as types from "./types";
import { setAuthToken } from "utils/headers";
import { setAlert } from "./alert";

const URI = "http://localhost:5000/api/v1/user";

// LOAD USER
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) setAuthToken(localStorage.token);

  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };

  try {
    const { data } = await axios.get(`${URI}/auth-user`, config);

    dispatch({ type: types.USER_LOADED, payload: data });
  } catch (error) {
    dispatch({ type: types.AUTH_ERROR });
  }
};

// LOGIN USER
export const loginUser = (body, setSubmitting) => async (dispatch) => {
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };

  try {
    const { data } = await axios.post(`${URI}/login`, body, config);
    dispatch({
      type: types.LOGIN_SUCCESS,
      payload: { token: data.token, authUser: data.user },
    });
    dispatch(setAlert("Login Successful!", 200, "success"));
    dispatch(loadUser());
  } catch (error) {
    dispatch({ type: types.LOGIN_FAIL });
    dispatch(setAlert(error.response.data, error.response.status, "error"));
  } finally {
    setSubmitting(false);
  }
};

// REGISTER USER
export const registerUser = (body, setSubmitting) => async (dispatch) => {
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };

  try {
    const { data } = await axios.post(`${URI}/register`, body, config);
    dispatch({
      type: types.REGISTER_SUCCESS,
      payload: { token: data.token, authUser: data.user },
    });
    dispatch(setAlert("Register successful!", 200, "success"));
    dispatch(loadUser());
  } catch (error) {
    dispatch({ type: types.REGISTER_FAIL });
    dispatch(setAlert(error.response.data, error.response.status, "error"));
  } finally {
    setSubmitting(false);
  }
};

// LOGOUT USER
export const logOutUser = (e) => (dispatch) => dispatch({ type: types.LOGOUT });
