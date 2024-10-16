import React, {FC} from "react";
import { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import Button from "./Button";
import Title from "./Title";

const WrapComponent = styled.div`
  border: 5px solid lightblue;
  border-radius: 10px;
  padding: 10px;
`;

const TimerOut = styled.div`
  margin-bottom: 10px;
  padding: 8px;
  text-align: center;
  font-size: 50px;
  color: #3e3eb9;
`;

const Timer: FC = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [isPause, setIsPause] = useState<boolean>(true);
  const [startOrStopButton, setStartOrStopButton] = useState<boolean>(true);

  let disableStopButton = false;
  if (!seconds && !minutes && !hours) disableStopButton = true;

  const handlePausePlayClick = useCallback(() => {
    setIsPause((prev) => !prev);
    setStartOrStopButton((prev) => !prev);
  }, []);

  const handleStopClick = useCallback(() => {
    setStartOrStopButton(true);
    setIsPause(true);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  }, []);

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
  }, [seconds, isPause]);

  return (
    <WrapComponent className="App">
      <Title>Секундомер</Title>
      <TimerOut>
        {`${hours < 10 ? `0${hours}` : hours}:${
          minutes < 10 ? `0${minutes}` : minutes
        }:${seconds < 10 ? `0${seconds}` : seconds}`}
      </TimerOut>
      <Button click={handlePausePlayClick}>
        {startOrStopButton ? "Старт" : "Пауза"}
      </Button>
      <Button click={handleStopClick} disable={disableStopButton}>
        Стоп
      </Button>
    </WrapComponent>
  );
};

export default Timer;