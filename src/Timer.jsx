import { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "./Button";

const WrapComponent = styled.div`
border: 5px solid lightblue;
border-radius: 10px;
padding: 10px
`

const Title = styled.h1`
  font-weight: 800;
  text-align: center;
  font-size: 60px;
  margin: 10px;
`;

const TimerOut = styled.div`
  margin-bottom: 10px;
  padding: 8px;
  text-align: center;
  font-size: 50px;
  color: #3e3eb9;
`;

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
    <WrapComponent className="App">
      <Title>Секундомер</Title>
      <TimerOut>
        {`${hours < 10 ? `0${hours}` : hours}:${
          minutes < 10 ? `0${minutes}` : minutes
        }:${seconds < 10 ? `0${seconds}` : seconds}`}
      </TimerOut>
      <Button click={handleisPausePlayClick}>
        {startOrStopButton ? "Старт" : "Пауза"}
      </Button>
      <Button click={stopTimer} disable={disableStopButton}>
        Стоп
      </Button>
    </WrapComponent>
  );
};

export default Timer;
