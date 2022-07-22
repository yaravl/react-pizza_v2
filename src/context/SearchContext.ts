import React from "react";

interface ISearchContext {
  searchValue: string;
  setSearchValue?: (any: string) => void;
}

const defaultValue: ISearchContext = {
  searchValue: "",
};

export const SearchContext = React.createContext<ISearchContext>(defaultValue);
