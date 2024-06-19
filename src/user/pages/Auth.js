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

  const loginSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      fetch(" http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        }),
      });
    } else {
      try {
        const response = await fetch(
          " http://localhost:5000/api/users/signup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: formState.inputs.name.value,
              email: formState.inputs.email.value,
              password: formState.inputs.password.value,
            }),
          }
        );
        const responseData = await response.json();
        console.log(responseData);
      } catch (error) {
        console.log(error);
      }
    }

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
