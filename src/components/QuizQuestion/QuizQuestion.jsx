import React from "react";
import "./QuizQuestion.scss";

function QuizQuestion({
  isLoading,
  questions,
  currentQuestion,
}) {
  return (
    <section className="quiz-question">
      <div className="quiz-question-text">
        <p>{!isLoading && questions[currentQuestion].question}</p>
      </div>
    </section>
  );
}

export default QuizQuestion;
