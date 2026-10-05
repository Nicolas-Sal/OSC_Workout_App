import { useState, useEffect } from 'react';

function Timer() {
  // How long the rest is (what Reset goes back to)
  const [startTime, setStartTime] = useState(60);
  // How many seconds are left right now
  const [seconds, setSeconds] = useState(60);
  // Is the timer counting down?
  const [isRunning, setIsRunning] = useState(false);

  // Every second while running, subtract 1
  useEffect(() => {
    if (!isRunning) return;

    if (seconds === 0) {
      setIsRunning(false);
      return;
    }

    const tick = setTimeout(() => {
      setSeconds(seconds - 1);
    }, 1000);

    return () => clearTimeout(tick);
  }, [isRunning, seconds]);

  // When the user types a new rest time
  function handleTimeChange(event) {
    const newTime = Number(event.target.value);
    if (newTime > 0) {
      setStartTime(newTime);
      setSeconds(newTime);
      setIsRunning(false);
    }
  }

  function handleReset() {
    setIsRunning(false);
    setSeconds(startTime);
  }

  // Show time as minutes:seconds, like 1:05
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const display = minutes + ':' + (secs < 10 ? '0' + secs : secs);

  return (
    <div>
      <h2>Rest Timer</h2>

      <label>
        Rest time (seconds):{' '}
        <input type="number" value={startTime} onChange={handleTimeChange} />
      </label>

      <h1>{display}</h1>
      {seconds === 0 && <p>Rest is over!</p>}

      <button onClick={() => setIsRunning(true)}>Start</button>
      <button onClick={() => setIsRunning(false)}>Pause</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default Timer;
