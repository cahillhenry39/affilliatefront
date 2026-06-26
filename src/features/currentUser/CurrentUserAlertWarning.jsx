import { HiMiniCursorArrowRipple } from "react-icons/hi2";
import styled from "styled-components";

const StyledAlertWarningContainer = styled.div`
  padding: 0.51rem 1rem;
  background-color: var(--color-brand-500);

  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 1rem;
  width: 90vw;
  height: fit-content;
  margin: -3rem auto 0rem;
  border-radius: 11px;
  z-index: 10;

  & div {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
  }

  & p {
    font-size: 1.3rem;
    color: var(--color-grey-0);
  }

  & span {
    font-size: 1.1rem;
    color: var(--color-grey-50);
  }

  & svg {
    width: 3rem;
    height: 3rem;
    color: var(--color-grey-0);
  }
`;

function CurrentUserAlertWarning() {
  return (
    <StyledAlertWarningContainer>
      <HiMiniCursorArrowRipple />

      <div>
        <p>Everything you need</p>
        <span>
          Adjust settings, and customize you experience. Happy tasking!!!
        </span>
      </div>
    </StyledAlertWarningContainer>
  );
}

export default CurrentUserAlertWarning;
