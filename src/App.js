import { useState } from "react";
import Cart from "./Components/Cart/Cart";
import Header from "./Components/Layout/Header/Header";
import Meals from "./Components/Meals/Meals";
import CartContextProvider from "./Store/CartContextProvider";
function App() {
  const [showCartItem, setShowCartItem] = useState(false);

  const showCartHandler = () => {
    setShowCartItem(true);
  };
  const hideCartHandler = () => {
    setShowCartItem(false);
  };
  return (
    <CartContextProvider>
      {showCartItem && <Cart onClose={hideCartHandler} />}
      <Header onClick={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartContextProvider>
  );
}

export default App;
