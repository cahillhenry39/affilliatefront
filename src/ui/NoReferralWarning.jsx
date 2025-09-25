import styled from "styled-components";
import Button from "./Button";

const StyledNoReferral = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  padding: 6rem 2rem 2rem;

  & h3 {
    font-size: 2rem;
    text-align: center;
    border-bottom: 1px solid var(--color-brand-700);
    padding: 1rem;
    color: #d83a00;
  }

  & p {
    font-size: 1.5rem;
    text-align: justify;
  }

  & span {
    font-size: 1.3rem;
  }
`;

function NoReferralWarning({ onCloseModal, referralURL }) {
  return (
    <StyledNoReferral>
      <h3>Oops, No task for you</h3>

      <p>
        To keep the business affiliate marketing productive, we need more users
        to perform more task and rate our afiliated mobile applications. As a
        team, we need you to bring onboard new team mates so that togather, we
        will become more productive.
      </p>

      <span>https://www.bomerg.com/{referralURL}</span>

      <Button type="primary" onClick={onCloseModal}>
        Got it
      </Button>
    </StyledNoReferral>
  );
}

export default NoReferralWarning;
