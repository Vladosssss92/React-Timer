import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Progress from "./Progress";
import Button from "./Button";

const Title = styled.h1`
  font-weight: 800;
  text-align: center;
  font-size: 60px;
  margin: 10px;
`;

const WrapTimeInput = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TimeInput = styled.input`
  font-size: 18px;
  width: 45%;
  height: 40px;
  border: 1px solid gray;
  border-radius: 8px;
  color: #3e3eb9;
`;

const TimeInputRange = styled.input`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const TimerOut = styled.div`
  margin-bottom: 10px;
  padding: 8px;
  text-align: center;
  font-size: 50px;
  color: #3e3eb9;
`;

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
    refProgressTime.current = { minutes: 0, seconds: 0 };
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
        refProgressTime.current = { minutes: 0, seconds: 0 };
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
      <Title>Таймер</Title>
      <WrapTimeInput>
        <TimeInput
          type="number"
          className="inputMinutes"
          min={0}
          max={720}
          onChange={onChangeinputMinutes}
          value={!disableInput ? minutes : 0}
          disabled={disableInput}
        />
        <TimeInput
          type="number"
          className="inputSecond"
          min={0}
          max={59}
          onChange={onChangeinputSeconds}
          value={!disableInput ? seconds : 0}
          disabled={disableInput}
        />
      </WrapTimeInput>
      <div className="inputSlider">
        <TimeInputRange
          type="range"
          step={15}
          min={0}
          max={3600}
          onChange={onChangeSlider}
          value={!disableInput ? slider : 0}
          disabled={disableInput}
        />
      </div>
      <TimerOut>
        {`${minutes < 10 ? `0${minutes}` : minutes}:${
          seconds < 10 ? `0${seconds}` : seconds
        }`}
      </TimerOut>
      <Progress seconds={seconds} minutes={minutes} timeRef={refProgressTime} />
      <Button click={handlePausePlayClick}>
        {startOrStopButton ? "Старт" : "Пауза"}
      </Button>
      <Button click={stopCountdown} disable={disableStopButton}>
        Стоп
      </Button>
    </>
  );
};

export default Slider;
