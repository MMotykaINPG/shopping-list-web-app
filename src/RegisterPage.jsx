import React, { useState } from "react";
import { Grid, Button, TextField, CircularProgress } from "@material-ui/core";

export const getFormValues = (form) =>
  Array.from(form.elements).reduce(
    (values, element) =>
      element.name ? { ...values, [element.name]: element.value } : values,
    {}
  );

const RegisterPage = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const send = (values) => {
    console.log("creating account", values);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 3000);
  };
  const validateValues = ({ password, passwordConfirmation }) => {
    if (password.length < 8) {
      return "password must be at least 8 chars long";
    }
    if (password !== passwordConfirmation) {
      return "Password confirmation must match the password";
    }
    return null;
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formValues = getFormValues(e.target);
        const errorMessage = validateValues(formValues);
        if (errorMessage) {
          alert(errorMessage);
          return;
        }
        setIsSubmitting(true);
        send(formValues);
      }}
      style={{ height: "100%", width: "100%", paddingTop: "25%" }}
    >
      {isSubmitting ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexFlow: "column",
            alignItems: "center",
            height: "100%",
            gap: "15px",
          }}
        >
          <TextField
            autoFocus
            required
            name="login"
            label="Login"
            color="primary"
            variant="filled"
            autoComplete="username"
          />
          <TextField
            name="passwordConfirmation"
            required
            label="Password"
            color="primary"
            variant="filled"
            type="password"
            autoComplete="new-password"
          />
          <TextField
            name="password"
            required
            label="Confirm password"
            color="primary"
            variant="filled"
            type="password"
            autoComplete="new-password"
          />
          <Button type="submit" color="primary" variant="contained">
            CREATE ACCOUNT
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={props.onBackClick}
          >
            BACK
          </Button>
        </div>
      )}
    </form>
  );
};

export default RegisterPage;
