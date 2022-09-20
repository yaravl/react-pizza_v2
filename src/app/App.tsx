import React from "react";
import { Routes, Route } from "react-router-dom";
import "../scss/app.scss";
import { Layout } from "../components";
import { CartPage, HomePage, Page404, PizzaPage } from "../pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="pizza-:id" element={<PizzaPage />} />
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
}

export default App;
