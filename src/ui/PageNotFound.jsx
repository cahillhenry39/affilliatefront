import { Link } from "react-router-dom";
import styled from "styled-components";

import { device } from "../../mediaQuery";
import Button from "./Button";
import Logo from "./Logo";

const StyledPageNotFound = styled.div`
  /* margin: 8rem auto; */
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  background: url("/app/background/w2.jpg");
  background-size: cover;
  height: 100vh;

  @media ${device.mobileL} {
    margin: 0 auto;
  }
`;

const TheCode = styled.h2`
  font-size: 12.4rem;
  color: var(--color-grey-500);

  @media ${device.mobileL} {
    font-size: 8.4rem;
  }
`;

const Message = styled.p`
  color: var(--color-brand-700);
  text-align: center;
  font-size: 2.4rem;
  width: 45rem;

  @media ${device.mobileL} {
    font-size: 1.4rem;
    width: auto;
    padding: 0 4rem;
  }
`;

function PageNotFound() {
  return (
    <StyledPageNotFound>
      <Logo />

      <TheCode>404</TheCode>
      <Message>
        Oh! It seems you are lost. We could not get what you are looking for.
      </Message>

      <Link to="/">
        <Button type="primary">Go back home</Button>
      </Link>
    </StyledPageNotFound>
  );
}

export default PageNotFound;
