import React, { useEffect } from 'react'
import "./Timer.scss";

function Timer( { timer, setTimer } ) {

  useEffect(() => {
    
    const interval = setInterval(() => {
      if(timer > 0) setTimer((second) => second - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [timer])

  return (
    <div className="timer-container">
      <p className="timer-seconds">{timer}</p>
    </div>
  )
}

export default Timer