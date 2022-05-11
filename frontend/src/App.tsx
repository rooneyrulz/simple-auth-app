import React from "react";
import { BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";

import AppHeader from "layouts/navigation/AppHeader";
import Alert from "layouts/alert/Alert";
import Routes from "components/routing/Routes";

import { setAdminAuthToken, setUserAuthToken } from "utils/headers";
import { loadUser } from "redux/actions/user";
import { loadAdmin } from "redux/actions/admin";

if (localStorage.admin__token) setAdminAuthToken(localStorage.admin__token);
if (localStorage.user__token) setUserAuthToken(localStorage.user__token);

const App: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();

  React.useEffect(() => dispatch<any>(loadUser()), [dispatch]);
  React.useEffect(() => dispatch<any>(loadAdmin()), [dispatch]);

  return (
    <BrowserRouter>
    <>
      <AppHeader />
      <main className='app'>
        <Routes />
        <Alert />
      </main>
    </>
    </BrowserRouter>
  );
};

export default App;
