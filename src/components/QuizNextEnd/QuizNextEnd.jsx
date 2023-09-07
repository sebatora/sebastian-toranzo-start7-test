import React from "react";
import classNames from "classnames";
import "./QuizNextEnd.scss";

function QuizNextEnd({
  isLoading,
  currentQuestion,
  questions,
  isAnswered,
  handleEnd,
  handleNext,
}) {
  return (
    <section>
      {!isLoading &&
        (currentQuestion + 1 !== questions.length ? (
          <button
            className={classNames("next-end", {
              disabled: !isAnswered,
            })}
            onClick={handleNext}
            disabled={!isAnswered}
          >
            Next
          </button>
        ) : (
          <button
            className={classNames("next-end", {
              disabled: !isAnswered,
            })}
            onClick={handleEnd}
            disabled={!isAnswered}
          >
            End
          </button>
        ))}
    </section>
  );
}

export default QuizNextEnd;
