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
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

import { registerUser } from "redux/actions/auth";
import FormField from "shared/FormField";

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
}));

const Register = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const onHandleSubmit = async (values, { setSubmitting, resetForm }) =>
    dispatch(registerUser(values, setSubmitting, resetForm));

  const validationSchema = Yup.object({
    username: Yup.string().required("required!"),
    email: Yup.string().email("Invalid email!").required("required!"),
    password: Yup.string().required("required!"),
  });

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
                  <FormField isRegister={true} />
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
          </CardContent>
        </Card>
      </Grid>
    </Slide>
  );
};

export default Register;
