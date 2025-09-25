import styled from "styled-components";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0px 0px 2px #00000045;
  border-radius: 11px;
  padding: 1rem;
  background-color: var(--color-grey-0);
  position: relative;

  & p {
    font-size: 1.3rem;
    color: var(--color-grey-600);
    hyphens: none;
    -webkit-hyphens: none;
  }
`;

const NumberingContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;

  background-color: var(--color-brand-100);
  color: var(--color-brand-700);
`;

const IconHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2.5rem;
  /* flex-direction: column; */
  gap: 1rem;

  & h4 {
    font-size: 1.7rem;
    text-align: center;
    & span {
      color: var(--color-brand-700);
    }
  }
`;

function EachHowItWorkCard({ number = 1, icon, header, spanHeader, message }) {
  return (
    <CardContainer>
      <NumberingContainer>{number}</NumberingContainer>

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

export default EachHowItWorkCard;
