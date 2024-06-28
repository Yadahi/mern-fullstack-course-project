import { useCallback, useReducer } from "react";

// This formReducer function is a reducer function that takes in the current state and an action object.
// It is used to update the state based on the action type.
const formReducer = (state, action) => {
  switch (action.type) {
    // If the action type is "INPUT_CHANGE", it means that an input value has changed.
    // We need to update the state with the new input value and its validity.
    case "INPUT_CHANGE":
      // We initialize a variable to keep track of the form's validity.
      let formIsValid = true;
      // We loop through all the input IDs in the state.
      for (const inputId in state.inputs) {
        // If the input does not exist in the state, we skip it.
        if (!state.inputs[inputId]) continue;
        // If the input ID is the same as the one that changed, we update the form's validity.
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
          // If the input ID is different from the one that changed, we keep the form's validity the same.
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      // We return a new state object with the updated input value and validity.
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    // If the action type is "SET_DATA", it means that we need to set the initial form data.
    case "SET_DATA":
      // We return a new state object with the initial form data.
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
      };
    // If the action type is not recognized, we return the current state.
    default:
      return state;
  }
};

export const useForm = (initialInputs, initialFormIsValid) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormIsValid,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
      type: "SET_DATA",
      inputs: inputData,
      formIsValid: formValidity,
    });
  }, []);

  return [formState, inputHandler, setFormData];
};
