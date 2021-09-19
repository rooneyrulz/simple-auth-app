import axios from "axios";
import * as types from "./types";
import { setAlert } from "./alert";

import { loadUser } from "./auth";

const URI = "http://localhost:5000/api/v1/admin";

// LOGIN ADMIN
export const loginAsAdmin = (body, setSubmitting) => async (dispatch) => {
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
    dispatch(setAlert("Admin Login Successful!", 200, "success"));
    dispatch(loadUser());
  } catch (error) {
    dispatch({ type: types.LOGIN_FAIL });
    dispatch(setAlert(error.response.data, error.response.status, "error"));
  } finally {
    setSubmitting(false);
  }
};

// GET USERS
export const getUsers = () => async (dispatch) => {
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };

  try {
    const { data } = await axios.get(`${URI}/users`, config);

    dispatch({ type: types.GET_USERS, payload: data });
  } catch (error) {
    dispatch(setAlert(error.response.data, error.response.status, "error"));
  }
};

// GET USERS
export const getUser = (id) => async (dispatch) => {
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };

  try {
    const { data } = await axios.get(`${URI}/user/${id}`, config);

    dispatch({ type: types.GET_USER, payload: data });
  } catch (error) {
    dispatch(setAlert(error.response.data, error.response.status, "error"));
  }
};

// UPDATE USER DATA
export const updateUser = (body, id, setSubmitting) => async (dispatch) => {
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };

  try {
    const { data } = await axios.patch(`${URI}/users/${id}`, body, config);
    dispatch({
      type: types.UPDATE_USER,
      payload: data,
    });
    dispatch(getUsers());
    dispatch(setAlert("User Data Updated!", 200, "success"));
  } catch (error) {
    console.log(error);
    dispatch(setAlert("Something went wrong", error.response.status, "error"));
  } finally {
    setSubmitting(false);
  }
};
