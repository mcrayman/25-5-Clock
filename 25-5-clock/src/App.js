import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [time, setTime] = useState({
    minutes: 25,
    seconds: 0
  });
  const [isRunning, setIsRunning] = useState(false);
  const [label, setLabel] = useState('Session');

    useEffect(() => {
      let countdown;
      if (isRunning) {
        countdown = setInterval(() => {
          if (time.minutes === 0 && time.seconds === 0) {
            handleSwitch();
            clearInterval(countdown);
          } else {
            if (time.seconds === 0) {
              setTime({
                minutes: time.minutes - 1,
                seconds: 59 // Reset seconds to 59 when reaching 0
              });
            } else {
              setTime({
                minutes: time.minutes,
                seconds: time.seconds - 1
              });
            }
          }
        }, 1000);

        return () => {
          clearInterval(countdown);
        };}
      }, [isRunning, time]);
    
  
  const handleReset = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTime({ minutes: 25, seconds: 0 });
    setIsRunning(false);
    setLabel('Session')
  };

  const handleBreakDecrement = () => {
    if (breakLength > 1) {
    setBreakLength(breakLength - 1);
    }
  }

  const handleSessionDecrement = () => {
    if (sessionLength > 1) {
    setSessionLength(sessionLength - 1);
    setTime({
      minutes: sessionLength - 1, 
      seconds: 0
    });
    }
  }

  const handleBreakIncrement = () => {
    if (breakLength < 60) {
    setBreakLength(breakLength + 1);
    }
  }

  const handleSessionIncrement = () => {
    if (sessionLength < 60) {
    setSessionLength(sessionLength + 1);
    setTime({
      minutes: sessionLength + 1, 
      seconds: 0
    });
    }
  }

  const handleIsRunning = () => {
    setIsRunning(!isRunning);
  }

  const handleSwitch = () => {
    if (label === 'Session') {
      setTime({
        minutes: breakLength,
        seconds: 0
      });
      setIsRunning(true);
      setLabel('Break');
    } else {
      setTime({
        minutes: sessionLength,
        seconds: 0
      });
      setIsRunning(true);
      setLabel('Session');
    }
  };

  return (
    <div className="App">
      <div id="break-label">Break Length: </div>
      <div id="session-label">Session Length: </div>
      <button id="break-decrement" onClick={handleBreakDecrement}>Decrement break</button>
      <button id="session-decrement" onClick={handleSessionDecrement}>Decrement session</button>
      <button id="break-increment" onClick={handleBreakIncrement}>Increment break</button>
      <button id="session-increment" onClick={handleSessionIncrement}>Increment session</button>
      <div id="break-length">{breakLength}</div>
      <div id="session-length">{sessionLength}</div>
      <div id="timer-label">{label}</div>
      <div id="time-left">{time.minutes}:{time.seconds < 10 ? `0${time.seconds}` : time.seconds}</div>
      <button id="start_stop" onClick={handleIsRunning}>start stop</button>
      <button id="reset" onClick={handleReset}>reset</button>
    </div>
  );
}

export default App;
