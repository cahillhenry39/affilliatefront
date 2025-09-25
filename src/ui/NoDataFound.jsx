import { Link } from "react-router-dom";
import styled from "styled-components";

import Headings from "./Headings";
import OpenButton from "./OpenButton";
import Button from "./Botton";

const StyledNoDataFound = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2.4rem;
  margin: auto 0;
`;

const Para = styled.p`
  font-size: 1.3rem;
  font-weight: 500;
  text-align: center;
`;

const StyledButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

function NoDataFound({ type }) {
  return (
    <StyledNoDataFound>
      <Headings type="h4">No {type} found</Headings>

      {type === "transactions" && (
        <>
          <Para>
            Start by making a transaction to get the summary show here.
          </Para>

          <Link to="/app">
            <StyledButton>
              <Button type="primary">Go back home</Button>
            </StyledButton>
          </Link>
        </>
      )}

      {type === "investments" && (
        <>
          <Para>Here shows summary of all your investments</Para>
          <StyledButton>
            <OpenButton type="investment" center={true} />
          </StyledButton>
        </>
      )}

      {type === "loan transactions" && (
        <>
          <Para>
            Give out a loan to our verified user to view the summary here.
          </Para>
          <StyledButton>
            <OpenButton center={true} />
          </StyledButton>
        </>
      )}

      {type === "Borrow transactions" && (
        <>
          <Para>
            Start by creating a loan request. Your loan records will show here.
          </Para>
          <OpenButton type="loan" center={true} />
        </>
      )}

      {type === "borrower" && (
        <>
          <Para>
            Sorry, there is no borrower at the moment. Please check back later.
          </Para>

          <Link to="/app">
            <StyledButton>
              <Button type="primary">Go back home</Button>
            </StyledButton>
          </Link>
        </>
      )}
    </StyledNoDataFound>
  );
}

export default NoDataFound;
