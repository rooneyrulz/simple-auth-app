import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, FormLabel, TextField } from "@material-ui/core";
import { useFormikContext } from "formik";

const useStyles = makeStyles((theme) => ({
  formLabel: {
    fontWeight: 600,
    marginBottom: theme.spacing(1.5),
  },
  formControl: {
    margin: theme.spacing(2, 0),
  },
}));

type Props = {
  isRegister?: boolean;
};

interface IValues {
  username: string;
  email?: string;
  password: string;
}

const FormField: React.FC<Props> = ({ isRegister = false }): JSX.Element => {
  const classes = useStyles();
  const { values, handleChange, handleBlur, errors, touched } =
    useFormikContext<IValues>();

  return (
    <>
      <FormControl fullWidth className={classes.formControl}>
        <FormLabel classes={{ root: classes.formLabel }}>Username</FormLabel>
        <TextField
          fullWidth
          name='username'
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder='Enter username'
          helperText={touched.username ? errors.username : ""}
          error={touched.username ? Boolean(errors.username) : false}
        />
      </FormControl>
      {isRegister ? (
        <FormControl fullWidth className={classes.formControl}>
          <FormLabel classes={{ root: classes.formLabel }}>Email</FormLabel>
          <TextField
            fullWidth
            name='email'
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder='Enter email'
            helperText={touched.email ? errors.email : ""}
            error={touched.email ? Boolean(errors.email) : false}
          />
        </FormControl>
      ) : null}
      <FormControl fullWidth className={classes.formControl}>
        <FormLabel classes={{ root: classes.formLabel }}>Password</FormLabel>
        <TextField
          fullWidth
          type='password'
          name='password'
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder='Enter password'
          helperText={touched.password ? errors.password : ""}
          error={touched.password ? Boolean(errors.password) : false}
        />
      </FormControl>
    </>
  );
};

export default FormField;
