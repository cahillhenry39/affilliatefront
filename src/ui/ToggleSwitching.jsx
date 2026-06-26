import { IoIosArrowBack } from "react-icons/io";

import styled from "styled-components";

const StyledLink = styled.button`
  display: flex;
  align-items: center;
  border-radius: var(--border-radius-sm);
  border: none;
  background-color: var(--color-grey-200);

  font-size: 1.4rem;
  padding: 0.8rem 1rem;

  gap: 0.5rem;

  &:hover {
    background-color: var(--color-grey-300);
    border: none;
  }
`;

function ToggleSwitching({ curState }) {
  return (
    <StyledLink onClick={() => curState((state) => !state)}>
      <IoIosArrowBack />

      <span>Go Back</span>
    </StyledLink>
  );
}

export default ToggleSwitching;
