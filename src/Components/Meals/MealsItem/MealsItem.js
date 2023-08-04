import { useContext } from "react";
import CartContext from "../../../Store/Cart-context";
import classes from "./MealsItem.module.css";
import MealsItemForm from "./MealsItemForm/MealsItemFrom";

const MealsItem = (props) => {
  const cartCtx = useContext(CartContext);

  const AddToCartHandler = (enterdAmount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: enterdAmount,
      price: props.price,
    });
  };
  const price = `$${props.price.toFixed(2)}`;
  return (
    <li className={classes.meal}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>

      <MealsItemForm id={props.id} onAddToCart={AddToCartHandler} />
    </li>
  );
};

export default MealsItem;
