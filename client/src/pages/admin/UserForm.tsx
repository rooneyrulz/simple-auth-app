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

import FormField from "components/shared/FormField";
import { updateUser, deleteUser } from "redux/actions/admin";

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
    marginTop: theme.spacing(1.5),
    marginRight: theme.spacing(1),
    padding: theme.spacing(1.5, 3),
  },
  accordion: {
    marginBottom: theme.spacing(2),
  },
}));

type Props = {
  user: any;
};

interface IInitialValues {
  username: string;
  email: string;
  password: string;
}

const UserForm: React.FC<Props> = ({ user }): JSX.Element => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const initialValues: IInitialValues = {
    username: user?.username ?? "",
    email: user?.email ?? "",
    password: "",
  };

  const onHandleSubmit = (
    values: IInitialValues,
    { setSubmitting }: any
  ): Promise<void> =>
    dispatch<any>(updateUser(values, user._id, setSubmitting));

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
                  size='small'
                  className={classes.btnLogin}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <CircularProgress size='1rem' /> : "Update"}
                </Button>
                <Button
                  type='button'
                  variant='contained'
                  color='secondary'
                  size='small'
                  className={classes.btnLogin}
                  onClick={(e) => dispatch(deleteUser(user._id))}
                >
                  Delete
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
