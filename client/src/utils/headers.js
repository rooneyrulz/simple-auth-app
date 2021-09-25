import axios from "axios";

export const setUserAuthToken = (token) => {
  if (token) {
    axios.defaults.headers["x-user-auth-token"] = token;
  } else {
    delete axios.defaults.headers["x-user-auth-token"];
  }
};

export const setAdminAuthToken = (token) => {
  if (token) {
    axios.defaults.headers["x-admin-auth-token"] = token;
  } else {
    delete axios.defaults.headers["x-admin-auth-token"];
  }
};

export const setHeader = () => ({
  header: {
    "Content-Type": "application/json",
  },
});
