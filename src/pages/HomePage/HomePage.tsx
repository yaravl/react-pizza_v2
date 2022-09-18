import React from "react";
import { useNavigate } from "react-router-dom";
import qs from "qs";
import { PizzaBlock, PizzaBlockSkeleton } from "../../components";
import Sort, { popupArr } from "../../features/controls/Sort";
import Categories from "../../features/controls/Categories";
import Pagination from "../../features/controls/Pagination";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setControls } from "../../features/controls/controlsSlice";
import { getProducts } from "../../features/products/productsSlice";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLocSearch = React.useRef<boolean>(false);
  const isMounted = React.useRef<boolean>(false);

  const { categoryId, sortType, searchValue, currentPage } = useAppSelector(
    (state) => state.controls
  );

  const { items } = useAppSelector((state) => state.products);

  const fetchPizzas = React.useCallback(() => {
    const sortBy = sortType.sort.replace("-", "");
    const orderBy = sortType.sort.includes("-") ? "asc" : "desc";
    const activeCat = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue.length > 0 ? searchValue : "";

    dispatch(
      getProducts(
        `?page=${currentPage}&limit=4&${activeCat}&sortBy=${sortBy}&order=${orderBy}&search=${search}`
      )
    )
      .unwrap()
      .then((data) => console.log(data, "data"))
      .catch((e) => console.log(e, "eeeeee"));
    //TODO: добавить уведомления

    window.scroll(0, 0);
  }, [categoryId, sortType, currentPage, searchValue, dispatch]);

  // При первом рендере: если есть запрос в строке поиска(window.location.search)
  // Собираю объект для редакса и передаю его, ставлю флажок isLocSearch в положение true
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
      isLocSearch.current = true;
    }
  }, [dispatch]);

  // При первом рендере когда строка юрл без параметров, загружаю пиццы с даными из редакса
  // Если в строке есть параметры, то вызываю
  React.useEffect(() => {
    if (!isLocSearch.current) {
      fetchPizzas();
    }
    isLocSearch.current = false;
  }, [fetchPizzas]);

  // При первом рендере не создавать url параметры в адресной строке
  // После первого рендера и изменились параметры
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

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {false
          ? [...Array(2)].map((_, i) => <PizzaBlockSkeleton key={i} />)
          : items.map((pizza) => <PizzaBlock {...pizza} key={pizza.id} />)}
      </div>
      <Pagination />
    </div>
  );
};

export default HomePage;
