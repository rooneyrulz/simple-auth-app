import React from "react";
import { BrowserRouter } from "react-router-dom";

import AppDrawer from "./layouts/navigation/AppDrawer";
import Alert from "./layouts/alert/Alert";

import Routes from "./components/routing/Routes";

const App = () => {
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
