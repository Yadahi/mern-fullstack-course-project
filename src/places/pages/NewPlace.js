import React from "react";
import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";

import "./NewPlace.css";

const NewPlace = () => {
  return (
    <form className="place-form">
      <Input
        element="input"
        type="text"
        id="title"
        label="Title"
        errorText="Please enter a valid title"
        validators={[VALIDATOR_REQUIRE()]}
      />
    </form>
  );
};

export default NewPlace;
