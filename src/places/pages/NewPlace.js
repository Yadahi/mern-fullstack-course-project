import React, { useCallback } from "react";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

import "./NewPlace.css";

const NewPlace = () => {
  const inputHandler = useCallback((id, value, isValid) => {}, []);

  return (
    <form className="place-form">
      <Input
        element="input"
        type="text"
        id="title"
        label="Title"
        errorText="Please enter a valid title"
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
      />
      <Input
        element="textarea"
        id="description"
        label="Description"
        errorText="Please enter a valid description min 5 characters long"
        validators={[VALIDATOR_MINLENGTH(5)]}
        onInput={inputHandler}
      />
    </form>
  );
};

export default NewPlace;
