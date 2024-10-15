import React from "react";
import styled from "styled-components";

const TitleS = styled.h1`
  font-weight: 800;
  text-align: center;
  font-size: 60px;
  margin: 10px;
`;

const Title = React.memo(({ children }) => {
  return (
    <>
      <TitleS>{children}</TitleS>
    </>
  );
});

export default Title;
