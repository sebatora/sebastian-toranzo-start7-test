import React from "react";
import classNames from "classnames";
import "./QuizAnswers.scss";

function QuizAnswers({
  isLoading,
  options,
  isAnswered,
  answerIndex,
  handleAnswer,
}) {
  return (
    <section className="quiz-answers">
      {!isLoading && (
        <div className="quiz-answers-container">
          {options.map((option, index) => (
            <button
              onClick={() => handleAnswer(option, index)}
              key={index}
              value={index}
              disabled={isAnswered && answerIndex !== index}
              className={classNames("quiz-option", {
                correct: isAnswered && option.isCorrect,
                incorrect: index === answerIndex && !option.isCorrect,
                disabled: isAnswered,
              })}
            >
              <p className="quiz-option-text">{option.option}</p>
              <div className="quiz-option-check">
                {isAnswered && option.isCorrect && "✔️"}
                {index === answerIndex &&
                  isAnswered &&
                  !option.isCorrect &&
                  "✖️"}
              </div>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

export default QuizAnswers;
