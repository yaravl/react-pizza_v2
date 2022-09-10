import React from "react";
import { PizzaBlock, PizzaBlockSkeleton } from "../../components";
import Sort from "../../features/controls/Sort";
import Categories from "../../features/controls/Categories";
import Pagination from "../../features/controls/Pagination";
import { PizzaItem } from "../../types/data";
import axios from "axios";
import { useSelector } from "react-redux";
import { allControls } from "../../features/controls/controlsSlice";

const HomePage: React.FC = () => {
  const [items, setItems] = React.useState<PizzaItem[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const { categoryId, sortType, searchValue, currentPage } =
    useSelector(allControls);

  React.useEffect(() => {
    try {
      setIsLoading(true);

      const sortBy = sortType.sort.replace("-", "");
      const orderBy = sortType.sort.includes("-") ? "asc" : "desc";
      const activeCat = categoryId > 0 ? `category=${categoryId}` : "";
      const search = searchValue.length > 0 ? searchValue : "";

      axios
        .get<PizzaItem[]>(
          `https://62d7100851e6e8f06f183cd2.mockapi.io/items?page=${currentPage}&limit=4&${activeCat}&sortBy=${sortBy}&order=${orderBy}&search=${search}`
        )
        .then((data) => {
          setItems(data.data);
          setIsLoading(false);
        });

      window.scroll(0, 0);
    } catch (e) {
      console.log(e, "<-- Пиццы не загрузились");
    }
  }, [categoryId, sortType, currentPage, searchValue]);

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
      <Pagination />
    </div>
  );
};

export default HomePage;
