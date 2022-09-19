import React from "react";
import Sort from "../../features/controls/Sort";
import Categories from "../../features/controls/Categories";
import Pagination from "../../features/controls/Pagination";
import Products from "../../features/products/Products";

import { useControls } from "../../features/controls/useControls";
import { useAppDispatch } from "../../app/hooks";
import { getProducts } from "../../features/products/productsSlice";

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLocationSearch, createQueryString } = useControls();

  React.useEffect(() => {
    if (!isLocationSearch.current) {
      dispatch(getProducts(createQueryString()));
      //TODO: добавить уведомления
    }
    isLocationSearch.current = false;
  }, [createQueryString, isLocationSearch, dispatch]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <Products />
      <Pagination />
    </div>
  );
};

export default HomePage;
