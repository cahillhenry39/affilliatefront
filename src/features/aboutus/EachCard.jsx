import styled from "styled-components";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  box-shadow: 0px 0px 2px #00000045;
  border-radius: 11px;
  padding: 3rem 1rem 2rem;
  background-color: var(--color-grey-0);
  position: relative;

  & p {
    font-size: 1.3rem;
    color: var(--color-grey-600);
    hyphens: none;
    -webkit-hyphens: none;
    text-align: center;
  }
`;

const IconHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2.5rem;
  flex-direction: column;
  gap: 1rem;

  & h4 {
    font-size: 1.7rem;
    text-align: center;
    & span {
      color: var(--color-brand-700);
    }
  }

  & svg {
    width: 7rem;
    height: 7rem;
    color: var(--color-brand-700);
  }
`;

function EachCard({ icon, header, spanHeader, message }) {
  return (
    <CardContainer>
      <IconHeaderContainer>
        <div>{icon}</div>

        <h4>
          {header} <span>{spanHeader}</span>
        </h4>
      </IconHeaderContainer>

      <p>{message}</p>
    </CardContainer>
  );
}

export default EachCard;
