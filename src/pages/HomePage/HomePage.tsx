import React, { useState } from "react";
import {
  Categories,
  PizzaBlock,
  PizzaBlockSkeleton,
  Sort,
} from "../../components";
import { PizzaItem } from "../../types/data";
import axios from "axios";

const HomePage: React.FC = () => {
  const [items, setItems] = React.useState<PizzaItem[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [activeCatId, setActiveCatId] = useState<number>(0);
  const [sortType, setSortType] = React.useState<{
    name: string;
    sort: string;
  }>({ name: "популярности", sort: "rating" });

  React.useEffect(() => {
    fetchPizzas();
  }, [activeCatId, sortType]);

  const fetchPizzas = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await axios.get<PizzaItem[]>(
        `https://62d7100851e6e8f06f183cd2.mockapi.io/items?${
          activeCatId > 0 ? `category=${activeCatId}` : ""
        }&sortBy=${sortType.sort.replace("-", "")}&order=${
          sortType.sort.includes("-") ? "asc" : "desc"
        }`
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
        <Categories
          categoryName={activeCatId}
          onClickCategory={(id) => setActiveCatId(id)}
        />

        <Sort sortType={sortType} onClickSort={(obj) => setSortType(obj)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...Array(2)].map((_, i) => <PizzaBlockSkeleton key={i} />)
          : items.map((pizza: PizzaItem) => (
              <PizzaBlock {...pizza} key={pizza.id} />
            ))}
      </div>
    </div>
  );
};

export default HomePage;
