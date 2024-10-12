import React from "react";

const Progress = ({ seconds, minutes, timeRef }) => {
  const resultTime = +timeRef.current.seconds + timeRef.current.minutes * 60;
  const countDownTime = +seconds + minutes * 60;
  const percentOfCountDown = resultTime / 100;
  const progress = 100 - countDownTime / percentOfCountDown;

  return (
    <>
      <div>Прогресс</div>
      <div className="progress">
        {progress >= 0 ? `${Math.floor(progress)} %` : 100 + " %"}
      </div>
    </>
  );
};

export default Progress;
