import React from "react";
import styled from "styled-components";


const ProgressTimer = styled.div`
  margin-bottom: 10px;
  padding: 8px;
  text-align: center;
  font-size: 30px;
  color: #3e3eb9;
`;

const Title = styled.h1`
  font-weight: 800;
  text-align: center;
  font-size: 40px;
  margin: 10px;
`;

const Progress = ({ seconds, minutes, timeRef }) => {
  const resultTime = +timeRef.current.seconds + timeRef.current.minutes * 60;
  const countDownTime = +seconds + minutes * 60;
  const percentOfCountDown = resultTime / 100;
  const progress = 100 - countDownTime / percentOfCountDown;

  return (
    <>
      <Title>Прогресс</Title>
      <ProgressTimer>
        {progress >= 0 ? `${Math.floor(progress)} %` : 100 + " %"}
      </ProgressTimer>
    </>
  );
};

export default Progress;
