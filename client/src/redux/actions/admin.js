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
