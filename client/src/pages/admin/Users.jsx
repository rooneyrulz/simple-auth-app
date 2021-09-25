import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

import UserForm from "./UserForm";
import { getUsers } from "redux/actions/admin";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "60%",
    margin: "auto",
  },
}));

const Users = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  React.useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  React.useEffect(() => {
    document.title = "Admin Panel - Ecologital";
  }, []);

  return (
    <div className={styles.root}>
      {auth.users.length ? (
        auth.users.map((user) => <UserForm user={user} key={user._id} />)
      ) : (
        <p>No Users Found.</p>
      )}
    </div>
  );
};

export default Users;
