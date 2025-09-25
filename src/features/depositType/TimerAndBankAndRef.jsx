import { useEffect } from "react";
import { useCopyToClipboard } from "@uidotdev/usehooks";

import {
  HiClipboardDocument,
  HiMiniBanknotes,
  HiMiniHomeModern,
  HiMiniQrCode,
  HiMiniQueueList,
  HiMiniUser,
} from "react-icons/hi2";
import styled from "styled-components";
import toast from "react-hot-toast";
import TimerCountDown from "../../ui/TimerCountDown";
import { formatCurrency, getMinsAndSecs } from "../../utils/helpers";

const BankCardDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background-color: var(--color-grey-0);
  padding: 1.5rem 1.7rem 1rem;
  box-shadow: var(--shadow-md);
  border-radius: 9px;
`;

const TimerDiv = styled.div`
  border-bottom: 1px solid var(--color-grey-100);
  padding-bottom: 1rem;
`;

const TransacitonTitleHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.1rem;
  color: var(--color-brand-700);
  margin: 1rem 0;

  & div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  & p {
    font-weight: 600;
    font-size: 1.8rem;
  }

  & SVG {
    width: 2.5rem;
    height: 2.5rem;
  }

  & span {
    font-size: 1rem;
  }
`;

const NoticeWarning = styled.span`
  color: orangered;
`;

const SecondTransacitonTitleHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.1rem;

  & span {
    font-size: 1rem;
  }
`;

const AccountDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 3rem;
`;

const EachDetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.51rem 0;

  &:not(:last-of-type) {
    border-bottom: 1px solid var(--color-grey-50);
  }
`;

const LeftDetailContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.51rem;

  & p {
    font-size: 1.3rem;
    color: var(--color-grey-400);
    margin-top: 0.3rem;
  }

  & svg {
    width: 1.5rem;
    height: 1.5rem;
    color: var(--color-brand-700);
  }
`;

const RightDetailContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.51rem;

  & p {
    font-size: 1.4rem;
    color: var(--color-brand-700);
    margin-top: 0.3rem;
    font-weight: 600;
  }

  & svg {
    width: 1.5rem;
    height: 1.5rem;
    color: var(--color-brand-700);
  }
`;

const TransactioRef = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.4rem;
  font-weight: 600;
  text-transform: capitalize;
  background-color: var(--color-grey-0);
  padding: 1.5rem 1.7rem 1rem;
  box-shadow: var(--shadow-md);
  border-radius: 9px;

  & svg {
    width: 1.5rem;
    height: 1.5rem;
    color: var(--color-brand-700);
  }
`;

function TimerAndBankAndRef({ setTransactionError, transactionDdetails }) {
  const [copiedText, copyToClipboard] = useCopyToClipboard();
  const hasCopiedText = Boolean(copiedText);

  const {
    depositedAccountName,
    depositAccount,
    depositBank,
    reference,
    amount,
    created_at,
    userFullName,
  } = transactionDdetails || {};

  useEffect(
    function () {
      if (!reference || !amount) {
        setTransactionError(true);
      }
      if (hasCopiedText) toast.success(`${copiedText} copied`);
    },
    [reference, amount, setTransactionError, hasCopiedText, copiedText]
  );
  return (
    <>
      <BankCardDiv>
        <TimerDiv>
          <TransacitonTitleHeader>
            <div>
              <HiMiniHomeModern />
              <p>Bank Transfer Details</p>
            </div>
            <NoticeWarning>
              {userFullName?.split(" ")?.[0]}, do not refresh this page.
            </NoticeWarning>
          </TransacitonTitleHeader>
        </TimerDiv>

        <AccountDiv>
          <EachDetailContainer>
            <LeftDetailContainer>
              <HiMiniHomeModern />

              <p>Bank Name</p>
            </LeftDetailContainer>

            <RightDetailContainer>
              <p>{depositBank}</p>
            </RightDetailContainer>
          </EachDetailContainer>

          <EachDetailContainer>
            <LeftDetailContainer>
              <HiMiniUser />
              <p>Account Name</p>
            </LeftDetailContainer>

            <RightDetailContainer>
              <p>{depositedAccountName}</p>
            </RightDetailContainer>
          </EachDetailContainer>
          <EachDetailContainer>
            <LeftDetailContainer>
              <HiMiniQrCode />
              <p>Account Number</p>
            </LeftDetailContainer>

            <RightDetailContainer>
              <p>{depositAccount}</p>
              <HiClipboardDocument
                onClick={() => copyToClipboard(depositAccount)}
              />
            </RightDetailContainer>
          </EachDetailContainer>
          <EachDetailContainer>
            <LeftDetailContainer>
              <HiMiniBanknotes />
              <p>Amount</p>
            </LeftDetailContainer>

            <RightDetailContainer>
              <p>{formatCurrency(amount)}</p>
              <HiClipboardDocument onClick={() => copyToClipboard(amount)} />
            </RightDetailContainer>
          </EachDetailContainer>

          <SecondTransacitonTitleHeader>
            <span>
              {" "}
              Expires in
              <TimerCountDown
                dateTime={getMinsAndSecs(created_at, 30)}
                onFinished={setTransactionError}
              />{" "}
            </span>
          </SecondTransacitonTitleHeader>
        </AccountDiv>
      </BankCardDiv>

      <TransactioRef>
        <LeftDetailContainer>
          <HiMiniQueueList />
          <p>Ref</p>
        </LeftDetailContainer>

        <RightDetailContainer>
          <p>{reference}</p>
          <HiClipboardDocument onClick={() => copyToClipboard(reference)} />
        </RightDetailContainer>
      </TransactioRef>
    </>
  );
}

export default TimerAndBankAndRef;
