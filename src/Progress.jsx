import React from "react";

const Progress = ({ seconds, minutes, timeRef }) => {
  let resultTime = +timeRef.current.seconds + timeRef.current.minutes * 60;
  const countDownTime = +seconds + minutes * 60;
  const percentOfCountDown = resultTime / 100;
  const progress = 100 - countDownTime / percentOfCountDown;

  return (
    <>
      <p>Прогресс</p>
      <div className="progress">{progress >= 0 ? `${progress} %` : 0}</div>
    </>
  );
};

export default Progress;
