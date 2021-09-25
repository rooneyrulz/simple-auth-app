import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardContent,
  Button,
  Slide,
  CircularProgress,
} from "@material-ui/core";
import Checkbox from "@mui/material/Checkbox";
import { Formik } from "formik";
import * as Yup from "yup";

import { useDispatch } from "react-redux";
import { loginUser } from "redux/actions/user";
import { loginAsAdmin } from "redux/actions/admin";
import FormField from "components/shared/FormField";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    minHeight: "100vh",
  },
  card: {
    padding: theme.spacing(6),
    maxWidth: "675px",
    margin: "auto",
  },
  btnLogin: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1.5, 3),
  },
  checkboxWrapper: {
    display: "flex",
    justifyContent: "flex-start",
    marginTop: theme.spacing(2),
  },
}));

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [checked, setChecked] = React.useState(false);

  const initialValues = {
    username: "",
    password: "",
  };

  const onHandleSubmit = async (values, { setSubmitting, resetForm }) =>
    checked
      ? dispatch(loginAsAdmin(values, setSubmitting, resetForm))
      : dispatch(loginUser(values, setSubmitting, resetForm));

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Invalid username!"),
    password: Yup.string().required("Invalid password!"),
  });

  React.useEffect(() => {
    document.title = "Login - Ecologital";
  }, []);

  return (
    <Slide direction='right' in={true} mountOnEnter unmountOnExit>
      <Grid
        container
        className={classes.root}
        direction='column'
        alignItems='center'
        justifyContent='center'
      >
        <Card className={classes.card} elevation={2}>
          <CardContent>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onHandleSubmit}
            >
              {({ isSubmitting, handleSubmit }) => (
                <form noValidate onSubmit={handleSubmit}>
                  <FormField />
                  <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    className={classes.btnLogin}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <CircularProgress size='1rem' /> : "Submit"}
                  </Button>
                </form>
              )}
            </Formik>
            <div className={classes.checkboxWrapper}>
              <Checkbox
                checked={checked}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />
              <p>Login As Admin</p>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Slide>
  );
};

export default Login;
