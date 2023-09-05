import React from "react";
import CategoryCard from "../CategoryCard/CategoryCard";
import "./Categories.scss";

function Categories({ categories }) {
  return (
    <div className="categories-container">
      <h3>Let's play</h3>
      <div className="categories-cards">
        {categories.map(({ id, title, questions, icon }) => (
          <CategoryCard
            key={id}
            id={id}
            title={title}
            questions={questions}
            icon={icon}
          />
        ))}
      </div>
    </div>
  );
}

export default Categories;
