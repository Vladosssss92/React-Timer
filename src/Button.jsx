import React from "react";
import styled from "styled-components";

const ButtonS = styled.button`
  font-size: 18px;
  margin-bottom: 10px;
  cursor: pointer;
  border-radius: 8px;
  width: 100%;
  height: 40px;
  border: 1px solid gray;
`;

const Button = React.memo(({ children, click, disable }) => {
  console.log('Рендер ' + children);
  return (

    <>
      <ButtonS onClick={click} disabled={disable}>
        {children}
      </ButtonS>
    </>
  );
});

export default Button;
