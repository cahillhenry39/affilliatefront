import { Link, useNavigate, useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Button from "../../ui/Button";
import InfinityLoading from "../../ui/InfinityLoading";
import { HiCheckBadge, HiCog8Tooth } from "react-icons/hi2";
import Spinner from "../../ui/Spinner";
import { useGetATransaction } from "../../features/transaction/useTransaction";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useUser from "../../features/authentication/useUser";
const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const StytledDepositSuccess = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 6rem auto;

  overflow-y: scroll;
  height: 90vh;

  &::-webkit-scrollbar {
    width: 0rem;
  }
`;

const Para = styled.p`
  font-size: 1.1rem;
  max-width: 32rem;
  margin: 0 auto;

  text-align: center;
  text-transform: uppercase;
  color: var(--color-brand-900);
`;

const ParaSecond = styled.p`
  font-size: 1.1rem;
  max-width: 32rem;
  margin: 0 auto;

  text-align: center;
  text-transform: uppercase;
  color: var(--color-brand-700);
`;

const StytledAnimatedLineDiv = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1fr 0.6fr;
  column-gap: 1rem;
  justify-items: center;
  align-items: center;

  & p {
    font-weight: 600 !important;
  }
`;

const AccountDetailsDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border: 1.5px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  padding: 2rem;
  gap: 1rem;
  box-shadow: 1px 2px 4px #0000001c;

  & div {
    border-radius: 1px;
    border: 1px solid var(--color-grey-100);
    background-color: var(--color-grey-10);
    padding: 1rem;

    & p {
      font-size: 1.2rem;
      font-weight: 600;
    }

    & span {
      font-size: 1.1rem;
    }
  }
`;

const EachStatus = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AnimationDiv = styled.div`
  position: relative;
  width: 100%;
`;

const SvgNormLDiv = styled.div`
  & svg {
    width: 3rem;
    height: 3rem;
    color: var(--color-brand-700);
  }
`;

const SVGDiv = styled.div`
  & svg {
    width: 3rem;
    height: 3rem;
    color: var(--color-grey-700);
    animation: ${rotate} 2.5s infinite linear;
  }
`;

const StytledButton = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

const SuccessfulDepositTransaction = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  & img {
    width: 17rem;
    margin: 0 auto;
  }

  & p {
    font-size: 1.2rem;
    padding: 0 2rem;
    text-align: center;
    color: var(--color-brand-700);
  }
`;

function DepositSuccessful() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [paymentReceived, setReceived] = useState(false);

  const {
    data: {
      user_metadata: {
        personal: { fullName },
      },
    },
  } = useUser();

  const { id } = useParams();
  const { aTransactions, isLoading } = useGetATransaction(id);
  const {
    depositAccount,
    depositBank,
    depositedAccountName,
    isPaid,
    isSubmitted,
    reference,
    status,
  } = aTransactions || {};

  useEffect(
    function () {
      const queryTimeOut = setInterval(() => {
        queryClient.invalidateQueries();


        if (isSubmitted === false) {
          navigate("/", { replace: true });
          return;
        }
        if (isSubmitted && isPaid && status === "success") {
          setReceived(true);
        }
      }, 4000);

      return () => clearInterval(queryTimeOut);
    },
    [
      isPaid,
      status,
      queryClient,
      navigate,
      isSubmitted,
      paymentReceived,
      setReceived,
    ]
  );

  if (isLoading) return <Spinner />;

  return (
    <StytledDepositSuccess>
      <StytledAnimatedLineDiv>
        <EachStatus>
          <SvgNormLDiv>
            <HiCheckBadge />
          </SvgNormLDiv>
          <Para>submited</Para>
        </EachStatus>

        {paymentReceived ? (
          <h3>Successful</h3>
        ) : (
          <AnimationDiv>
            <InfinityLoading />
          </AnimationDiv>
        )}

        <EachStatus>
          {paymentReceived ? (
            <SvgNormLDiv>
              <HiCheckBadge />
            </SvgNormLDiv>
          ) : (
            <SVGDiv>
              <HiCog8Tooth />
            </SVGDiv>
          )}
          {paymentReceived ? <Para>received</Para> : <Para>awaiting</Para>}
        </EachStatus>
      </StytledAnimatedLineDiv>

      {!paymentReceived ? (
        <>
          <img src="/confirmTransaction.jpg" />

          <AccountDetailsDiv>
            <div>
              <p>Name</p>
              <span>{depositedAccountName}</span>
            </div>

            <div>
              <p>Bank</p>
              <span>{depositBank}</span>
            </div>
            <div>
              <p>Account</p>
              <span>{depositAccount}</span>
            </div>
            <div>
              <p>ref</p>
              <span>{reference}</span>
            </div>
          </AccountDetailsDiv>

          <ParaSecond>
            We are still waiting for your transaction to arrive. The moment it
            arrive, we will credit you immediately.
          </ParaSecond>

          <StytledButton>
            <Link to="/app">
              <Button type="primary">You can go back home</Button>
            </Link>
          </StytledButton>
        </>
      ) : (
        <SuccessfulDepositTransaction>
          <img src="/others/thumb1.png" />

          <p>
            {fullName?.split(" ")?.[0]?.toUpperCase()}, we have received your
            deposit transaction and have credited your account.
          </p>

          <StytledButton>
            <Link to="/app">
              <Button type="primary">go home</Button>
            </Link>
          </StytledButton>
        </SuccessfulDepositTransaction>
      )}
    </StytledDepositSuccess>
  );
}

export default DepositSuccessful;
