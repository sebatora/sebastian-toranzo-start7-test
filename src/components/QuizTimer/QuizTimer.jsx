import React, { useEffect } from "react";
import "./QuizTimer.scss";

function QuizTimer({ timer, setTimer }) {
  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) setTimer((second) => second - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <section className="timer-container">
      <div id="timer-progress-bar">
        <div
          id="timer-progress-bar-full"
          style={{
            width: `${(0 / timer) * 100}%`,
          }}
        />
      </div>
      <p className="timer-seconds">{timer}</p>
    </section>
  );
}

export default QuizTimer;
