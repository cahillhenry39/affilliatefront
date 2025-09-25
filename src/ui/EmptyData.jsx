import styled, { css } from "styled-components";

import { Link } from "react-router-dom";
import Button from "./Button";

const StyledNoInformation = styled.div`
  padding: 1rem 4rem 4rem;
  max-width: 60rem;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  text-align: center;
  text-transform: capitalize;
  color: var(--color-grey-600);
  font-size: 1.8rem;

  position: absolute;
  top: 50%;

  transform: translate(0, -50%);

  & img {
    width: 30rem;
  }

  ${(props) =>
    props.$notFull === "true" &&
    css`
      padding: 1rem 4rem 2rem;
      gap: 1rem;

      & img {
        width: 23rem;
      }

      & p {
        font-size: 1.8rem;
        color: var(--color-grey-600);
      }
    `}
`;

function EmptyData({
  image,
  imageName,
  message,
  button,
  link,
  buttonMessage,
  notFull,
}) {
  return (
    <StyledNoInformation $notFull={notFull?.toString()}>
      <img src={image} alt={imageName} />
      <p>{message}</p>

      {button ? (
        <Link to={link}>
          <Button type="primary">{buttonMessage}</Button>
        </Link>
      ) : (
        ""
      )}
    </StyledNoInformation>
  );
}

export default EmptyData;
