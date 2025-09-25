import styled from "styled-components";
import { formatCurrency, formatTextCapitalize } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";

const BankDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  background-color: var(--color-grey-0);
  padding: 2rem 1rem;
  border-radius: 9px;
  position: relative;

  & h3 {
    position: absolute;
    right: 2rem;
    font-size: 1.8rem;
    color: var(--color-brand-700);
    font-weight: 600;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  }
`;

const EachBankDetailsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;

  & button {
    padding: 0.5rem 1.3rem;
    border: none;
    border-radius: 10px;
    font-size: 1.2rem;
    margin-top: 1rem;
    background-color: var(--color-brand-700);
    color: var(--color-grey-0);
  }
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

function WithdrawalHeaderAccount({
  personalData,
  bankAccount,
  bankName,
  balance,
}) {
  const navigate = useNavigate();

  const { fullName } = personalData || {};

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
        <button onClick={() => navigate("/app/bank/details")}>
          Change Bank
        </button>
      </EachBankDetailsContainer>

      <h3>{formatCurrency(balance)}</h3>
    </BankDetailsContainer>
  );
}

export default WithdrawalHeaderAccount;
