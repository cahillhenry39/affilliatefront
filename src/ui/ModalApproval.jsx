import styled from "styled-components";
import Button from "./Botton";
import { formatCurrency } from "../utils/helpers";
// import TransactionButton from "./TransactionButton";
import SpinnerAndText from "./SpinnerAndText";
import SpinnerMini from "./SpinnerMini";
import { Link } from "react-router-dom";

const StyledModalApproval = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding: 2.5rem 2rem;
  max-width: 40rem;
`;

const StyledButton = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
`;

function ModalApproval({
  onCloseModal,
  myFunction,
  isWorking,
  status,
  text,
  amount,
}) {
  return (
    <>
      {!status ? (
        <StyledModalApproval>
          {` Confirm that you want to ${text}`}
          <StyledButton>
            <Button type="reset" onClick={onCloseModal}>
              cancel
            </Button>

            <Button type="primary" onClick={myFunction}>
              {isWorking ? (
                <SpinnerAndText>
                  <SpinnerMini /> processing...
                </SpinnerAndText>
              ) : (
                "confirm"
              )}
            </Button>
          </StyledButton>
        </StyledModalApproval>
      ) : (
        <StyledModalApproval>
          {` Your balance is low. You have ${formatCurrency(
            amount
          )} as balance.`}
          <StyledButton>
            <Link to="/app">
              <Button type="primary">Top up to give this loan</Button>
            </Link>
          </StyledButton>
        </StyledModalApproval>
      )}
    </>
  );
}

export default ModalApproval;
