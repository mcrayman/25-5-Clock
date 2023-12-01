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
  const [label, setLabel] = useState('Focus');
  const [status, setStatus] = useState('Start')

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
    setLabel('Session');
    setStatus('Start');
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
    setStatus(status === 'Start' ? 'Pause' : 'Start');
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
    <div className='App'>

    <div id="header">Pomofocus</div>

    <div className='labels'>
      <div className='break-labels'>
        <div className='break'>
          <div id="break-label">Break Length</div>
          <div id="break-length">{breakLength}</div>
        </div>
        <div className='break-changes'>
          <button className='change break-change' id="break-decrement" onClick={handleBreakDecrement}><i class="fa-solid fa-arrow-down fa-xl"></i></button>
          <button className='change break-change' id="break-increment" onClick={handleBreakIncrement}><i class="fa-solid fa-arrow-up fa-xl"></i></button>
        </div>
      </div>
      <div className='session-labels'>
        <div className='session'>
          <div id="session-label">Session Length</div>
          <div id="session-length">{sessionLength}</div>
        </div>
        <div className='session-changes'>
          <button className='change session-change' id="session-decrement" onClick={handleSessionDecrement}><i class="fa-solid fa-arrow-down fa-xl"></i></button>
          <button className='change session-change' id="session-increment" onClick={handleSessionIncrement}><i class="fa-solid fa-arrow-up fa-xl"></i></button>
        </div>
      </div>
    </div>

    <div id="timer-label">{label}</div>
    <div id="time-left">
      <span className="countdown font-mono text-6xl">
        <span style={{"--value":time.minutes}}></span>:
        <span style={{"--value":time.seconds}}></span>
      </span>
    </div>  

    <div className='startstopreset'>
      <button id="start_stop" onClick={handleIsRunning}>{status === 'Start' ? <i class="fa-solid fa-play fa-2xl"></i> : <i class="fa-solid fa-pause fa-2xl"></i>}</button>
      <button id="reset" onClick={handleReset}><i class="fa-solid fa-rotate-left fa-2xl"></i></button>
    </div>
    <div id='signature'>Matthew McMeans</div>
    </div>
  );
}

export default App;
