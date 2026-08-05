import styled, { css } from "styled-components";
import { device } from "../../mediaQuery";

const variants = {
  primary: css`
    background: var(--color-brand-700);
    color: var(--color-brand-50);

    &:hover:not(:disabled) {
      background: var(--color-brand-800);
    }
  `,

  secondary: css`
    background: var(--color-brand-100);
    color: var(--color-brand-800);

    &:hover:not(:disabled) {
      background: var(--color-brand-200);
    }
  `,

  reset: css`
    background: var(--color-brand-100);
    color: var(--color-brand-700);

    &:hover:not(:disabled) {
      background: var(--color-brand-200);
    }
  `,

  cancel: css`
    background: #ff4400a7;
    color: var(--color-grey-800);

    &:hover:not(:disabled) {
      background: orangered;
    }
  `,

  "adminBtn-cancel": css`
    background: #ff4400a7;
    color: var(--color-grey-100);

    font-size: 1.1rem;
    padding: 0.6rem 1rem;

    &:hover:not(:disabled) {
      background: orangered;
    }
  `,

  "adminBtn-secondary": css`
    background: var(--color-brand-100);
    color: var(--color-brand-800);

    font-size: 1.1rem;
    padding: 0.6rem 1rem;

    &:hover:not(:disabled) {
      background: var(--color-brand-200);
    }
  `,

  adminBtni: css`
    background: var(--color-brand-700);

    font-size: 1.2rem;
    padding: 0.6rem 1rem;

    &:hover:not(:disabled) {
      background: var(--color-brand-800);
    }
  `,

  icon: css`
    background: var(--color-brand-800);

    font-size: 1.2rem;
    padding: 0.7rem 1.3rem;

    &:hover:not(:disabled) {
      background: var(--color-brand-900);
    }
  `,
};

const StyledButton = styled.button`
  border: none;
  border-radius: var(--border-radius-sm);

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  cursor: pointer;
  user-select: none;

  transition:
    background-color 0.2s,
    color 0.2s,
    transform 0.15s,
    box-shadow 0.2s;

  text-transform: uppercase;
  font-weight: 600;

  font-size: 1.4rem;
  padding: 1rem 1.6rem;

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:focus-visible {
    outline: 3px solid var(--color-brand-300);
    outline-offset: 2px;
  }

  &:disabled {
    background: #9ca3af !important;
    color: #f3f4f6 !important;
    cursor: not-allowed;
  }

  svg {
    width: 2rem;
    height: 2rem;
  }

  ${({ $variant }) => variants[$variant]}

  @media ${device.mobileL} {
    font-size: ${({ $change }) => ($change === "open" ? "1.6rem" : "1.3rem")};
    padding: 0.8rem 1.2rem;
  }
`;

function Button({
  children,
  type = "button",
  variant,
  disabled,
  onClick,
  change,
  isWorking,
  ...props
}) {
  // Backward compatibility
  const styleVariant = variant || type;

  const htmlType =
    type === "submit" || type === "reset" || type === "button"
      ? type
      : "button";

  return (
    <StyledButton
      type={htmlType}
      $variant={styleVariant}
      $change={change}
      disabled={disabled || isWorking}
      onClick={onClick}
      {...props}
    >
      {children}
    </StyledButton>
  );
}

export default Button;
