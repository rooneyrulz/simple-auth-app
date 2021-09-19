import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";

import UserForm from "./UserForm";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "60%",
    margin: "auto",
  },
}));

const Users = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <UserForm />
    </div>
  );
};

export default Users;
