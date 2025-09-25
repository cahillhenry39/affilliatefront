import styled from "styled-components";
import Headings from "../../ui/Headings";
import { HiExclamationTriangle, HiInformationCircle } from "react-icons/hi2";

const InstructionDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background-color: var(--color-grey-0);
  padding: 1rem 1.7rem 1rem;
  box-shadow: var(--shadow-md);
  border-radius: 9px;

  & ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    & li {
      display: grid;
      grid-template-columns: 2rem 1fr;
      gap: 0.4rem;
      font-size: 1.2rem;

      & svg {
        width: 1.5rem;
        height: 1.5rem;
        color: orange;
      }

      & span {
        font-size: 1.2rem;
        color: orangered;
        font-weight: 600;
      }
    }
  }
`;

const FinalNarration = styled.div`
  display: grid;
  grid-template-columns: 2rem 1fr;
  gap: 0.4rem;
  font-size: 1.1rem;
  text-align: center;
  color: var(--color-brand-800);

  & svg {
    width: 1.5rem;
    height: 1.5rem;
    color: orangered;
  }
`;

function DepositInstructions() {
  return (
    <>
      <InstructionDiv>
        <Headings type="h3">Note These Instructions!!!</Headings>

        <ul>
          <li>
            <HiExclamationTriangle />
            <p>
              1. Please complete this payment within the specified time above!{" "}
              <span> Otherwise, your account will not be credited!!!.</span>
            </p>
          </li>

          <li>
            <HiExclamationTriangle />
            <p>
              2. Please fill in the <span>&quot;REF&quot;</span> above when
              transferring!{" "}
              <span> Otherwise, it will not be automatically credited!!!.</span>
            </p>
          </li>

          <li>
            <HiExclamationTriangle />
            <p>
              3. Please do not transfer funds to this account twice. Do not save
              this account to make payments!{" "}
              <span> or you will loose your money!!!.</span>
            </p>
          </li>

          <li>
            <HiExclamationTriangle />
            <p>
              4. After completing the payment!,{" "}
              <span>
                {" "}
                Click the &quot;I HAVE MADE THIS PAYMENT&quot; below button, and
                we will confirm your payment!!!.
              </span>
            </p>
          </li>
        </ul>
      </InstructionDiv>

      <FinalNarration>
        <HiInformationCircle />
        <p>
          Fill in the Note/Remark/Narration in your bank with the
          &quot;REF&quot; code above ☝🏻 when transferring.
        </p>
      </FinalNarration>
    </>
  );
}

export default DepositInstructions;
