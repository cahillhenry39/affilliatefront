import styled from "styled-components";

const StyledIconPrefix = styled.span`
  position: absolute;

  padding: 0rem 0.3rem;
  margin-left: 1.5rem;
  height: 30%;

  display: flex;
  align-items: center;
  justify-content: center;

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-brand-700);
  }

  & img {
    width: 2rem;
    height: auto;
  }
`;

function IconForInput({ children }) {
  return <StyledIconPrefix>{children}</StyledIconPrefix>;
}

export default IconForInput;
