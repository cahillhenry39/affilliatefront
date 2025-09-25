import styled from "styled-components";
import { formatTextCapitalize } from "../../utils/helpers";

const BankDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  background-color: var(--color-grey-0);
  padding: 2rem 1rem;
  border-radius: 9px;
`;

const EachBankDetailsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

const EachBankDetailsContainerContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;

  & span {
    color: var(--color-grey-400);
    font-size: 1.2rem;
  }

  & p {
    color: var(--color-grey-700);
    font-weight: 500;
    font-size: 1.5rem;
  }
`;

function BankAndAccountDetails({ personalData, bankAccount, bankName }) {
  const { fullName, email } = personalData || {};

  return (
    <BankDetailsContainer>
      <EachBankDetailsContainer>
        <EachBankDetailsContainerContent>
          <span>Bank Name</span>
          <p>{formatTextCapitalize(bankName)}</p>
        </EachBankDetailsContainerContent>
      </EachBankDetailsContainer>

      <EachBankDetailsContainer>
        <EachBankDetailsContainerContent>
          <span>Account number</span>
          <p>{bankAccount}</p>
        </EachBankDetailsContainerContent>
      </EachBankDetailsContainer>

      <EachBankDetailsContainer>
        <EachBankDetailsContainerContent>
          <span>Full Name</span>
          <p>{formatTextCapitalize(fullName)}</p>
        </EachBankDetailsContainerContent>
      </EachBankDetailsContainer>

      <EachBankDetailsContainer>
        <EachBankDetailsContainerContent>
          <span>Email Address</span>
          <p>{email}</p>
        </EachBankDetailsContainerContent>
      </EachBankDetailsContainer>
    </BankDetailsContainer>
  );
}

export default BankAndAccountDetails;
