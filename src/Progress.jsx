import React, { useRef } from "react";

const Progress = ({ seconds, minutes }) => {
  const refPercent = useRef(100);
  let resultTime = +seconds + minutes * 60;
  let restWorkTimer = 0;
  let percentOfSecond = 0;
  let visibility = false;

  if (resultTime) {
    visibility = false
    percentOfSecond = 100 / resultTime;
    restWorkTimer = refPercent.current - percentOfSecond;
    refPercent.current = restWorkTimer;
  } else {
    visibility = true;
  }

  return (
    <>
      <p>Прогресс</p>
      <div className="progress">
        {visibility
          ? "Задайте таймер"
          : restWorkTimer >= 0
          ? restWorkTimer + percentOfSecond
          : 0}
      </div>
    </>
  );
};

export default Progress;
