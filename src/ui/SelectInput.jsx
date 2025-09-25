import styled from "styled-components";
import { device } from "../../mediaQuery";

const SelectInput = styled.select`
  font-size: 1.4rem;
  padding: 1rem 1.2rem 1rem 4rem;
  margin: 0 auto;
  width: 100%;

  border: 1px solid var(--color-grey-300);

  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);

  & option {
    cursor: pointer;
  }

  @media ${device.mobileL} {
    width: 100%;
  }
`;

export default SelectInput;
