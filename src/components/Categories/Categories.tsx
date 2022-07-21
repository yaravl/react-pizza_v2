import React, { useState } from "react";

interface CategoriesProps {
  categoryName: number;
  onClickCategory: (id: number) => void;
}

const Categories: React.FC<CategoriesProps> = ({
  categoryName,
  onClickCategory,
}) => {
  const categories: string[] = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  //const categoriesContext = React.useContext(CategoriesContext);

  return (
    <div className="categories">
      <ul>
        {categories.map((cat, i) => (
          <li
            className={i === categoryName ? "active" : ""}
            onClick={() => onClickCategory(i)}
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
