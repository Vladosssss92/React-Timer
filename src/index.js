import React from "react";
import ReactDOM from "react-dom/client";
import Timer from "./Timer";
import Countdown from "./Countdown";
import styled from "styled-components";

const WrapComponent = styled.div`
  max-width: 700px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <WrapComponent>
    <Timer />
    <Countdown />
  </WrapComponent>
);
