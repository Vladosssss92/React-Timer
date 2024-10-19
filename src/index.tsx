import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import Timer from "./Timer";
import Countdown from "./Countdown";
import styled from "styled-components";

const Wrap = styled.div`
  max-width: 700px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>    
    <Wrap>
      <Timer />
      <Countdown />
    </Wrap>
  </StrictMode>
);
