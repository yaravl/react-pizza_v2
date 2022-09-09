import React, { useState } from "react";
import { Pagination, PizzaBlock, PizzaBlockSkeleton } from "../../components";
import Sort from "../../features/controls/Sort";
import Categories from "../../features/controls/Categories";
import { PizzaItem } from "../../types/data";
import axios from "axios";
import useDebounce from "../../hooks/useDebounce";
import { useSelector } from "react-redux";
import { allControls } from "../../features/controls/controlsSlice";

const HomePage: React.FC = () => {
  const [items, setItems] = React.useState<PizzaItem[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { categoryId, sortType, searchValue } = useSelector(allControls);

  const debouncedValue = useDebounce(searchValue, 1000);

  React.useEffect(() => {
    fetchPizzas();
  }, [categoryId, sortType, debouncedValue, currentPage]);

  const fetchPizzas = async (): Promise<void> => {
    try {
      setIsLoading(true);

      const sortBy = sortType.sort.replace("-", "");
      const orderBy = sortType.sort.includes("-") ? "asc" : "desc";
      const activeCat = categoryId > 0 ? `category=${categoryId}` : "";
      const search = searchValue.length > 0 ? searchValue : "";

      const response = await axios.get<PizzaItem[]>(
        `https://62d7100851e6e8f06f183cd2.mockapi.io/items?page=${currentPage}&limit=4&${activeCat}&sortBy=${sortBy}&order=${orderBy}&search=${search}`
      );
      const data = await response.data;
      setItems(data);
      setIsLoading(false);
      window.scroll(0, 0);
    } catch (e) {
      console.log(e, "<-- Пиццы не загрузились");
    }
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...Array(2)].map((_, i) => <PizzaBlockSkeleton key={i} />)
          : items.map((pizza) => <PizzaBlock {...pizza} key={pizza.id} />)}
      </div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default HomePage;
