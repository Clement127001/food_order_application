import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal/Modal";
import CartItem from "./CartItem";
import CartContext from "../../Store/Cart-context";
import Checkout from "./Checkout/Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckOut] = useState(false);
  const cartCtx = useContext(CartContext);
  const [isFormSubmitting, setFormIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const totalAmount = `$${cartCtx.amount.toFixed(2)}`;

  const hasItem = cartCtx.cartItem.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const orderHandler = () => {
    setIsCheckOut(true);
  };

  const checkOutFormSubmitHandler = async (userData) => {
    setFormIsSubmitting(true);
    await fetch(
      "https://food-order-application-27a66-default-rtdb.firebaseio.com/orderData.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          order: cartCtx.cartItem,
        }),
      }
    );
    setFormIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearItems();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.cartItem.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const cartActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        close
      </button>
      {hasItem && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const submittingCart = (
    <React.Fragment>
      <p>submitting the orders ...</p>
    </React.Fragment>
  );

  const submittedCart = (
    <React.Fragment>
      <p>The order is placed</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          close
        </button>
      </div>
    </React.Fragment>
  );

  const cartModal = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout
          onSubmit={checkOutFormSubmitHandler}
          onCancel={props.onClose}
        />
      )}
      {!isCheckout && cartActions}
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isFormSubmitting && !didSubmit && cartModal}
      {isFormSubmitting && submittingCart}
      {!isFormSubmitting && didSubmit && submittedCart}
    </Modal>
  );
};

export default Cart;
