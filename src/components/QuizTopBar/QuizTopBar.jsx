import React from "react";
import { useNavigate } from "react-router-dom";
import "./QuizTopBar.scss";

function QuizTopBar({ currentQuestion, questions, isLoading }) {
  const navigate = useNavigate();

  return (
    <section className="quiz-top-bar">
      <button id="quiz-exit" onClick={() => navigate("/")}>
        X
      </button>
      <div className="quiz-progress-bar-container">
        <div id="quiz-progress-bar">
          <div
            id="quiz-progress-bar-full"
            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            }}
          />
        </div>
        <span>
          {!isLoading && `${currentQuestion + 1}/${questions.length}`}
        </span>
      </div>
    </section>
  );
}

export default QuizTopBar;
