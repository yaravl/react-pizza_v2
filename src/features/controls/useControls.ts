import React from "react";
import qs from "qs";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { popupArr } from "./Sort";
import { setControls } from "./controlsSlice";

export const useControls = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // isLocationSearch = window.location.search
  // isMounted = первый рендер
  const isLocationSearch = React.useRef<boolean>(false);
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

  // При первом рендере: если есть запрос в строке поиска(window.location.search)
  // Собираю объект для редакса и передаю его, ставлю флажок isLocationSearch в положение true
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortType = popupArr.find((obj) => obj.sort === params.sortType);
      dispatch(
        setControls({
          ...params,
          sortType,
        })
      );
      isLocationSearch.current = true;
    }
  }, [dispatch]);

  // При первом рендере или параметры изменились
  // не создавать url параметры в адресной строке
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortType: sortType.sort,
        categoryId,
        currentPage,
        searchValue,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage, searchValue, navigate]);

  //TODO: оптимизировать хук

  return { createQueryString, isLocationSearch };
};
