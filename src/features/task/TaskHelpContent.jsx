import styled, { css } from "styled-components";
import { IoIosClose } from "react-icons/io";

const StyledModalAddProduct = styled.div`
  ${(props) =>
    props.$isShowing === "true"
      ? css`
          background-color: #000000a0;
          height: 100%;
          width: 100%;

          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          left: 0;
          z-index: 1000;
        `
      : css`
          display: none;
          position: unset;
        `}
`;

const ModalReferralRules = styled.div`
  background-color: var(--color-grey-0);
  border-radius: 11px;
  height: fit-content;
  width: 85%;
  padding: 4rem 2rem 4rem;

  position: absolute;
  top: 50%;
  right: 50%;

  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 5px 5px #00000040;

  opacity: 1;

  transition: all 0.61s;
  z-index: 1010;

  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0;
  }

  ${(props) =>
    props.$isShowing === "true"
      ? css`
          transform: translate(50%, -55%) scale(1);

          opacity: 1;
        `
      : css`
          transform: translate(50%, -50%) scale(0);

          opacity: 0;
        `}
`;

const StyledCloseIcon = styled(IoIosClose)`
  width: 2.5rem;
  height: 2.5rem;

  position: absolute;
  top: 1rem;
  right: 2rem;
`;

const StyledFirstContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 3rem;

  & h3 {
    font-size: 1.8rem;
    font-weight: 600;
  }

  & h4 {
    font-size: 1.6rem;
    font-weight: 600;
  }
`;

const ParaContent = styled.div`
  font-size: 1.3rem;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;

const ParaContentUl = styled.ul`
  font-size: 1.25rem;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-left: 1rem;

  & li {
    list-style: circle;
  }
`;

const BoldPara = styled.span`
  font-weight: 600;
`;

function TaskHelpContent({
  showMini,
  setShowMini = () => {},
  isOverDoneTask,
  isNotSubscribed,
}) {
  const isOver = isOverDoneTask && isNotSubscribed;

  return (
    <>
      <StyledModalAddProduct
        $isShowing={showMini?.toString()}
      ></StyledModalAddProduct>

      <ModalReferralRules $isShowing={showMini?.toString()}>
        <StyledCloseIcon onClick={setShowMini} />

        <StyledFirstContent>
          <h3>🌟 Unlock Full Access</h3>

          <ParaContent>
            {`Your free trial ${
              isOver ? "has ended" : "is ending soon"
            }. Subscribe now to`}
            <BoldPara>
              {" "}
              unlock bigger spins, exclusive tasks, and higher earnings.{" "}
            </BoldPara>
            Don&apos;t miss your chance to keep earning!
          </ParaContent>

          <h4>⚡⚡ You Get the Following ⚡⚡</h4>

          <ParaContentUl>
            <li>
              <BoldPara>More Spins & Bigger Rewards </BoldPara>
              &mdash; Paid plans give you
              <BoldPara> extra spin chances </BoldPara>
              and
              <BoldPara> higher reward ranges.</BoldPara>
            </li>

            <li>
              <BoldPara>Exclusive Tasks </BoldPara>
              &mdash; Access
              <BoldPara> lucrative tasks </BoldPara>
              available only to subscribers.
            </li>

            <li>
              <BoldPara>Higher Earnings Potential </BoldPara>
              &mdash; The more you subscribe, the
              <BoldPara> greater your daily earning power. </BoldPara>
            </li>

            <li>
              <BoldPara>Seamless Experience </BoldPara>
              &mdash; Continue using every feature
              <BoldPara> without interruptions.</BoldPara>
            </li>

            <ParaContent>
              <BoldPara>👉 Subscribe now </BoldPara>
              to stay active, grow your rewards, and enjoy premium privileges.
            </ParaContent>
          </ParaContentUl>
        </StyledFirstContent>
      </ModalReferralRules>
    </>
  );
}

export default TaskHelpContent;
