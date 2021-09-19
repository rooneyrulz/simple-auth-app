import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootR from "./reducers";

const middleware = [thunk];
const initialState = {};

export default createStore(
  rootR,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
