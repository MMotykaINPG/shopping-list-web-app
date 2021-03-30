import React, { useState } from "react";
import { Button, TextField, CircularProgress } from "@material-ui/core";

export const getFormValues = (form) =>
  Array.from(form.elements).reduce(
    (values, element) =>
      element.name ? { ...values, [element.name]: element.value } : values,
    {}
  );

const LoginPage = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const send = (values) => {
    console.log("sending", values);
    props.onSignInClick(values);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 3000);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formValues = getFormValues(e.target);
        setIsSubmitting(true);
        send(formValues);
      }}
      style={{
        height: "100%",
        width: "100%",
        paddingTop: "25%",
        backgroundColor: "#4caf50",
      }}
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
            name="password"
            required
            label="Password"
            color="primary"
            variant="filled"
            type="password"
            autoComplete="current-password"
          />
          <Button type="submit" color="primary" variant="contained">
            SIGN IN
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={props.onSignUpClick}
          >
            SIGN UP
          </Button>
        </div>
      )}
    </form>
  );
};

export default LoginPage;
