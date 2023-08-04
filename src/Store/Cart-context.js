import React from "react";
const CartContext = React.createContext({
  cartItem: [],
  amount: 0,

  //having the empty functions because for auto completion
  addItem: (item) => {},
  removeItem: (id) => {},
  clearItems: () => {},
});

export default CartContext;
