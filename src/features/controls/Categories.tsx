import React from "react";

interface CategoriesProps {
  categoryName: number;
  onClickCategory: (id: number) => void;
}
const categories: string[] = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

const Categories: React.FC<CategoriesProps> = ({
  categoryName,
  onClickCategory,
}) => {
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
