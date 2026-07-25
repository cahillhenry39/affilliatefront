import styled, { keyframes } from "styled-components";
import { formatDateOnly } from "../../utils/helpers";

const scrolling = keyframes`



  from {
    /* -moz-transform: translateY(100%);
    -webkit-transform: translateY(100%); */
    transform: translatex(0%);
  }
  to {
    /* -moz-transform: translateY(-100%);
    -webkit-transform: translateY(-100%); */
    transform: translatex(calc(-100% - 1rem));
  }

`;

const scrollingRight = keyframes`

  from {
    /* -moz-transform: translateY(100%);
    -webkit-transform: translateY(100%); */
    transform: translatex(-100%);
  }
  to {
    /* -moz-transform: translateY(-100%);
    -webkit-transform: translateY(-100%); */
    transform: translatex(calc(0% - 1rem));
  }

`;

const AfiiliateDiv = styled.div`
  display: flex;
  overflow: hidden;
  position: relative;
  user-select: none;
  /* flex-direction: column; */
  gap: 1rem;
`;

const ImageDivMarquee = styled.div`
  flex-shrink: 0;
  display: flex;
  justify-content: space-around;
  min-width: 100%;
  gap: 1rem;
  animation: ${scrolling} 27s infinite linear;

  & img {
    width: 3rem;
    height: 3rem;
  }
`;

const AfiiliateDiv2 = styled.div`
  display: flex;
  overflow: hidden;
  position: relative;
  user-select: none;
  /* flex-direction: column; */
  gap: 1rem;
`;

const ImageDivMarqueeRight = styled.div`
  flex-shrink: 0;
  display: flex;
  justify-content: space-around;
  min-width: 100%;
  gap: 1rem;
  animation: ${scrollingRight} 22s infinite linear;

  & img {
    width: 3rem;
    height: 3rem;
  }
`;

const MessageContainer = styled.div`
  background-color: var() (--color-grey-10);
  border: 1px solid var(--color-grey-50);
  border-radius: 11px;
  padding: 1rem 1.2rem;

  font-size: 1.1rem;
`;

function ReferralHistoryMaquee({ pastRewards = [] }) {
  return (
    <>
      {!pastRewards?.length ? (
        ""
      ) : (
        <AfiiliateDiv>
          <ImageDivMarquee>
            {pastRewards?.map((each, i) => {
              const { prizeGiven, usersEmail, created_at } = each;

              return (
                <MessageContainer key={i}>
                  <span>{`User with email address`} </span>
                  <span
                    style={{
                      color: "var(--color-brand-800)",
                    }}
                  >
                    {usersEmail}{" "}
                  </span>
                  <span
                    style={{
                      color: "orangered",
                    }}
                  >
                    {`won`}{" "}
                  </span>
                  <span
                    style={{
                      color: "var(--color-brand-800)",
                    }}
                  >
                    {prizeGiven}{" "}
                  </span>

                  <span>{` on ${formatDateOnly(created_at)}`} </span>
                </MessageContainer>
              );
            })}
          </ImageDivMarquee>

          <ImageDivMarquee>
            {pastRewards?.map((each, i) => {
              const { prizeGiven, usersEmail, created_at } = each;

              return (
                <MessageContainer key={i}>
                  <span>{`User with email address`} </span>
                  <span
                    style={{
                      color: "var(--color-brand-800)",
                    }}
                  >
                    {usersEmail}{" "}
                  </span>
                  <span
                    style={{
                      color: "orangered",
                    }}
                  >
                    {`won`}{" "}
                  </span>
                  <span
                    style={{
                      color: "var(--color-brand-800)",
                    }}
                  >
                    {prizeGiven}{" "}
                  </span>

                  <span>{` on ${formatDateOnly(created_at)}`} </span>
                </MessageContainer>
              );
            })}
          </ImageDivMarquee>
        </AfiiliateDiv>
      )}
    </>
  );
}

export default ReferralHistoryMaquee;
