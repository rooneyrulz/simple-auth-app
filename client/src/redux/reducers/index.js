import { combineReducers } from "redux";
import admin from "./admin";
import user from "./user";
import alert from "./alert";

export default combineReducers({
  admin,
  user,
  alert,
});
