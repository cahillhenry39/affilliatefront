import styled from "styled-components";
import { device } from "../../mediaQuery";
import Spinner from "./Spinner";

const StyledStat = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);

  padding: 1.6rem;
  display: grid;
  grid-template-columns: 6.4rem 1fr;
  grid-template-rows: auto auto;
  column-gap: 1.6rem;
  row-gap: 0.4rem;

  @media ${device.mobileL} {
    padding: 0.5rem 0.2rem;
    column-gap: 0.5rem;
    grid-template-columns: 4.4rem 1fr;
  }

  @media ${device.mobileS} {
    padding: 1rem;

    grid-template-columns: 3.4rem 1fr;
  }
`;

const Icon = styled.div`
  grid-row: 1 / -1;
  aspect-ratio: 1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Make these dynamic, based on the received prop */
  background-color: var(--color-${(props) => props.color}-100);

  & svg {
    width: 3.2rem;
    height: 3.2rem;
    color: var(--color-${(props) => props.color}-700);
  }

  @media ${device.mobileL} {
    & svg {
      width: 2rem;
      height: 2rem;
    }
  }

  @media ${device.mobileS} {
    & svg {
      width: 1.8rem;
      height: 1.8rem;
    }
  }
`;

const Title = styled.h5`
  align-self: end;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: var(--color-grey-400);

  @media ${device.mobileL} {
    font-size: 0.81rem;
  }
`;

const Value = styled.p`
  font-size: 2rem;
  line-height: 1;
  font-weight: 600;

  @media ${device.mobileL} {
    font-size: 1.3rem;
  }
`;

function Stat({ icon, title, value, color, isWorking }) {
  if (isWorking) return <Spinner />;
  return (
    <StyledStat>
      <Icon color={color}>{icon}</Icon>
      <Title>{title}</Title>
      <Value>{value}</Value>
    </StyledStat>
  );
}

export default Stat;
