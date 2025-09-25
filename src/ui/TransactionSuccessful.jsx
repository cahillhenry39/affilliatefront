import styled from "styled-components";
import Headings from "./Headings";
import Button from "./Button";
import { Link } from "react-router-dom";

const SuccessfullTransaction = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 6rem auto;

  & img {
    width: 17rem;
    margin: 0 auto;
  }

  & p {
    font-size: 1.1rem;
    text-align: center;
    color: var(--color-brand-100);
  }
`;

const StytledButton = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

function TransactionSuccessful({
  headerMessage,
  footerMessage,
  linkHome,
  linkTransaction,
  generalButton,
  buttonHome,
  buttonTransaction,
}) {
  return (
    <SuccessfullTransaction>
      {headerMessage ? <Headings type="h2">{headerMessage}</Headings> : ""}

      <img src="/others/thumb1.png" />

      {footerMessage ? <p>{footerMessage}</p> : ""}

      {generalButton ? (
        <StytledButton>
          {buttonHome && (
            <Link to={linkHome}>
              <Button type="secondary">Go back home</Button>
            </Link>
          )}

          {buttonTransaction && (
            <Link to={linkTransaction}>
              <Button type="primary">go to transaction</Button>
            </Link>
          )}
        </StytledButton>
      ) : (
        ""
      )}
    </SuccessfullTransaction>
  );
}

export default TransactionSuccessful;
