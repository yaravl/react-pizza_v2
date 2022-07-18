import React from "react";
import "./scss/app.scss";
import { Header, Categories, Sort, PizzaBlock } from "./components";
import pizzasItems from "./assets/pizza.json";
import { PizzaItem } from "./types/data";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzasItems.map((pizza: PizzaItem) => (
              <PizzaBlock {...pizza} key={pizza.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
