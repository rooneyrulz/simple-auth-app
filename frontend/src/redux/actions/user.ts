import { Dispatch } from "redux";
import axios from "axios";
import types from "./types";
import { setUserAuthToken } from "utils/headers";
import { UserActions } from "redux/types/user";
import { AlertActions } from "redux/types/alert";
import { setAlert } from "./alert";

const URI = "http://localhost:5000/api/v1/user";

// LOAD USER
export const loadUser = () => async (dispatch: Dispatch<UserActions>) => {
  if (localStorage.user__token) setUserAuthToken(localStorage.user__token);

  const config: any = {
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
export const loginUser =
  (body: any, setSubmitting: any) =>
  async (dispatch: Dispatch<UserActions | AlertActions>) => {
    const config: any = {
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
      dispatch<any>(
        setAlert({
          msg: "Login Successful!",
          status: 200,
          alertType: "success",
        })
      );
      dispatch<any>(loadUser());
    } catch (error: any) {
      dispatch({ type: types.USER_LOGIN_FAIL });
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

// REGISTER USER
export const registerUser =
  (body: any, setSubmitting: any) =>
  async (dispatch: Dispatch<UserActions | AlertActions>) => {
    const config: any = {
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
      dispatch<any>(
        setAlert({
          msg: "Register successful!",
          status: 200,
          alertType: "success",
        })
      );
      dispatch<any>(loadUser());
    } catch (error: any) {
      dispatch({ type: types.USER_REGISTER_FAIL });
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

// LOGOUT USER
export const logOutUser =
  () => (dispatch: Dispatch<UserActions | AlertActions>) => {
    dispatch({ type: types.USER_LOGOUT });
    dispatch<any>(
      setAlert({
        msg: "You have logged out!",
        status: 200,
        alertType: "success",
      })
    );
  };
