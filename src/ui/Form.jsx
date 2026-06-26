import styled, { css } from "styled-components";
import { device } from "../../mediaQuery";

const Form = styled.form`
  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 4.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 2px solid var(--color-grey-200);
      border-radius: var(--border-radius-md);
      box-shadow: var(--shadow-sm);

      @media ${device.mobileL} {
        padding: 2.4rem 2rem;
      }
    `}

  ${(props) =>
    props.type === "with-image" &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-image: linear-gradient(200deg, #0000007b, #0000007b),
        url("/main/customer.jpg");
      background-size: cover;
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
      @media ${device.mobileL} {
        padding: 2.4rem 2rem;
      }
    `}


    

  ${(props) =>
    props.type === "modal" &&
    css`
      max-width: 90rem;
      margin: 0 auto;

      @media ${device.laptop} {
        width: auto;
      }

      @media ${device.mobileL} {
        max-width: 35rem;
      }
    `}
    
  overflow: hidden;
  font-size: 1.4rem;

  ${(props) =>
    props.$grid === "true" &&
    css`
      grid-column: 1 / -1;
    `}

  ${(props) =>
    props.$isDarkMode === "true"
      ? css`
          background-color: var(--color-grey-0);
        `
      : css`
          background-image: url("/app/background/w2.jpg");
          background-size: cover;
        `}
`;

Form.defaultProps = {
  type: "regular",
};

export default Form;
