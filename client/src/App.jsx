import React from "react";
import { BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";

import AppDrawer from "layouts/navigation/AppDrawer";
import Alert from "layouts/alert/Alert";
import Routes from "./components/routing/Routes";

import { setAuthToken } from "utils/headers";
import { loadUser } from "redux/actions/auth";

if (localStorage.token) setAuthToken(localStorage.token);

const App = () => {
  const dispatch = useDispatch();
  React.useEffect(() => dispatch(loadUser()), [dispatch]);

  return (
    <BrowserRouter>
      <AppDrawer>
        <div className='app'>
          <Routes />
          <Alert />
        </div>
      </AppDrawer>
    </BrowserRouter>
  );
};

export default App;
