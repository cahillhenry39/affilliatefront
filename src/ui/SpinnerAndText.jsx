import styled from "styled-components";
import SpinnerMini from "./SpinnerMini";

const StlyedSpinnerAndText = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

function SpinnerAndText({ message }) {
  return (
    <StlyedSpinnerAndText>
      <SpinnerMini />
      {message}
    </StlyedSpinnerAndText>
  );
}

export default SpinnerAndText;
