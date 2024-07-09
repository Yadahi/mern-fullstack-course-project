import React, { useState, useContext, Fragment } from "react";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./Auth.css";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

// The Auth component is responsible for handling user authentication.
// It uses the AuthContext to manage user authentication state.
const Auth = () => {
  // Get the AuthContext object from the React context.
  const auth = useContext(AuthContext);

  // Get the sendRequest, isLoading, error, and clearError functions from the useHttpClient hook.
  const { sendRequest, isLoading, error, clearError } = useHttpClient();

  // Use the useState hook to manage the login mode state.
  // The initial value is true, indicating that the login mode is active.
  const [isLoginMode, setIsLoginMode] = useState(true);

  // Use the useForm hook to manage the form state.
  // The initial form state contains email and password fields.
  // The initial form validity is set to false.
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

  // Define the login submit handler function.
  // It is called when the form is submitted.
  const loginSubmitHandler = async (event) => {
    // Prevent the default form submission behavior.
    event.preventDefault();

    // Check if the login mode is active.
    if (isLoginMode) {
      try {
        // Send a POST request to the server to authenticate the user.
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/login`,

          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        console.log("responseData", responseData);
        // Log in the user using the response data.
        auth.login(responseData.userId, responseData.token);
      } catch (error) {
        // Log any errors that occur during authentication.
        console.log(error);
      }
    } else {
      try {
        // Create a new instance of the FormData object.
        // The FormData object is used to send form data in a multipart/form-data format.
        const formData = new FormData();

        // Append the email field to the FormData object.
        formData.append("email", formState.inputs.email.value);

        // Append the name field to the FormData object if the signup mode is active.
        if (!isLoginMode) {
          formData.append("name", formState.inputs.name.value);
        }

        // Append the password field to the FormData object.
        formData.append("password", formState.inputs.password.value);

        // Append the image field to the FormData object if the signup mode is active.
        if (!isLoginMode) {
          formData.append("image", formState.inputs.image.value);
        }

        // Send a POST request to the server to sign up the user.
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
          "POST",
          formData
        );

        // Log in the user using the response data.
        auth.login(responseData.userId, responseData.token);
      } catch (error) {
        // Log any errors that occur during signup.
        console.log(error);
      }
    }
  };

  // Define the switch mode handler function.
  // It is called when the switch mode button is clicked.
  const switchModeHandler = () => {
    // Check if the login mode is active.
    if (!isLoginMode) {
      // Update the form state to remove the name and image fields if the signup mode is inactive.
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      // Update the form state to add the name and image fields if the signup mode is active.
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
          image: {
            value: null,
            isValid: false,
          },
        },
        false
      );
    }
    // Toggle the login mode state.
    setIsLoginMode((prevMode) => !prevMode);
  };

  // Render the Auth component.
  return (
    <Fragment>
      {/* Render the ErrorModal component to display any error messages. */}
      <ErrorModal error={error} onClear={clearError} />
      {/* Render the Card component to display the authentication form. */}
      <Card className="authentication">
        {/* Render the LoadingSpinner component as an overlay if the request is loading. */}
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        {/* Render the form with the email, password, and optional name and image fields. */}
        <form onSubmit={loginSubmitHandler}>
          {/* Render the name input field if the signup mode is inactive. */}
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
          {/* Render the image upload input field if the signup mode is inactive. */}
          {!isLoginMode && (
            <ImageUpload
              center
              id="image"
              onInput={inputHandler}
              errorText="Please provide an image"
            />
          )}
          {/* Render the email input field. */}
          <Input
            element="input"
            type="email"
            id="email"
            label="E-Mail"
            errorText="Please enter a valid email address"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
            onInput={inputHandler}
          />
          {/* Render the password input field. */}
          <Input
            element="input"
            type="password"
            id="password"
            label="Password"
            errorText="Please enter a valid password"
            validators={[
              VALIDATOR_REQUIRE(),
              VALIDATOR_REQUIRE(),
              VALIDATOR_MINLENGTH(5),
            ]}
            onInput={inputHandler}
          />
          {/* Render the login/signup button. */}
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "LOGIN" : "SIGNUP"}
          </Button>
        </form>
        {/* Render the switch mode button. */}
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
        </Button>
      </Card>
    </Fragment>
  );
};
export default Auth;
