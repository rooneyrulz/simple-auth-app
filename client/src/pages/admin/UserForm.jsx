import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, CircularProgress } from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch } from "react-redux";

import FormField from "shared/FormField";
import { updateUser } from "redux/actions/admin";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
  accordion: {
    marginBottom: theme.spacing(2),
  },
}));

const UserForm = ({ user }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const initialValues = {
    username: user?.username ?? "",
    email: user?.email ?? "",
    password: user?.password ?? "",
  };

  const onHandleSubmit = (values, { setSubmitting }) =>
    dispatch(updateUser(values, user._id, setSubmitting));

  const validationSchema = Yup.object({
    username: Yup.string().required("required!"),
    email: Yup.string().email("Invalid email!").required("required!"),
    password: Yup.string().required("required!"),
  });

  return (
    <Accordion className={classes.accordion}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1a-content'
        id={`panel1a-header-${user._id}`}
      >
        <Typography>{user?.username ?? null}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid
          container
          className={classes.root}
          direction='column'
          alignItems='center'
          justifyContent='center'
        >
          <Formik
            enableReinitialize
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
                  {isSubmitting ? <CircularProgress size='1rem' /> : "Update"}
                </Button>
              </form>
            )}
          </Formik>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default UserForm;
