import axios from "axios";
import * as types from "./types";
import { setAdminAuthToken } from "utils/headers";
import { setAlert } from "./alert";

const URI = "http://localhost:5000/api/v1/admin";

// LOAD ADMIN
export const loadAdmin = () => async (dispatch) => {
  if (localStorage.admin__token) setAdminAuthToken(localStorage.admin__token);

  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };

  try {
    const { data } = await axios.get(`${URI}/auth-admin`, config);

    dispatch({ type: types.ADMIN_LOADED, payload: data });
  } catch (error) {
    dispatch({ type: types.ADMIN_AUTH_ERROR });
  }
};

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
      type: types.ADMIN_LOGIN_SUCCESS,
      payload: data,
    });
    dispatch(setAlert("Admin Login Successful!", 200, "success"));
    dispatch(loadAdmin());
  } catch (error) {
    dispatch({ type: types.ADMIN_LOGIN_FAIL });
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
    dispatch(
      setAlert(
        "Something went wrong when fetching the users!",
        error.response.status,
        "error"
      )
    );
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
    dispatch(
      setAlert(
        "Something went wrong when updating the user",
        error.response.status,
        "error"
      )
    );
  } finally {
    setSubmitting(false);
  }
};

// DELETE USER
export const deleteUser = (id) => async (dispatch) => {
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };

  try {
    await axios.delete(`${URI}/users/${id}`, config);
    dispatch({ type: types.DELETE_USER, payload: id });
    dispatch(setAlert("User has been deleted!", 200, "success"));
  } catch (error) {
    dispatch(
      setAlert(
        "Something went wrong when deleting the user!",
        error.response.status,
        "error"
      )
    );
  }
};

// LOGOUT ADMIN
export const logOutAdmin = (e) => (dispatch) => {
  dispatch({ type: types.ADMIN_LOGOUT });
  dispatch(setAlert("You have logged out!", 200, "success"));
};
