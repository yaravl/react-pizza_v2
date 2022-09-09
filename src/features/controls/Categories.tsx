import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, allControls } from "./controlsSlice";

const categories: string[] = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

const Categories: React.FC = () => {
  const dispatch = useDispatch();
  const { categoryId } = useSelector(allControls);

  return (
    <div className="categories">
      <ul>
        {categories.map((cat, i) => (
          <li
            className={i === categoryId ? "active" : ""}
            onClick={() => dispatch(setCategory(i))}
            key={cat}
          >
            {cat}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
