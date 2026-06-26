import {
  IoLogoFacebook,
  IoLogoGoogle,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoSkype,
  IoLogoSnapchat,
  IoLogoWhatsapp,
  IoLogoYoutube,
} from "react-icons/io";
import styled, { css, keyframes } from "styled-components";
import { useDarkMode } from "../../context/DarkModeContext";

const rotateLeft = keyframes`
  to {
    transform: rotate(-1turn)
  }
`;

const rotateRight = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const ThirdToLast = styled.div`
  width: 25rem;
  height: 25rem;
  border-radius: 50%;
  font-size: 1.4rem;
  border: 2px solid var(--color-brand-700);
  padding: 2rem;

  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  animation: ${rotateLeft} 20.5s infinite linear;

  & svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  ${(props) =>
    props.$isDarkMode === "true" &&
    css`
      border: 2px solid var(--color-brand-100);
    `}
`;

const FaceBookSvg = styled.div`
  background-color: var(--color-brand-700);
  padding: 0.51rem;
  border-radius: 50%;
  color: var(--color-brand-100);

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: -1rem;
  right: 7rem;
  animation: ${rotateLeft} 5.5s infinite linear;
`;

const GoogleSvg = styled.div`
  background-color: var(--color-brand-700);
  padding: 0.51rem;
  border-radius: 50%;
  color: var(--color-brand-100);

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 0rem;
  right: 17rem;
  animation: ${rotateRight} 7.5s infinite linear;
`;

const LinkedInSvg = styled.div`
  background-color: var(--color-brand-700);
  padding: 0.51rem;
  border-radius: 50%;
  color: var(--color-brand-100);

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 7rem;
  right: 23rem;
  animation: ${rotateLeft} 10.5s infinite linear;
`;

const InstagramSvg = styled.div`
  background-color: var(--color-brand-700);
  padding: 0.51rem;
  border-radius: 50%;
  color: var(--color-brand-100);

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 17rem;
  right: 22rem;
  animation: ${rotateRight} 7.5s infinite linear;
`;

const SkypeSvg = styled.div`
  background-color: var(--color-brand-700);
  padding: 0.51rem;
  border-radius: 50%;
  color: var(--color-brand-100);

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 23rem;
  right: 15rem;
  animation: ${rotateLeft} 5.5s infinite linear;
`;
const SnapChatSvg = styled.div`
  background-color: var(--color-brand-700);
  padding: 0.51rem;
  border-radius: 50%;
  color: var(--color-brand-100);

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  bottom: 0rem;
  left: 17rem;
  animation: ${rotateRight} 10.5s infinite linear;
`;

const WhatsAppSvg = styled.div`
  background-color: var(--color-brand-700);
  padding: 0.51rem;
  border-radius: 50%;
  color: var(--color-brand-100);

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  bottom: 7rem;
  left: 23rem;
  animation: ${rotateLeft} 7.5s infinite linear;
`;

const YouTubeSvg = styled.div`
  background-color: var(--color-brand-700);
  padding: 0.51rem;
  border-radius: 50%;
  color: var(--color-brand-100);

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  bottom: 17rem;
  left: 22rem;
  animation: ${rotateRight} 5.5s infinite linear;
`;

function FirstCircle({ children }) {
  const { isDarkMode } = useDarkMode();

  return (
    <ThirdToLast $isDarkMode={isDarkMode.toString()}>
      {" "}
      <FaceBookSvg>
        <IoLogoFacebook />
      </FaceBookSvg>
      <GoogleSvg>
        <IoLogoGoogle />
      </GoogleSvg>
      <LinkedInSvg>
        <IoLogoLinkedin />
      </LinkedInSvg>
      <InstagramSvg>
        <IoLogoInstagram />
      </InstagramSvg>
      <SkypeSvg>
        <IoLogoSkype />
      </SkypeSvg>
      <SnapChatSvg>
        <IoLogoSnapchat />
      </SnapChatSvg>
      <WhatsAppSvg>
        <IoLogoWhatsapp />
      </WhatsAppSvg>
      <YouTubeSvg>
        <IoLogoYoutube />
      </YouTubeSvg>
      {children}
    </ThirdToLast>
  );
}

export default FirstCircle;
