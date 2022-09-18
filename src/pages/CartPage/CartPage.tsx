import React from "react";
import Cart from "../../features/cart/Cart";
import CartEmpty from "../../features/cart/CartEmpty";
import { useAppSelector } from "../../app/hooks";

const CartPage = () => {
  const { items } = useAppSelector((state) => state.cart);
  return (
    <div className="container container--cart">
      {Boolean(items.length) ? <Cart /> : <CartEmpty />}
    </div>
  );
};

export default CartPage;
