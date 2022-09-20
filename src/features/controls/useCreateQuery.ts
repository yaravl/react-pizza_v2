import React from "react";
import qs from "qs";
import { useAppSelector } from "../../app/hooks";
import { useNavigate, useLocation } from "react-router-dom";

export const useCreateQuery = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // isMounted = первый рендер
  const isMounted = React.useRef<boolean>(false);

  const { categoryId, sortType, searchValue, currentPage } = useAppSelector(
    (state) => state.controls
  );
  const createQueryString = React.useCallback(() => {
    const sortBy = sortType.sort.replace("-", "");
    const orderBy = sortType.sort.includes("-") ? "asc" : "desc";
    const activeCat = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue.length > 0 ? searchValue : "";

    window.scroll(0, 0);

    return `?page=${currentPage}&limit=4&${activeCat}&sortBy=${sortBy}&order=${orderBy}&search=${search}`;
  }, [categoryId, sortType, currentPage, searchValue]);

  // При первом рендере или параметры изменились
  // не создавать url параметры в адресной строке
  React.useEffect(() => {
    if (isMounted.current && location.pathname === "/") {
      const queryString = qs.stringify({
        sortType: sortType.sort,
        categoryId,
        currentPage,
        searchValue,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [
    categoryId,
    sortType,
    currentPage,
    searchValue,
    navigate,
    location.pathname,
  ]);

  return { isMounted, createQueryString };
};
