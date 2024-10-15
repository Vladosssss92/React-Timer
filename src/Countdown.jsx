import Slider from "./Slider";
import styled from "styled-components";

const WrapComponent = styled.div`
  border: 5px solid lightblue;
  border-radius: 10px;
  padding: 10px;
`;

const Countdown = () => {
  return (
    <WrapComponent>
      <Slider />
    </WrapComponent>
  );
};

export default Countdown;
