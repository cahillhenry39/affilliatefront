import styled, { keyframes } from "styled-components";
import { formatCurrency } from "../../utils/helpers";

const scrolling = keyframes`



  from {
    /* -moz-transform: translateY(100%);
    -webkit-transform: translateY(100%); */
    transform: translateY(-0%);
  }
  to {
    /* -moz-transform: translateY(-100%);
    -webkit-transform: translateY(-100%); */
    transform: translatex(calc(-100% - 1rem));
  }

`;

const EachTestimony = styled.li`
  display: grid;
  grid-template-columns: 0.2fr 1fr 0.3fr;
  column-gap: 1rem;

  /* -moz-transform: translateY(100%);
  -webkit-transform: translateY(100%); */
  /* transform: translateY(100%); */
  /* animation: ${scrolling} 5s linear infinite; */

  & p {
    font-size: 1rem;
  }

  & div {
    display: flex;
    flex-direction: column;

    & p {
      font-size: 1.2rem;
    }
  }
`;

const ImageDiv = styled.div`
  & img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    border: 2px solid var(--color-brand-700);

    box-shadow: var(--shadow-md);
  }
`;

const CongratulationPara = styled.p`
  color: var(--color-grey-700);
`;

const MessagePara = styled.p`
  color: var(--color-grey-400);
`;

const SpanAmount = styled.span`
  color: var(--color-grey-700);
  font-weight: 600;
`;

function EachActivity({ activity }) {
  const { usersPhoneNum, avatar, amount, message } = activity;

  // there is type

  return (
    <>
      <EachTestimony>
        <ImageDiv>
          <img src={`${avatar ? avatar : "/main/badGuy.jpg"}`} />
        </ImageDiv>
        <div>
          <CongratulationPara>
            Congratulations {usersPhoneNum?.slice(0, 4) + "******"}
          </CongratulationPara>
          <MessagePara>{message}</MessagePara>
        </div>

        <p>
          Earns <SpanAmount>{formatCurrency(amount)}</SpanAmount>
        </p>
      </EachTestimony>
    </>
  );
}

export default EachActivity;
