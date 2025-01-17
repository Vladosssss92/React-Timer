import React, { useEffect, useRef, useState, useCallback, FC } from "react";
import styled from "styled-components";
import Progress from "./Progress";
import Button from "./Button";
import Title from "./Title";

interface ITypeTimeRef {
  minutes: number;
  seconds: number;
}

const Wrap = styled.div`
  border: 5px solid lightblue;
  border-radius: 10px;
  padding: 10px;
`;

const WrapTimeInput = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TimeInput = styled.input`

  font-size: 30px;
  width: 45%;
  height: 40px;
  border: 1px solid gray;
  border-radius: 8px;
  color: #3e3eb9;
  &:disabled {
    color: lightgray;
  }
  &[type="number"]::-webkit-inner-spin-button, input[type="number"]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
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

const Countdown: FC = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [slider, setSlider] = useState<number>(0);
  const [stop, setStop] = useState<boolean>(false);
  const [disableInput, setDidsableInput] = useState<boolean>(false);
  const [startOrStopButton, setStartOrStopButton] = useState<boolean>(true);

  const refProgressTime = useRef<ITypeTimeRef>({ minutes: 0, seconds: 0 });

  let disableStopButton = false;
  if (!seconds && !minutes) {
    disableStopButton = true;
  }

  const handleStopClick = useCallback(() => {
    if (!stop) {
      setStop(true);
      setStartOrStopButton(prev => !prev);
    } else {
      setStartOrStopButton(true);
      setDidsableInput(false);
      setStop(true);
      setSeconds(0);
      setMinutes(0);
      setSlider(0);
      refProgressTime.current = { minutes: 0, seconds: 0 };
    }
  }, [stop]);

  const handlePausePlayClick = () => {
    if (disableStopButton) {
      setDidsableInput(false);
      return;
    } else {
      setDidsableInput(true);
    }
    setStop((prev) => !prev);
    setStartOrStopButton((prev) => !prev);
    if (!refProgressTime.current.seconds && !refProgressTime.current.minutes) {
      refProgressTime.current = { minutes: minutes, seconds: seconds };
    }
  };

  const clearInput = useCallback((e) => {
    e.target.value = '';
  }, [])

  const onChangeinputSeconds = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeconds(+e.target.value);
    if (+e.target.value > 59) setSeconds(59);
    setSlider(+e.target.value + minutes * 60);
  };

  const onChangeinputMinutes = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinutes(+e.target.value);
    setSlider(+seconds + (+e.target.value * 60));
    if (+e.target.value > 720) setMinutes(720);
  };

  const onChangeSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlider(+e.target.value);
    if (+e.target.value > 59) {
      setMinutes(Math.floor(+e.target.value / 60));
      setSeconds(+e.target.value % 60);
    } else {
      setSeconds(+e.target.value);
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
        setSlider(0);
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
    <Wrap>
      <Title>Таймер</Title>
      <WrapTimeInput>
        <TimeInput
          type="number"
          className="inputMinutes"
          min={0}
          max={720}
          onChange={onChangeinputMinutes}
          onClick={clearInput}
          value={!disableInput ? minutes : 0}
          disabled={disableInput}
        />
        <TimeInput
          type="number"
          className="inputSecond"
          min={0}
          max={59}
          onChange={onChangeinputSeconds}
          onClick={clearInput}
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
        {`${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds
          }`}
      </TimerOut>
      <Progress seconds={seconds} minutes={minutes} timeRef={refProgressTime} />
      <Button click={handlePausePlayClick}>
        {startOrStopButton ? "Старт" : "Пауза"}
      </Button>
      <Button click={handleStopClick} disable={disableStopButton}>
        {startOrStopButton ? "Сброс" : "Пауза/Сброс"}
      </Button>
      </Wrap>
    </>
  );
};

export default Countdown;
