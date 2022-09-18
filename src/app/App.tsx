import React from "react";
import { Routes, Route } from "react-router-dom";
import "../scss/app.scss";
import { Header } from "../components";
import { CartPage, HomePage, Page404 } from "../pages";

function App() {
  return (
    <div className="wrapper">
      {/*TODO: добавить лэйаут*/}
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
