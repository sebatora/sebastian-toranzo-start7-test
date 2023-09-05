import React from "react";
import "./CategoryCard.scss";

function CategoryCard({ id, title, questions, icon }) {
  return (
    <div className="category-container" id={`container-${id}`}>
      <img src={`https://quiz-7.com${icon}`} alt={title} />
      <div className="category-container-text">
        <h4>{title}</h4>
        <p>{questions} questions</p>
      </div>
    </div>
  );
}

export default CategoryCard;
