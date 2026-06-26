import styled, { keyframes } from "styled-components";
import { BiLoader } from "react-icons/bi";

const rotate = keyframes`
  to {
    transform: rotate(1turn);
  }
`;

const Spinner = styled(BiLoader)`
  width: 1.6rem;
  height: 1.6rem;
  animation: ${rotate} 1.5s infinite linear;
`;

const SpanLoading = styled.span`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

function SpinnerMini() {
  return (
    <SpanLoading>
      <Spinner />
    </SpanLoading>
  );
}

export default SpinnerMini;
