import React from "react";

const Sort: React.FC = () => {
  const [popupOpen, setPopupOpen] = React.useState<boolean>(false);
  const [popupCurrent, setPopupCurrent] =
    React.useState<string>("популярности");
  const popupRef = React.useRef<HTMLDivElement | null>(null);

  const popupArr = ["популярности", "цене", "алфавиту"];

  React.useEffect(() => {
    if (popupOpen) {
      window.addEventListener("click", closePopupOutside);
    }
    return function () {
      window.removeEventListener("click", closePopupOutside);
    };
  });

  const closePopupOutside = (e: MouseEvent): void => {
    if (!e.target) return;

    const target = e.target as HTMLElement;

    if (popupRef.current && !popupRef.current?.contains(target)) {
      setPopupOpen(false);
    }
  };

  const handlerCurrentPopupItem: React.MouseEventHandler<HTMLLIElement> = (
    e
  ) => {
    if (!e.target) return;
    const target = e.target as HTMLElement;
    setPopupCurrent(target.innerText);
    setPopupOpen(false);
  };

  return (
    <div ref={popupRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setPopupOpen(!popupOpen)}>{popupCurrent}</span>
      </div>
      {popupOpen && (
        <div className="sort__popup">
          <ul>
            {popupArr.map((el, i) => (
              <li
                onClick={handlerCurrentPopupItem}
                className={el === popupCurrent ? "active" : ""}
                key={i}
              >
                {el}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
