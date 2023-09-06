import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Quiz.scss";

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
    setOptions(shuffleOptions());
    setAnswerIndex(null)
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
    setAnswerIndex(index)
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!isLoading) setOptions(shuffleOptions());
  }, [isLoading]);

  const shuffleOptions = () => {
    return [
      { option: questions[currentQuestion].option1, isCorrect: true },
      { option: questions[currentQuestion].option2, isCorrect: false },
      { option: questions[currentQuestion].option3, isCorrect: false },
      { option: questions[currentQuestion].option4, isCorrect: false },
    ].sort(() => Math.random() - 0.5);
  };

  return (
    <div className="quiz-container">
      <section className="quiz-top-bar">
        <button id="quiz-exit" onClick={handleExit}>
          X
        </button>
        <div id="quiz-progress-bar">
          <div id="quiz-progress-bar-full" />
          <span>
            {!isLoading && `${currentQuestion + 1}/${questions.length}`}
          </span>
        </div>
      </section>

      <section className="quiz-question">
        <div className="quiz-timer">TIMER</div>
        <div className="quiz-question-text">
          {!isLoading && questions[currentQuestion].question}
        </div>
      </section>

      <section className="quiz-answers">
        {!isLoading && (
          <div>
            {options.map((option, index) => (
              <button
                onClick={() => handleAnswer(option, index)}
                key={index}
                value={index}
                disabled={isAnswered && answerIndex !== index}
                className={`quiz-option ${answerIndex !== null && index === answerIndex ? option.isCorrect === true ? "correct" : `incorrect ${option.isCorrect && `correct-option`}` : "" }`}
              >
                <p className="quiz-option-text">{option.option}</p>
                <div className="quiz-option-check">
                  {
                    answerIndex !== null && index === answerIndex ? option.isCorrect === true ? "✔️" : "✖️" : ""
                  }
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      {!isLoading &&
        (currentQuestion + 1 !== questions.length ? (
          <button onClick={handleNext} disabled={!isAnswered} >Next</button>
          ) : (
            <button onClick={handleEnd} disabled={!isAnswered}>End</button>
          ))}
    </div>
  );
}

export default Quiz;
