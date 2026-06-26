import { useEffect, useState } from "react";
import styled, { css } from "styled-components";

const EachHMODetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & p {
    font-size: 1.3rem;
    color: var(--color-grey-800);
  }

  & span {
    font-size: 1.1rem;
    color: var(--color-grey-600);
  }
`;

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1rem;
  width: 100%;
`;

const StatusToggleContainerMain = styled.div`
  width: 4rem;
  height: 2rem;
  border-radius: 11px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0rem 0.3rem;

  cursor: pointer;

  ${(props) =>
    props.$isActive === "true"
      ? css`
          background-color: var(--color-brand-800);
        `
      : css`
          background-color: ${props.$inActiveColor || "#ff4501"};
        `}
`;

const InActiveToggleDiv = styled.div`
  background-color: var(--color-grey-50);
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 11px;

  transition: all 0.5s;

  ${(props) =>
    props.$isActive === "true"
      ? css`
          opacity: 0;
        `
      : css`
          opacity: 1;
        `}
`;

const ActiveToggleDiv = styled.div`
  background-color: #fff;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 11px;

  transition: all 0.5s;

  ${(props) =>
    props.$isActive === "true"
      ? css`
          opacity: 1;
        `
      : css`
          opacity: 0;
        `}
`;

function ToggleButton({
  title,
  onChange = () => {},
  toggleTextArray = [],
  currentState = true,
  mainDirection,
  inActiveColor = "",
}) {
  const [isActive, setIsActive] = useState(currentState);

  useEffect(() => {
    setIsActive(currentState);
  }, [setIsActive, currentState]);

  return (
    <EachHMODetails>
      {title && <p>{title}</p>}

      {mainDirection ? (
        <StatusContainer>
          <span>{toggleTextArray?.length ? toggleTextArray?.[0] : "Done"}</span>
          <StatusToggleContainerMain
            $isActive={isActive ? "true" : "false"}
            onClick={() => {
              setIsActive((val) => {
                onChange(!val);
                return !val;
              });
            }}
            $inActiveColor={inActiveColor}
          >
            <InActiveToggleDiv
              $isActive={isActive ? "true" : "false"}
            ></InActiveToggleDiv>
            <ActiveToggleDiv
              $isActive={isActive ? "true" : "false"}
            ></ActiveToggleDiv>
          </StatusToggleContainerMain>

          <span>
            {toggleTextArray?.length ? toggleTextArray?.[1] : "Not Done"}
          </span>
        </StatusContainer>
      ) : (
        <StatusContainer>
          <span></span>
          <StatusToggleContainerMain
            $isActive={isActive ? "true" : "false"}
            onClick={() => {
              setIsActive((val) => {
                onChange(!val);
                return !val;
              });
            }}
          >
            <InActiveToggleDiv
              $isActive={isActive ? "true" : "false"}
            ></InActiveToggleDiv>
            <ActiveToggleDiv
              $isActive={isActive ? "true" : "false"}
            ></ActiveToggleDiv>
          </StatusToggleContainerMain>

          <span>
            {toggleTextArray?.length ? toggleTextArray?.[1] : "Convert"}
          </span>
        </StatusContainer>
      )}
    </EachHMODetails>
  );
}

export default ToggleButton;
