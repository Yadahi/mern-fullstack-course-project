import React, { useState, useContext } from "react";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./Auth.css";
import { AuthContext } from "../../shared/context/auth-context";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const loginSubmitHandler = (event) => {
    event.preventDefault();
    console.log("submitted", formState);
    auth.login();
  };

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  return (
    <Card className="authentication">
      <h2>Login Required</h2>
      <hr />
      <form onSubmit={loginSubmitHandler}>
        {!isLoginMode && (
          <Input
            element="input"
            type="text"
            id="name"
            label="Name"
            errorText="Please enter a valid name"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
        )}
        <Input
          element="input"
          type="email"
          id="email"
          label="E-Mail"
          errorText="Please enter a valid email address"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
          onInput={inputHandler}
        />
        <Input
          element="input"
          type="password"
          id="password"
          label="Password"
          errorText="Please enter a valid password"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? "LOGIN" : "SIGNUP"}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
      </Button>
    </Card>
  );
};
export default Auth;
