import styled from "styled-components";
import Headings from "../../ui/Headings";

const HowIwWorkDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: var(--color-grey-100);
  color: var(--color-grey-700);
  padding: 2rem;
  border: 1.5px solid var(--color-grey-300);
  box-shadow: 0 2px 7px #00000053;

  & ul {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 1rem;
    list-style: circle;
  }
`;

function VaultHowItWork({ duration, interestPerDay }) {
  return (
    <HowIwWorkDiv>
      <Headings type="h3-left">How it works</Headings>

      <ul>
        <li>Money is locked for a period of {duration} days.</li>
        <li>It will be used for business within the locked days.</li>
        <li>Your money grows daily by {interestPerDay}%.</li>
        <li>After {duration} days, it will be unlocked.</li>
        <li>Click the withdraw button to transfer to your wallet.</li>
        <li>Withdraw the profit from your wallet to your bank.</li>
      </ul>
    </HowIwWorkDiv>
  );
}

export default VaultHowItWork;
