import { combineReducers } from "redux";
import admin from "./admin";
import user from "./user";
import alert from "./alert";

const rootReducer = combineReducers({
  admin,
  user,
  alert,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
