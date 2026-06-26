import styled, { css, keyframes } from "styled-components";
import {
  IoIosAppstore,
  IoLogoApple,
  IoLogoPlaystation,
  IoLogoVimeo,
  IoLogoWindows,
  IoMdAppstore,
} from "react-icons/io";
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

const SecondToLast = styled.div`
  width: 20rem;
  height: 20rem;
  border-radius: 50%;
  font-size: 1.4rem;
  border: 2px solid var(--color-brand-700);

  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${rotateRight} 10.5s infinite linear;

  position: relative;

  ${(props) =>
    props.$isDarkMode === "true" &&
    css`
      border: 2px solid var(--color-brand-200);
    `}
`;

const PlayStoreSvg = styled.div`
  background-color: var(--color-brand-700);
  padding: 0.51rem;
  border-radius: 50%;
  color: var(--color-brand-100);
  /* width: 3rem; */
  /* height: 3rem; */

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 0rem;
  right: 4rem;
  animation: ${rotateLeft} 10.5s infinite linear;

  & svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const WindowsSvg = styled.div`
  background-color: var(--color-brand-700);
  padding: 0.51rem;
  border-radius: 50%;
  color: var(--color-brand-100);
  /* width: 3rem; */
  /* height: 3rem; */

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 0rem;
  left: 4rem;
  animation: ${rotateRight} 10.5s infinite linear;

  & svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const AppleSvg = styled.div`
  background-color: var(--color-brand-700);
  padding: 0.51rem;
  border-radius: 50%;
  color: var(--color-brand-100);
  /* width: 3rem; */
  /* height: 3rem; */

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 8rem;
  right: -1rem;
  animation: ${rotateLeft} 7.5s infinite linear;

  & svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const PlaystationSvg = styled.div`
  background-color: var(--color-brand-700);
  padding: 0.51rem;
  border-radius: 50%;
  color: var(--color-brand-100);
  /* width: 3rem; */
  /* height: 3rem; */

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  bottom: 0rem;
  right: 4rem;
  animation: ${rotateRight} 10.5s infinite linear;

  & svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const AppleLapiSvg = styled.div`
  background-color: var(--color-brand-700);
  padding: 0.51rem;
  border-radius: 50%;
  color: var(--color-brand-100);
  /* width: 3rem; */
  /* height: 3rem; */

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  bottom: 0rem;
  left: 4rem;
  animation: ${rotateLeft} 10.5s infinite linear;

  & svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const VimoSvg = styled.div`
  background-color: var(--color-brand-700);
  padding: 0.51rem;
  border-radius: 50%;
  color: var(--color-brand-100);
  /* width: 3rem; */
  /* height: 3rem; */

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 8rem;
  left: -1rem;
  animation: ${rotateRight} 7.5s infinite linear;

  & svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

function SecondCircle() {
  const { isDarkMode } = useDarkMode();

  return (
    <SecondToLast $isDarkMode={isDarkMode.toString()}>
      <PlayStoreSvg>
        <IoMdAppstore />
      </PlayStoreSvg>

      <WindowsSvg>
        <IoLogoWindows />
      </WindowsSvg>

      <AppleSvg>
        <IoIosAppstore />
      </AppleSvg>

      <PlaystationSvg>
        <IoLogoPlaystation />
      </PlaystationSvg>

      <AppleLapiSvg>
        <IoLogoApple />
      </AppleLapiSvg>

      <VimoSvg>
        <IoLogoVimeo />
      </VimoSvg>
    </SecondToLast>
  );
}

export default SecondCircle;
