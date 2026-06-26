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
          z-index: 99;
        `
      : css`
          display: none;
          position: unset;
        `}
`;

const ModalReferralRules = styled.div`
  background-color: var(--color-grey-0);
  border-radius: 11px;
  height: 80vh;
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
  z-index: 100;

  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0;
  }

  ${(props) =>
    props.$isShowing === "true"
      ? css`
          transform: translate(50%, -50%) scale(1);

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

function SpinnerRewardTips({ showMini, setShowMini = () => {} }) {
  return (
    <>
      <StyledModalAddProduct
        $isShowing={showMini?.toString()}
      ></StyledModalAddProduct>

      <ModalReferralRules $isShowing={showMini?.toString()}>
        <StyledCloseIcon onClick={setShowMini} />

        <StyledFirstContent>
          <h3>🎯 Spinner Wheel Rules</h3>

          <ParaContent>
            While working with <BoldPara>Task It </BoldPara> with your friends
            and colleagues! Await massive rewards when you complete unique
            actions.
          </ParaContent>

          <ParaContentUl>
            <li>
              <BoldPara>One Spin Per Action </BoldPara>
              &mdash; Each qualifying action gives you
              <BoldPara> one spin only.</BoldPara>
            </li>

            <li>
              <BoldPara>Dynamic Rewards </BoldPara>
              &mdash; The wheel has
              <BoldPara> 6 segments</BoldPara> with rewards that vary in value.
            </li>

            <li>
              <BoldPara>Referral Bonus </BoldPara>
              &mdash; When someone you refer subscribes to a package, you earn a
              spin.{" "}
              <BoldPara>
                {" "}
                Higher-priced packages unlock bigger reward ranges.
              </BoldPara>
            </li>

            <li>
              <BoldPara>Welcome Spin </BoldPara>
              &mdash; New users who sign up without subscribing receive{" "}
              <BoldPara> one spin with small random rewards.</BoldPara>
            </li>

            <li>
              <BoldPara>Stock Purchase Spin </BoldPara>
              &mdash; Each stock purchase earns a spin. Reward size scales with
              the <BoldPara>purchase amount. </BoldPara>
            </li>

            <li>
              <BoldPara>Single Use </BoldPara>
              &mdash; Spins cannot be transferred or exchanged for cash.
            </li>

            <li>
              <BoldPara>Use It or Lose It </BoldPara>
              &mdash; Spins will expire if not used within 7 days of issuance.
            </li>
          </ParaContentUl>
        </StyledFirstContent>
      </ModalReferralRules>
    </>
  );
}

export default SpinnerRewardTips;
