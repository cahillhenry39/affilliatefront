import styled from "styled-components";
import { device } from "../../mediaQuery";

const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);

  box-shadow: var(--shadow-sm);
  position: relative;
  padding: 1rem 1.2rem 1rem 4.5rem;
  margin: 0 auto;

  &::placeholder {
    color: var(--color-grey-300);
    font-size: 1.4rem;
  }

  @media ${device.mobileL} {
    width: 100%;
  }
`;

export default Input;
