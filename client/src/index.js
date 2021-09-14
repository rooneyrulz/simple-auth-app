import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import Store from "./redux";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <React.Suspense fallback={<h4>App loading...</h4>}>
      <Provider store={Store}>
        <App />
      </Provider>
    </React.Suspense>
  </React.StrictMode>,
  document.getElementById("ecologital")
);
