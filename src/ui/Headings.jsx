import styled, { css } from "styled-components";
import { device } from "../../mediaQuery";

const Headings = styled.h1`
  color: var(--color-grey-700);
  text-transform: capitalize;
  text-align: center;

  ${(props) =>
    props.$color &&
    css`
      color: var(--color-brand-800);
    `}
  & svg {
    width: 3.4rem;
    height: 3.4rem;
    margin-right: 1rem;
  }

  ${(props) =>
    props.type === "h1" &&
    css`
      font-size: 2.4rem;

      @media ${device.mobileL} {
        font-size: 2rem;
        padding: 0rem;
      }
    `}

  ${(props) =>
    props.type === "h2" &&
    css`
      font-size: 2.6rem;
      margin: 2rem auto;

      @media ${device.mobileL} {
        font-size: 1.8rem;
      }
    `}

     ${(props) =>
    props.type === "h3" &&
    css`
      font-size: 2rem;

      @media ${device.tablet} {
        margin-top: 1.6rem;
      }

      @media ${device.mobileL} {
        font-size: 1.4rem;
      }
    `}

        ${(props) =>
    props.type === "h4" &&
    css`
      font-size: 1.6rem;
      text-align: center;

      @media ${device.tablet} {
        font-size: 1.3rem;
      }

      @media ${device.mobileL} {
        font-size: 1rem;
        margin: 0 1rem;
      }
    `}

          ${(props) =>
    props.type === "h5" &&
    css`
      font-size: 1.4rem;
      text-align: center;
    `}

      ${(props) =>
    props.type === "h1-left" &&
    css`
      text-align: left;
      margin: 0;
      font-size: 2.4rem;

      @media ${device.mobileL} {
        font-size: 2rem;
      }
    `}

        ${(props) =>
    props.type === "h2-left" &&
    css`
      text-align: left;
      font-size: 2.6rem;

      & span {
        display: inline-block;
        transform: skew(-10deg);

        padding: 1rem 2.4rem;
        background-color: var(--color-brand-700);
        color: var(--color-brand-200);
      }
    `}

        ${(props) =>
    props.type === "h3-left" &&
    css`
      text-align: left;
      margin: 0;
      font-weight: 500;

      font-size: 2rem;

      @media ${device.mobileL} {
        font-size: 1.4rem;
      }
    `}

        ${(props) =>
    props.type === "h4-left" &&
    css`
      text-align: left;
      margin: 0;
      font-size: 1.6rem;
      display: flex;
      align-items: center;
      gap: 1rem;

      & span {
        font-size: 1.3rem;
      }

      & svg {
        width: 2.4rem;
        height: 2.4rem;

        ${(props) =>
          props.$color &&
          css`
            color: var(--color-brand-700);
          `}
      }
    `}
`;

export default Headings;
