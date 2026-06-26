import styled, { keyframes } from "styled-components";

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

function LogoMarquee({ double }) {
  return (
    <>
      <AfiiliateDiv>
        <ImageDivMarquee>
          <img src="/logos/1.png" alt="logo marketing" />
          <img src="/logos/2.png" alt="logo marketing" />
          <img src="/logos/3.png" alt="logo marketing" />
          <img src="/logos/4.png" alt="logo marketing" />
          <img src="/logos/5.png" alt="logo marketing" />
          <img src="/logos/6.png" alt="logo marketing" />
          <img src="/logos/7.png" alt="logo marketing" />
          <img src="/logos/8.png" alt="logo marketing" />
          <img src="/logos/9.png" alt="logo marketing" />
          <img src="/logos/10.png" alt="logo marketing" />
          <img src="/logos/11.png" alt="logo marketing" />
          <img src="/logos/12.png" alt="logo marketing" />
          <img src="/logos/13.png" alt="logo marketing" />
          <img src="/logos/14.png" alt="logo marketing" />
          <img src="/logos/15.png" alt="logo marketing" />
        </ImageDivMarquee>

        <ImageDivMarquee>
          <img src="/logos/1.png" alt="logo marketing" />
          <img src="/logos/2.png" alt="logo marketing" />
          <img src="/logos/3.png" alt="logo marketing" />
          <img src="/logos/4.png" alt="logo marketing" />
          <img src="/logos/5.png" alt="logo marketing" />
          <img src="/logos/6.png" alt="logo marketing" />
          <img src="/logos/7.png" alt="logo marketing" />
          <img src="/logos/8.png" alt="logo marketing" />
          <img src="/logos/9.png" alt="logo marketing" />
          <img src="/logos/10.png" alt="logo marketing" />
          <img src="/logos/11.png" alt="logo marketing" />
          <img src="/logos/12.png" alt="logo marketing" />
          <img src="/logos/13.png" alt="logo marketing" />
          <img src="/logos/14.png" alt="logo marketing" />
          <img src="/logos/15.png" alt="logo marketing" />
        </ImageDivMarquee>
      </AfiiliateDiv>

      {double ? (
        <AfiiliateDiv2>
          <ImageDivMarqueeRight>
            <img src="/logos/1.png" alt="logo marketing" />
            <img src="/logos/2.png" alt="logo marketing" />
            <img src="/logos/3.png" alt="logo marketing" />
            <img src="/logos/4.png" alt="logo marketing" />
            <img src="/logos/5.png" alt="logo marketing" />
            <img src="/logos/6.png" alt="logo marketing" />
            <img src="/logos/7.png" alt="logo marketing" />
            <img src="/logos/8.png" alt="logo marketing" />
            <img src="/logos/9.png" alt="logo marketing" />
            <img src="/logos/10.png" alt="logo marketing" />
            <img src="/logos/11.png" alt="logo marketing" />
            <img src="/logos/12.png" alt="logo marketing" />
            <img src="/logos/13.png" alt="logo marketing" />
            <img src="/logos/14.png" alt="logo marketing" />
            <img src="/logos/15.png" alt="logo marketing" />
          </ImageDivMarqueeRight>

          <ImageDivMarqueeRight>
            <img src="/logos/1.png" alt="logo marketing" />
            <img src="/logos/2.png" alt="logo marketing" />
            <img src="/logos/3.png" alt="logo marketing" />
            <img src="/logos/4.png" alt="logo marketing" />
            <img src="/logos/5.png" alt="logo marketing" />
            <img src="/logos/6.png" alt="logo marketing" />
            <img src="/logos/7.png" alt="logo marketing" />
            <img src="/logos/8.png" alt="logo marketing" />
            <img src="/logos/9.png" alt="logo marketing" />
            <img src="/logos/10.png" alt="logo marketing" />
            <img src="/logos/11.png" alt="logo marketing" />
            <img src="/logos/12.png" alt="logo marketing" />
            <img src="/logos/13.png" alt="logo marketing" />
            <img src="/logos/14.png" alt="logo marketing" />
            <img src="/logos/15.png" alt="logo marketing" />
          </ImageDivMarqueeRight>
        </AfiiliateDiv2>
      ) : (
        ""
      )}
    </>
  );
}

export default LogoMarquee;
