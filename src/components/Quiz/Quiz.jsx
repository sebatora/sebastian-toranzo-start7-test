import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classNames from "classnames";
import "./Quiz.scss";
import Timer from "../Timer/Timer";

const shuffleOptions = (questions, currentQuestion) => {
  return [
    { option: questions[currentQuestion].option1, isCorrect: true },
    { option: questions[currentQuestion].option2, isCorrect: false },
    { option: questions[currentQuestion].option3, isCorrect: false },
    { option: questions[currentQuestion].option4, isCorrect: false },
  ].sort(() => Math.random() - 0.5);
};

function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);
  const [answerIndex, setAnswerIndex] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [points, setPoints] = useState(0);

  const [timer, setTimer] = useState(5);

  const fetchData = async () => {
    const response = await fetch(`https://quiz-7.com/questions/${id}.json`);
    const data = await response.json();
    setQuestions(data);
    setIsLoading(false);
  };

  const handleExit = () => {
    setPoints(0);
    setCurrentQuestion(0);
    navigate("/");
  };

  const handleNext = () => {
    setIsAnswered(false);
    setCurrentQuestion(currentQuestion + 1);
    setOptions(shuffleOptions(questions, currentQuestion + 1));
    setAnswerIndex(null);
    setTimer(5);
  };

  const handleEnd = () => {
    alert(`Sumaste ${points} ${points === 1 ? `punto` : `puntos`}`);
    setPoints(0);
    setCurrentQuestion(0);
    navigate("/");
  };

  const handleAnswer = (selectedAnswer, index) => {
    if (selectedAnswer.isCorrect) setPoints(points + 1);
    setIsAnswered(true);
    setAnswerIndex(index);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!isLoading) setOptions(shuffleOptions(questions, currentQuestion));
  }, [isLoading]);

  useEffect(() => {
    if (timer === 0) setIsAnswered(true);
  }, [timer]);

  return (
    <div className="quiz-container">
      <section className="quiz-top-bar">
        <button id="quiz-exit" onClick={handleExit}>
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

      <section className="quiz-question">
        <Timer timer={timer} setTimer={setTimer} />
        <div className="quiz-question-text">
          <p>{!isLoading && questions[currentQuestion].question}</p>
        </div>
      </section>

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
                  {answerIndex !== null && index === answerIndex
                    ? option.isCorrect === true
                      ? "✔️"
                      : "✖️"
                    : ""}
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

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
    </div>
  );
}

export default Quiz;
