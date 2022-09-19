import React from "react";
import qs from "qs";
import { popupArr } from "./Sort";
import { setControls } from "./controlsSlice";
import { useAppDispatch } from "../../app/hooks";

export const useLocationSearch = () => {
  const dispatch = useAppDispatch();

  // isLocationSearch = window.location.search
  const isLocationSearch = React.useRef<boolean>(false);

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

  return isLocationSearch;
};
