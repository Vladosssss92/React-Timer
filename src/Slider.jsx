import { useEffect, useRef, useState } from "react";
import "./style.css";
import Progress from "./Progress";

const Slider = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [slider, setSlider] = useState(0);
  const [stop, setStop] = useState(false);
  const [disableInput, setDidsableInput] = useState(false);
  const [startOrStopButton, setStartOrStopButton] = useState(true);

  const refProgressTime = useRef({ minutes: +minutes, seconds: +seconds });

  let disableStopButton = false;
  if (!seconds && !minutes) {
    disableStopButton = true;
  }
  const stopCountdown = () => {
    setStartOrStopButton(true);
    setDidsableInput(false);
    setStop(true);
    setSeconds(0);
    setMinutes(0);
    setSlider(0);
  };

  const handlePausePlayClick = () => {
    if (!seconds && !minutes) {
      setDidsableInput(false);
      return;
    } else {
      setDidsableInput(true);
    }
    setStop((prev) => !prev);
    setStartOrStopButton((prev) => !prev);
    refProgressTime.current = { minutes: +minutes, seconds: +seconds };
  };

  const onChangeinputSeconds = (e) => {
    setSeconds(e.target.value);
    if (e.target.value > 59) setSeconds(59);
    setSlider(+seconds + minutes * 60);
  };

  const onChangeinputMinutes = (e) => {
    setMinutes(e.target.value);
    if (e.target.value > 720) setMinutes(720);
    setSlider(+seconds + minutes * 60);
  };

  const onChangeSlider = (e) => {
    setSlider(e.target.value);
    if (e.target.value > 59) {
      setMinutes(Math.floor(e.target.value / 60));
      setSeconds(e.target.value % 60);
    } else {
      setSeconds(e.target.value);
      setMinutes(0);
    }
  };
  useEffect(() => {
    const countdown = () => {
      if (seconds >= 1) {
        setSeconds((prev) => prev - 1);
      } else if (seconds === 0 && minutes > 0) {
        setSeconds(59);
        setMinutes((prev) => prev - 1);
      }
      if (seconds === 0 && minutes === 0) {
        setStop(true);
        setStartOrStopButton(true);
        setDidsableInput(false);
      }
    };
    const id = setInterval(countdown, 1000);

    if (stop) {
      clearInterval(id);
    }

    return () => {
      clearInterval(id);
    };
  }, [seconds, stop]);
  return (
    <>
      <div>Таймер</div>
      <div className="inputTime">
        <input
          type="number"
          className="inputMinutes"
          min={0}
          max={720}
          onChange={onChangeinputMinutes}
          value={!disableInput ? minutes : 0}
          disabled={disableInput}
        />
        <input
          type="number"
          className="inputSecond"
          min={0}
          max={59}
          onChange={onChangeinputSeconds}
          value={!disableInput ? seconds : 0}
          disabled={disableInput}
        />
      </div>
      <div className="inputSlider">
        <input
          type="range"
          step={15}
          min={0}
          max={3600}
          onChange={onChangeSlider}
          value={!disableInput ? slider : 0}
          disabled={disableInput}
        />
      </div>
      <div className="outTime">
        {`${minutes < 10 ? `0${minutes}` : minutes}:${
          seconds < 10 ? `0${seconds}` : seconds
        }`}
      </div>
      <Progress
        seconds={refProgressTime.current.seconds}
        minutes={refProgressTime.current.minutes}
      />
      <button onClick={handlePausePlayClick}>
        {startOrStopButton ? "Старт" : "Пауза"}
      </button>
      <button onClick={stopCountdown} disabled={disableStopButton}>
        Стоп
      </button>
    </>
  );
};

export default Slider;
