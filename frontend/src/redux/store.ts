import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootR from "./reducers";

const middleware = [thunk];
const initialState = {};

const store = createStore(
  rootR,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export type AppDispatch = typeof store.dispatch;

export default store;
