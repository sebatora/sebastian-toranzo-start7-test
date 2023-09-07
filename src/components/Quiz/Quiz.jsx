import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuizTopBar from "../QuizTopBar/QuizTopBar";
import QuizTimer from "../QuizTimer/QuizTimer";
import QuizQuestion from "../QuizQuestion/QuizQuestion";
import QuizAnswers from "../QuizAnswers/QuizAnswers";
import QuizNextEnd from "../QuizNextEnd/QuizNextEnd";
import "./Quiz.scss";

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

  const [timer, setTimer] = useState(30);

  const fetchData = async () => {
    const response = await fetch(`https://quiz-7.com/questions/${id}.json`);
    const data = await response.json();
    setQuestions(data);
    setIsLoading(false);
  };

  const handleNext = () => {
    setIsAnswered(false);
    setCurrentQuestion(currentQuestion + 1);
    setOptions(shuffleOptions(questions, currentQuestion + 1));
    setAnswerIndex(null);
    setTimer(30);
  };

  const handleEnd = () => {
    alert(`Sumaste ${points} ${points === 1 ? `punto` : `puntos`}`);
    navigate("/");
  };

  const handleAnswer = (selectedAnswer, index) => {
    if (selectedAnswer.isCorrect) setPoints(points + 1);
    setIsAnswered(true);
    setTimer(0);
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
      <QuizTopBar
        currentQuestion={currentQuestion}
        questions={questions}
        isLoading={isLoading}
      />

      <QuizTimer
        timer={timer}
        setTimer={setTimer}
      />

      <QuizQuestion
        isLoading={isLoading}
        questions={questions}
        timer={timer}
        setTimer={setTimer}
        currentQuestion={currentQuestion}
      />

      <QuizAnswers
        isLoading={isLoading}
        options={options}
        isAnswered={isAnswered}
        answerIndex={answerIndex}
        handleAnswer={handleAnswer}
      />

      <QuizNextEnd
        isLoading={isLoading}
        currentQuestion={currentQuestion}
        questions={questions}
        isAnswered={isAnswered}
        handleEnd={handleEnd}
        handleNext={handleNext}
      />
    </div>
  );
}

export default Quiz;
