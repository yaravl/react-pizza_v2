import React from "react";
import Sort from "../../features/controls/Sort";
import Categories from "../../features/controls/Categories";
import Pagination from "../../features/controls/Pagination";
import Products from "../../features/products/Products";

import { useCreateQuery } from "../../features/controls/useCreateQuery";
import { useAppDispatch } from "../../app/hooks";
import { getProducts } from "../../features/products/productsSlice";
import { useLocationSearch } from "../../features/controls/useLocationSearch";

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { createQueryString } = useCreateQuery();
  const isLocationSearch = useLocationSearch();

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
