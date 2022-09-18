import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setCategory } from "./controlsSlice";

const categories: string[] = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

const Categories: React.FC = () => {
  const dispatch = useAppDispatch();
  const { categoryId } = useAppSelector((state) => state.controls);

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
