import React from "react";
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

  React.useEffect(() => {
    fetchPizzas();
  }, []);

  const fetchPizzas = async (): Promise<void> => {
    try {
      const response = await axios.get<PizzaItem[]>(
        "https://62d7100851e6e8f06f183cd2.mockapi.io/items"
      );
      const data = await response.data;
      setItems(data);
      setIsLoading(false);
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
          : items.map((pizza: PizzaItem) => (
              <PizzaBlock {...pizza} key={pizza.id} />
            ))}
      </div>
    </div>
  );
};

export default HomePage;
