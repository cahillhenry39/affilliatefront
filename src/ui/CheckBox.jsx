import styled, { css } from "styled-components";

const CheckBoxSpan = styled.span`
  & input[type="checkbox"] {
    height: 1.8rem;
    width: 1.8rem;
    outline-offset: 2px;
    transform-origin: 0;
    accent-color: var(--color-brand-700);
    margin-top: 2rem;
  }

  & input[type="checkbox"]:disabled {
    accent-color: var(--color-brand-600);
  }

  ${(props) =>
    props.$alert === true &&
    css`
      outline-offset: 4px;
      transform-origin: 0;
      accent-color: orangered;
    `}
`;

const CheckBoxInput = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);

  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
  background-color: red;
`;

function CheckBox({ onChange, text, disabled }) {
  return (
    <CheckBoxSpan>
      <CheckBoxInput type="checkbox" onChange={onChange} disabled={disabled} />
      <span> {text}</span>
    </CheckBoxSpan>
  );
}

export default CheckBox;
