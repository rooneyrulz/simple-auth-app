import axios from "axios";
import * as types from "./types";
import { setUserAuthToken } from "utils/headers";
import { setAlert } from "./alert";

const URI = "http://localhost:5000/api/v1/user";

// LOAD USER
export const loadUser = () => async (dispatch) => {
  if (localStorage.user__token) setUserAuthToken(localStorage.user__token);

  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };

  try {
    const { data } = await axios.get(`${URI}/auth-user`, config);
    dispatch({ type: types.USER_LOADED, payload: data });
  } catch (error) {
    dispatch({ type: types.USER_AUTH_ERROR });
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
      type: types.USER_LOGIN_SUCCESS,
      payload: data,
    });
    dispatch(setAlert("Login Successful!", 200, "success"));
    dispatch(loadUser());
  } catch (error) {
    dispatch({ type: types.USER_LOGIN_FAIL });
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
      type: types.USER_REGISTER_SUCCESS,
      payload: data,
    });
    dispatch(setAlert("Register successful!", 200, "success"));
    dispatch(loadUser());
  } catch (error) {
    dispatch({ type: types.USER_REGISTER_FAIL });
    dispatch(setAlert(error.response.data, error.response.status, "error"));
  } finally {
    setSubmitting(false);
  }
};

// LOGOUT USER
export const logOutUser = (e) => (dispatch) => {
  dispatch({ type: types.USER_LOGOUT });
  dispatch(setAlert("You have logged out!", 200, "success"));
};
