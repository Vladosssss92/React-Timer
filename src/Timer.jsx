import { useEffect, useState } from "react";
import "./style.css";

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [isPause, setIsPause] = useState(true);
  const [startOrStopButton, setStartOrStopButton] = useState(true);

  let disableStopButton = false;
  if (!seconds && !minutes && !hours) disableStopButton = true;

  const handleisPausePlayClick = () => {
    setIsPause((prev) => !prev);
    setStartOrStopButton((prev) => !prev);
  };

  const stopTimer = () => {
    setStartOrStopButton(true);
    setIsPause(true);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  };

  useEffect(() => {
    const timer = () => {
      if (seconds === 59) {
        setSeconds(0);
        if (minutes === 59) {
          setMinutes(0);
          setHours((prev) => ++prev);
        } else {
          setMinutes((prev) => ++prev);
        }
      } else {
        setSeconds((prev) => ++prev);
      }
    };
    const id = setInterval(timer, 1000);
    if (isPause) {
      clearInterval(id);
    }
    return () => {
      clearInterval(id);
    };
  }, [isPause]);

  return (
    <div className="App">
      <div>Секундомер</div>
      <div>
        {`${hours < 10 ? `0${hours}` : hours}:${
          minutes < 10 ? `0${minutes}` : minutes
        }:${seconds < 10 ? `0${seconds}` : seconds}`}
      </div>
      <button onClick={handleisPausePlayClick}>
        {startOrStopButton ? "Старт" : "Пауза"}
      </button>
      <button onClick={stopTimer} disabled={disableStopButton}>
        Стоп
      </button>
    </div>
  );
};

export default Timer;
