import axios from "axios";

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers["x-auth-token"];
  }
};

export const setHeader = () => ({
  header: {
    "Content-Type": "application/json",
  },
});
