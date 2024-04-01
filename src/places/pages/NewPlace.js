import React from "react";
import Input from "../../shared/components/FormElements/Input";

import "./NewPlace.css";

const NewPlace = () => {
  return (
    <form className="place-form">
      <Input element="input" type="text" id="title" label="Title" />
    </form>
  );
};

export default NewPlace;
