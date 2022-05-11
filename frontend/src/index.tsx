import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "App";
import "index.css";
import Store from "./redux/store";
import AppLoader from "layouts/AppLoader";

ReactDOM.render(
  <React.StrictMode>
    <React.Suspense fallback={<AppLoader />}>
      <Provider store={Store}>
        <App />
      </Provider>
    </React.Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);
