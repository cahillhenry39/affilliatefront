import styled, { css } from "styled-components";
import Head from "./Head";
import { useHeaderAndDark } from "../services/useHeaderAndDark";
import ReadyToJoin from "./ReadyToJoin";
import Subscribe from "./Subscribe";
import Headings from "./Headings";
import Button from "./Botton";
import { Link } from "react-router-dom";
import { device } from "../../mediaQuery";

const StyledMobileUse = styled.div`
  background-color: var(--color-grey-50);
  /* padding-bottom: 8rem; */

  ${(props) =>
    props.type === "false"
      ? css`
          background-image: url("/images/vectors/background.jpg");
        `
      : css`
          background-image: none;
        `}
`;

const MobileAppView = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.8fr;
  gap: 2.5rem;
  padding: 6rem 10rem;

  @media ${device.tablet} {
    padding: 2rem 3rem;
  }

  @media ${device.mobileL} {
    grid-template-columns: 1fr;
    padding: 2rem 1rem;
  }
`;

const SectionLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* gap: 0.5rem; */

  max-width: 50rem;

  & button {
    margin-top: 1.5rem;
  }
`;

const ImageContainer = styled.div``;

function MobileUse() {
  const { isDarkMode, showHead } = useHeaderAndDark();

  return (
    <StyledMobileUse type={isDarkMode.toString()}>
      <Head />

      {showHead && <Head secondary={true.toString()} />}

      <MobileAppView>
        <SectionLeft>
          <Headings type="h2">You Can get our mobile app soon. </Headings>

          <p>Google playstore | Apple playstore</p>

          <Link to="/">
            <Button type="primary">Go home</Button>
          </Link>
        </SectionLeft>

        <ImageContainer>
          <img src="/images/mobileFix.jpg" />
        </ImageContainer>
      </MobileAppView>

      <ReadyToJoin isDarkMode={isDarkMode} />
      <Subscribe isDarkMode={isDarkMode} />
    </StyledMobileUse>
  );
}

export default MobileUse;
