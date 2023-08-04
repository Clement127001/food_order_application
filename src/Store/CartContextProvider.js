import { useReducer } from "react";
import CartContext from "./Cart-context";

const defaultCartItem = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "Add") {
    // console.log(action.item);
    // const upadatedItem = state.items.concat(action.item);
    // const upadtedAmount =
    //   state.totalAmount + action.item.price * action.type.amount;

    //the main logic that could the previously added elements
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingItem = state.items[existingItemIndex];
    let updatedItems;
    console.log(action);
    const updatedTotalAmount = state.totalAmount + action.item.price;
    if (existingItem) {
      const upadateItem = {
        ...existingItem,
        amount: existingItem.amount + 1,
      };

      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = upadateItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "Remove") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingItem = state.items[existingItemIndex];
    const updatedAmount = state.totalAmount - existingItem.price;
    let updatedItems;

    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedAmount,
    };
  }

  if (action.type === "CLEAR") {
    return defaultCartItem;
  }
  return defaultCartItem;
};

const CartContextProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartItem
  );
  const addCartItemHandler = (item) => {
    dispatchCartAction({ type: "Add", item: item });
  };
  const removerItemHandler = (id) => {
    dispatchCartAction({ type: "Remove", id: id });
  };

  const clearItemsHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };
  const CartCtx = {
    cartItem: cartState.items,
    amount: cartState.totalAmount,
    addItem: addCartItemHandler,
    removeItem: removerItemHandler,
    clearItems: clearItemsHandler,
  };

  return (
    <CartContext.Provider value={CartCtx}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
