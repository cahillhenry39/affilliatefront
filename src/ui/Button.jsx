import styled, { css } from "styled-components";
import { device } from "../../mediaQuery";

const StyleBotton = styled.button`
  text-transform: uppercase;
  font-weight: 600;
  border: none;
  border-radius: var(--border-radius-sm);
  color: var(--color-brand-100);

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  & svg {
    width: 2rem;
    height: 2rem;
  }

  ${(props) =>
    props.type === "primary" &&
    css`
      background-color: var(--color-brand-700);
      color: var(--color-brand-50);

      font-size: 1.4rem;
      padding: 1rem 1.6rem;

      &:hover {
        background-color: var(--color-brand-800);
      }

      @media ${device.mobileL} {
        font-size: 1.4rem;
        padding: 1rem 1.2rem;

        ${(props) =>
          props.$change === "open" &&
          css`
            font-size: 1.6rem;
          `}
      }
    `}

  ${(props) =>
    props.disabled &&
    props.type === "primary" &&
    css`
      background-color: var(--color-brand-500) !important;
      color: var(--color-brand-50) !important;
    `}

  ${(props) =>
    props.type === "secondary" &&
    css`
      background-color: var(--color-brand-100);
      color: var(--color-brand-800);
      font-size: 1.4rem;
      padding: 1rem 1.6rem;

      &:hover {
        background-color: var(--color-brand-200);
        color: var(--color-brand-900);
      }

      @media ${device.mobileL} {
        font-size: 1.4rem;
        padding: 1rem 1.2rem;

        ${(props) =>
          props.$change === "open" &&
          css`
            font-size: 1.8rem;
          `}
      }
    `}

  ${(props) =>
    props.type === "reset" &&
    css`
      background-color: var(--color-brand-100);
      color: var(--color-brand-700);
      font-size: 1.4rem;
      padding: 1rem 1.6rem;

      &:hover {
        background-color: var(--color-brand-200);
        color: var(--color-brand-800);
      }

      @media ${device.mobileL} {
        font-size: 1.3rem;
        padding: 0.4rem 0.6rem;
      }
    `}

      ${(props) =>
    props.type === "cancel" &&
    css`
      background-color: #ff4400a7;
      color: var(--color-grey-800);

      font-size: 1.4rem;
      padding: 1rem 1.6rem;

      &:hover {
        background-color: orangered;
        color: var(--color-grey-600);
      }

      @media ${device.mobileL} {
        font-size: 1.3rem;
        padding: 0.5rem 0.6rem;
      }
    `}

     ${(props) =>
    props.type === "adminBtn-cancel" &&
    css`
      background-color: #ff4400a7;
      color: var(--color-grey-100);

      font-size: 1.1rem;
      padding: 0.6rem 1rem;

      &:hover {
        background-color: orangered;
        color: var(--color-grey-200);
      }

      @media ${device.mobileL} {
        font-size: 1.3rem;
        padding: 0.5rem 0.6rem;
      }
    `}
    

     ${(props) =>
    props.type === "adminBtn-secondary" &&
    css`
      background-color: var(--color-brand-100);
      color: var(--color-brand-800);
      font-size: 1.1rem;
      padding: 0.6rem 1rem;

      &:hover {
        background-color: var(--color-brand-200);
        color: var(--color-brand-900);
      }

      @media ${device.mobileL} {
        font-size: 1.2rem;
        padding: 0.5rem 0.6rem;
      }
    `}

     ${(props) =>
    props.type === "adminBtni" &&
    css`
      background-color: var(--color-brand-700);
      font-size: 1.4rem;
      padding: 0.6rem 1rem;

      &:hover {
        background-color: var(--color-brand-800);
        color: var(--color-brand-200);
      }

      @media ${device.mobileL} {
        font-size: 1.2rem;
        padding: 0.5rem 0.6rem;
      }
    `}

    
  ${(props) =>
    props.type === "icon" &&
    css`
      background-color: var(--color-brand-800);
      font-size: 1.2rem;
      padding: 0.7rem 1.3rem;

      &:hover {
        background-color: var(--color-brand-900);
        color: var(--color-brand-200);
      }

      /* @media ${device.mobileL} {
        font-size: 1.3rem;
        padding: 0.5rem 0.6rem;
      } */
    `}

      ${(props) =>
    props.disabled &&
    css`
      background-color: #9ca3af;
      color: #f3f4f6;
    `}
`;

function Button({ children, type, disabled, onClick, change, isWorking }) {
  return (
    <StyleBotton
      $change={change}
      type={type}
      disabled={disabled}
      $isWorking={isWorking}
      onClick={onClick}
    >
      {children}
    </StyleBotton>
  );
}

export default Button;
