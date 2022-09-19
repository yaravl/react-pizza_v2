import React from "react";
import { useAppSelector } from "../../app/hooks";
import { ProductItem } from "./ProductItem";
import { ProductItemSkeleton } from "./ProductItemSkeleton";

const Products = () => {
  const { items, status, error } = useAppSelector((state) => state.products);

  return (
    <>
      {error ? (
        <h1>{error}</h1>
      ) : (
        <>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {status === "loading"
              ? [...Array(2)].map((_, i) => <ProductItemSkeleton key={i} />)
              : items.map((pizza) => <ProductItem {...pizza} key={pizza.id} />)}
          </div>
        </>
      )}
    </>
  );
};

export default Products;
