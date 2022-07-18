import React, { useState } from "react";

const Categories: React.FC = () => {
  const categories: string[] = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  const [activeCat, setActiveCat] = useState<string>("Все");

  return (
    <div className="categories">
      <ul>
        {categories.map((cat) => (
          <li
            className={cat === activeCat ? "active" : ""}
            onClick={() => setActiveCat(cat)}
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
