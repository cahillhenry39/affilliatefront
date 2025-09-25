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
          z-index: 10;
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
  z-index: 10;

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

function ReferralRulesModal({ showMini, setShowMini = () => {} }) {
  return (
    <>
      <StyledModalAddProduct
        $isShowing={showMini?.toString()}
      ></StyledModalAddProduct>

      <ModalReferralRules $isShowing={showMini?.toString()}>
        <StyledCloseIcon onClick={setShowMini} />

        <StyledFirstContent>
          <h3>Referral Rules</h3>

          <ParaContent>
            We&apos;re excited to have you share <BoldPara>Task It </BoldPara>{" "}
            with your friends and colleagues! To keep things fair and simple,
            here are the rules for earning from referrals:
          </ParaContent>

          <ParaContentUl>
            <li>
              <BoldPara>One-Time Reward </BoldPara>
              &mdash; You earn a referral bonus only from your invitee&apos;s{" "}
              <BoldPara>first subscription payment.</BoldPara>
            </li>

            <li>
              <BoldPara>Unique Referral Link </BoldPara>
              &mdash; Each person must register using your unique referral link
              or code. Without it, the referral cannot be tracked.
            </li>

            <li>
              <BoldPara>New Users Only </BoldPara>
              &mdash; Referral rewards apply only when inviting someone who has
              never had a Task It account before.
            </li>

            <li>
              <BoldPara>No Self-Referrals </BoldPara>
              &mdash; You cannot refer yourself or create duplicate accounts.
              Any such attempts will be disqualified.
            </li>

            <li>
              <BoldPara>Valid Payment </BoldPara>
              &mdash; Rewards are only granted when the referred user completes
              a successful, paid subscription (free trials do not count).
            </li>

            <li>
              <BoldPara>Transparency </BoldPara>
              &mdash; Task It reserves the right to review, approve, or deny
              referral rewards if unusual or fraudulent activity is detected.
            </li>
          </ParaContentUl>

          <ParaContent>
            ✨ In short:{" "}
            <BoldPara>
              Refer someone, they subscribe, you earn once — simple and
              rewarding.{" "}
            </BoldPara>
          </ParaContent>
        </StyledFirstContent>
      </ModalReferralRules>
    </>
  );
}

export default ReferralRulesModal;
