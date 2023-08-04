import classes from "./Checkout.module.css";
import useInput from "../../../Hooks/use-input";

const Checkout = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameHasError,
    changeHandler: nameChangeHandler,
    blurHandler: nameBlurHandler,
    resetHandler: nameResetHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredStreet,
    isValid: enteredStreetIsValid,
    hasError: streetHasError,
    changeHandler: streetChangeHandler,
    blurHandler: streetBlurHandler,
    resetHandler: streetResetHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredCity,
    isValid: enteredCityIsValid,
    hasError: cityHasError,
    changeHandler: cityChangeHandler,
    blurHandler: cityBlurHandler,
    resetHandler: cityResetHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredPostalCode,
    isValid: enteredPostalCodeIsValid,
    hasError: postalCodeHasError,
    changeHandler: postalCodeChangeHandler,
    blurHandler: postalCodeBlurHandler,
    resetHandler: postalCodeResetHandler,
  } = useInput((value) => value.trim().length === 5);

  let formIsValid = false;
  //setting the overall forms validity
  if (
    enteredNameIsValid &&
    enteredCityIsValid &&
    enteredPostalCodeIsValid &&
    enteredStreetIsValid
  )
    formIsValid = true;

  const confirmHandler = (event) => {
    event.preventDefault();
    if (nameHasError || streetHasError || cityHasError || postalCodeHasError)
      return;

    props.onSubmit({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity,
    });

    postalCodeResetHandler();
    cityResetHandler();
    streetResetHandler();
    nameResetHandler();
  };

  const nameStyle = `${classes.control} ${nameHasError ? classes.invalid : ""}`;

  const streetStyle = `${classes.control} ${
    streetHasError ? classes.invalid : ""
  }`;

  const cityStyle = `${classes.control} ${cityHasError ? classes.invalid : ""}`;

  const postalCodeStyle = `${classes.control} ${
    postalCodeHasError ? classes.invalid : ""
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameStyle}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameHasError && (
          <p className={classes["error-text"]}>Enter a valid name</p>
        )}
      </div>
      <div className={streetStyle}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
          value={enteredStreet}
        />
        {streetHasError && (
          <p className={classes["error-text"]}>Enter a valid Street</p>
        )}
      </div>
      <div className={postalCodeStyle}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          onChange={postalCodeChangeHandler}
          onBlur={postalCodeBlurHandler}
          value={enteredPostalCode}
        />
        {postalCodeHasError && (
          <p className={classes["error-text"]}>
            Enter a valid postal code (exactly 5 chracters)
          </p>
        )}
      </div>
      <div className={cityStyle}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
          value={enteredCity}
        />
        {cityHasError && (
          <p className={classes["error-text"]}>Enter a valid city</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} disabled={!formIsValid}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
