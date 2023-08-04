import { useReducer } from "react";

const intialValue = {
  value: "",
  isTouched: false,
};
const inputReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: state.isTouched };
  }

  if (action.type === "BLUR") {
    return { value: state.value, isTouched: true };
  }

  if (action.type === "RESET") {
    return intialValue;
  }
  return intialValue;
};
const useInput = (validateValue) => {
  const [inputState, dispatchInput] = useReducer(inputReducer, intialValue);

  const isInputValid = validateValue(inputState.value);
  const hasError = !isInputValid && inputState.isTouched;

  const changeHandler = (event) => {
    dispatchInput({ type: "INPUT", value: event.target.value });
  };

  const blurHandler = (event) => {
    dispatchInput({ type: "BLUR" });
  };

  const resetHandler = () => {
    dispatchInput({ type: "RESET" });
  };

  return {
    value: inputState.value,
    isValid: isInputValid,
    hasError,
    changeHandler,
    blurHandler,
    resetHandler,
  };
};

export default useInput;
