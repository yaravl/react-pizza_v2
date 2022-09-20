import React, { Suspense } from "react";
import { useAppSelector } from "../../app/hooks";
//import Cart from "../../features/cart/Cart";
//import CartEmpty from "../../features/cart/CartEmpty";
const Cart = React.lazy(() => import("../../features/cart/Cart"));
const CartEmpty = React.lazy(() => import("../../features/cart/CartEmpty"));

const CartPage = () => {
  const { items } = useAppSelector((state) => state.cart);
  return (
    <div className="container container--cart">
      {Boolean(items.length) ? (
        <Suspense fallback={<div>Загрузка</div>}>
          <Cart />
        </Suspense>
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <CartEmpty />
        </Suspense>
      )}
    </div>
  );
};

export default CartPage;
