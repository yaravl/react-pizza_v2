import React from "react";
import Cart from "../../features/cart/Cart";
import CartEmpty from "../../features/cart/CartEmpty";
import { useSelector } from "react-redux";
import { selectCartInfo } from "../../features/cart/cartSlice";

const CartPage = () => {
  const { items } = useSelector(selectCartInfo);
  return (
    <div className="container container--cart">
      {Boolean(items.length) ? <Cart /> : <CartEmpty />}
    </div>
  );
};

export default CartPage;
