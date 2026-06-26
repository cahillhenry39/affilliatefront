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

function WithdrawalTips({ showMini, setShowMini = () => {} }) {
  return (
    <>
      <StyledModalAddProduct
        $isShowing={showMini?.toString()}
      ></StyledModalAddProduct>

      <ModalReferralRules $isShowing={showMini?.toString()}>
        <StyledCloseIcon onClick={setShowMini} />

        <StyledFirstContent>
          <h3>💳 Withdrawal Tips</h3>

          <ParaContentUl>
            <li>
              <BoldPara>Progress First </BoldPara>
              &mdash; The{" "}
              <BoldPara>
                withdrawal button activates only when your progress bar reaches
                100%.
              </BoldPara>{" "}
              Each qualifying action adds to the bar.
            </li>

            <li>
              <BoldPara>Fast Processing </BoldPara>
              &mdash; Requests made on business days are
              <BoldPara>processed within 30 minutes. </BoldPara>
            </li>

            <li>
              <BoldPara>Automatic Reset </BoldPara>
              &mdash; After a successful withdrawal, your progress bar
              <BoldPara>resets to 0% </BoldPara>
              and starts growing again with new actions.
            </li>

            <li>
              <BoldPara>Weekend Requests </BoldPara>
              &mdash; Withdrawals placed on
              <BoldPara>Saturday or Sunday </BoldPara>
              will be
              <BoldPara>processed on Monday </BoldPara>
              (next business day).
            </li>

            <li>
              <BoldPara>Account Verification </BoldPara>
              &mdash; We only credit the
              <BoldPara> bank account already saved with us, </BoldPara>
              and it
              <BoldPara> must match your full name. </BoldPara>
            </li>

            <li>
              <BoldPara>Name Changes </BoldPara>
              &mdash; For any change of name, please
              <BoldPara> contact Support </BoldPara>
              and it
              <BoldPara> before requesting a withdrawal. </BoldPara>
            </li>
          </ParaContentUl>
        </StyledFirstContent>
      </ModalReferralRules>
    </>
  );
}

export default WithdrawalTips;
