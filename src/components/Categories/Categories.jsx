import React from "react";
import { useEffect, useState } from "react";
import CategoryCard from "../CategoryCard/CategoryCard";
import "./Categories.scss";

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://quiz-7.com/categories.json")
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

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
