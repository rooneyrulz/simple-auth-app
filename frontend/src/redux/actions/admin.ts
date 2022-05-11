import axios from "axios";
import { Dispatch } from "redux";
import { setAdminAuthToken } from "utils/headers";
import { setAlert } from "./alert";
import { AdminActions } from "redux/types/admin";
import { AlertActions } from "redux/types/alert";
import types from "./types";

const URI = "http://localhost:5000/api/v1/admin";
const USER_URI = "http://localhost:5000/api/v1/user";

// LOAD ADMIN
export const loadAdmin = () => async (dispatch: Dispatch<AdminActions>) => {
  if (localStorage.admin__token) setAdminAuthToken(localStorage.admin__token);

  const config: any = {
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
export const loginAdmin =
  (body: any, setSubmitting: any) =>
  async (dispatch: Dispatch<AdminActions>) => {
    const config: any = {
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
      dispatch<any>(
        setAlert({
          msg: "Admin Login Successful!",
          status: 200,
          alertType: "success",
        })
      );
      dispatch<any>(loadAdmin());
    } catch (error: any) {
      dispatch({ type: types.ADMIN_LOGIN_FAIL });
      dispatch<any>(
        setAlert({
          msg: error.response.data,
          status: error.response.status,
          alertType: "error",
        })
      );
    } finally {
      setSubmitting(false);
    }
  };

// REGISTER ADMIN
export const registerAdmin =
  (body: any, setSubmitting: any) =>
  async (dispatch: Dispatch<AdminActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(`${USER_URI}/register`, body, config);
      dispatch({
        type: types.ADMIN_REGISTER_SUCCESS,
        payload: data,
      });
      dispatch<any>(
        setAlert({
          msg: "Register successful!",
          status: 200,
          alertType: "success",
        })
      );
      dispatch<any>(loadAdmin());
    } catch (error: any) {
      dispatch({ type: types.ADMIN_REGISTER_FAIL });
      dispatch<any>(
        setAlert({
          msg: error.response.data,
          status: error.response.status,
          alertType: "error",
        })
      );
    } finally {
      setSubmitting(false);
    }
  };

// GET USERS
export const getUsers =
  () => async (dispatch: Dispatch<AdminActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.get(`${URI}/users`, config);
      dispatch({ type: types.GET_USERS, payload: data });
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Something went wrong when fetching the users!",
          status: error.response.status,
          alertType: "error",
        })
      );
    }
  };

// UPDATE USER DATA
export const updateUser =
  (body: any, id: number, setSubmitting: any) =>
  async (dispatch: Dispatch<AdminActions | AlertActions>) => {
    const config: any = {
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
      dispatch<any>(getUsers());
      dispatch<any>(
        setAlert({
          msg: "User Data Updated!",
          status: 200,
          alertType: "success",
        })
      );
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Something went wrong when updating the users!",
          status: error.response.status,
          alertType: "error",
        })
      );
    } finally {
      setSubmitting(false);
    }
  };

// DELETE USER
export const deleteUser =
  (id: number) => async (dispatch: Dispatch<AdminActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.delete(`${URI}/users/${id}`, config);
      dispatch({ type: types.DELETE_USER, payload: id });
      dispatch<any>(
        setAlert({
          msg: "User has been deleted!",
          status: 200,
          alertType: "success",
        })
      );
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Something went wrong when deleting the users!",
          status: error.response.status,
          alertType: "error",
        })
      );
    }
  };

// LOGOUT ADMIN
export const logOutAdmin =
  () => (dispatch: Dispatch<AdminActions | AlertActions>) => {
    dispatch({ type: types.ADMIN_LOGOUT });
    dispatch<any>(
      setAlert({
        msg: "You have logged out!",
        status: 200,
        alertType: "success",
      })
    );
  };
