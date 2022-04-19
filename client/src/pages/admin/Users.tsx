import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

import UserForm from "./UserForm";
import { getUsers } from "redux/actions/admin";
import { RootState } from "redux/reducers";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "60%",
    margin: "auto",
  },
}));

const Users: React.FC = (): JSX.Element => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const admin = useSelector((state: RootState) => state.admin);

  React.useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  React.useEffect(() => {
    document.title = "Admin Panel";
  }, []);

  return (
    <div className={styles.root}>
      <div style={{ marginBottom: '5rem' }}>
      <h4>Users</h4>
        {admin.users
          ?.filter((user: any) => user.role === "user")
          ?.map((user: any) => <UserForm user={user} key={user._id} />) ?? (
          <p>No Users Found.</p>
        )}
      </div>
      <div>
        <h4>Admins</h4>
        {admin.users
          ?.filter((user: any) => user.role === "admin")
          ?.map((user: any) => <UserForm user={user} key={user._id} />) ?? (
          <p>No Users Found.</p>
        )}
      </div>
    </div>
  );
};

export default Users;
