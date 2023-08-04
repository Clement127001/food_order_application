import { Fragment, useRef, useState } from "react";
import classes from "./MealsItemFrom.module.css";
import Input from "../../../UI/Input";

const MealsItemForm = (props) => {
  const mealAmountRef = useRef();
  const [amountIsValid, setAmountIsValid] = useState(true);
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = mealAmountRef.current.value;
    const enteredAmountNum = +enteredAmount;
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmount > 5 ||
      enteredAmount < 1
    ) {
      setAmountIsValid(false);
      return;
    }
    props.onAddToCart(enteredAmountNum);
  };
  return (
    <Fragment>
      <form className={classes.form} onSubmit={submitHandler} noValidate>
        <Input
          ref={mealAmountRef}
          label="Amount"
          input={{
            type: "number",
            min: "1",
            max: "5",
            defaultValue: "1",
            step: "1",
            id: `amount_${props.id}`,
          }}
        />
        <button>+ Add</button>
        {!amountIsValid && <p>Please Enter a valid amount</p>}
      </form>
    </Fragment>
  );
};

export default MealsItemForm;
