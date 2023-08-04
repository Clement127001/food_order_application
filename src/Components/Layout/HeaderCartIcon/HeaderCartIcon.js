import { useContext, useState, useEffect } from "react";
import CartIcon from "../../Cart/CartIcon/CartIcon";
import CartContext from "../../../Store/Cart-context";
import classes from "./HeaderCartIcon.module.css";

const HeaderCartIcon = (props) => {
  const cartctx = useContext(CartContext);

  const [buttonHighlighted, setButtonHighlighted] = useState(false);

  const { cartItem } = cartctx;
  const cartItemCount = cartItem.reduce((currentAmount, item) => {
    return (currentAmount += item.amount);
  }, 0);

  const btnClass = `${classes.button} ${
    buttonHighlighted ? classes.bump : " "
  }`;

  useEffect(() => {
    setButtonHighlighted(true);

    const buttonTimeout = setTimeout(() => {
      setButtonHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(buttonTimeout);
    };
  }, [cartItem]);

  return (
    <button className={btnClass} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{cartItemCount}</span>
    </button>
  );
};

export default HeaderCartIcon;
