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

import FormField from "shared/FormField";

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
}));

const UserForm = () => {
  const classes = useStyles();

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const onHandleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log(values);
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("required!"),
    email: Yup.string().email("Invalid email!").required("required!"),
    password: Yup.string().required("required!"),
  });

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
        <Typography>Test User</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid
          container
          className={classes.root}
          direction='column'
          alignItems='center'
          justify='center'
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
                  {isSubmitting ? <CircularProgress size='1rem' /> : "Submit"}
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
