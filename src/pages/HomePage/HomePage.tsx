import React from "react";
import Sort from "../../features/controls/Sort";
import Categories from "../../features/controls/Categories";
import Pagination from "../../features/controls/Pagination";
import Products from "../../features/products/Products";

import { useCreateQuery } from "../../features/controls/useCreateQuery";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getProducts } from "../../features/products/productsSlice";
import { useLocationSearch } from "../../features/controls/useLocationSearch";

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { searchValue } = useAppSelector((state) => state.controls);
  const { createQueryString } = useCreateQuery();
  const isLocationSearch = useLocationSearch();

  React.useEffect(() => {
    console.log("woop");
    if (!isLocationSearch.current || searchValue) {
      dispatch(getProducts(createQueryString()));
      console.log("boop");
      //TODO: добавить уведомления
    }
    isLocationSearch.current = false;
  }, [createQueryString, isLocationSearch, dispatch, searchValue]);

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
