import styled, { css } from "styled-components";
import { device } from "../../mediaQuery";

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: flex-start; */
  justify-content: center;

  /* gap: 1rem; */

  /* width: 100%; */

  position: relative;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  /* &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  } */

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }

  @media ${device.mobileL} {
    width: 100%;
  }
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 1.2rem;

  ${(props) =>
    props.$color === "true" &&
    css`
      color: var(--color-grey-300);
    `}
`;

const Error = styled.span`
  font-size: 1.1rem;
  color: orangered;
`;
const Asterisk = styled.span`
  color: orangered;
  font-size: 1.3rem;
`;

const ChildrenWithSpan = styled.div`
  display: flex;
  align-items: center;
  /* flex-direction: row-reverse; */
`;

function FormRow({ label, error, children, must, color }) {
  return (
    <StyledFormRow>
      {label && (
        <Label
          $color={color?.toString()}
          htmlFor={
            children?.props?.children?.[0]
              ? children.props?.children?.[0]?.props?.id
              : children.props.id
          }
        >
          {label} {must && <Asterisk> *</Asterisk>}{" "}
        </Label>
      )}
      <ChildrenWithSpan>{children}</ChildrenWithSpan>
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
