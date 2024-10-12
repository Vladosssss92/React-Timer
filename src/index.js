import React from "react";
import ReactDOM from "react-dom/client";
import Timer from "./Timer";
import Countdown from "./Countdown";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Timer />
    <Countdown />
  </>
);
