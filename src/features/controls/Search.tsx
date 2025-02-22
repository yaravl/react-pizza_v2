import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setSearch } from "./controlsSlice";
import useDispatchDebounce from "../../hooks/useDispatchDebounce";
import { useCreateQuery } from "./useCreateQuery";
import styles from "./Search.module.scss";

const Search: React.FC = () => {
  const dispatch = useAppDispatch();

  const { searchValue } = useAppSelector((state) => state.controls);

  const { isMounted } = useCreateQuery();

  const [inputValue, setInputValue] = React.useState<string>(searchValue);
  const searchRef = React.useRef<HTMLInputElement>(null);

  const debouncedDispatch = useDispatchDebounce(setSearch, 1000);

  const location = useLocation();
  const navigate = useNavigate();

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
    debouncedDispatch(e.target.value);
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  const handleInputClear: React.MouseEventHandler<SVGSVGElement> = () => {
    dispatch(setSearch(""));
    setInputValue("");
    searchRef.current && searchRef.current.focus();
  };

  React.useEffect(() => {
    setInputValue(searchValue);
  }, [searchValue]);

  return (
    <div className={styles.search_wrap}>
      <svg
        className={styles.search_icon}
        enableBackground="new 0 0 32 32"
        id="EditableLine"
        version="1.1"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="14"
          cy="14"
          fill="none"
          id="XMLID_42_"
          r="9"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        ></circle>
        <line
          fill="none"
          id="XMLID_44_"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          x1="27"
          x2="20.366"
          y1="27"
          y2="20.366"
        ></line>
      </svg>
      <input
        ref={searchRef}
        type="text"
        placeholder="Поиск пиццы..."
        value={isMounted && inputValue}
        onChange={handleInputChange}
      />
      {inputValue && (
        <svg
          onClick={handleInputClear}
          className={styles.search_clear}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"></path>
        </svg>
      )}
    </div>
  );
};

export default Search;
