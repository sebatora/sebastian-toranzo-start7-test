import React from "react";
import Timer from "../Timer/Timer";
import "./QuizQuestion.scss";

function QuizQuestion({
  isLoading,
  questions,
  timer,
  setTimer,
  currentQuestion,
}) {
  return (
    <section className="quiz-question">
      <Timer timer={timer} setTimer={setTimer} />
      <div className="quiz-question-text">
        <p>{!isLoading && questions[currentQuestion].question}</p>
      </div>
    </section>
  );
}

export default QuizQuestion;
