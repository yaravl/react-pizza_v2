import React from "react";
import { Routes, Route } from "react-router-dom";
import "./scss/app.scss";
import { Header } from "./components";
import { CartPage, HomePage, Page404 } from "./pages";
import { SearchContext } from "./context";

function App() {
  const [searchValue, setSearchValue] = React.useState<string>("");

  return (
    <SearchContext.Provider
      value={{
        searchValue,
        setSearchValue: (str: string) => setSearchValue(str),
      }}
    >
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
      </div>
    </SearchContext.Provider>
  );
}

export default App;
