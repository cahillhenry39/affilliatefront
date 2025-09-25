import styled from "styled-components";
import Headings from "./Headings";
import { device } from "../../mediaQuery";

const AddressComponent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  color: var(--color-brand-100);

  & h1 {
    color: var(--color-brand-100);
  }
`;
const Location = styled.div`
  font-size: 1.6rem;
`;

const Contact = styled.div`
  display: flex;
  gap: 0rem;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 1.4rem;
  flex-direction: column;

  @media ${device.mobileL} {
    flex-direction: column;
    gap: 0rem;
  }
`;

// const Phone = styled.p``;
const Email = styled.p``;

function Address() {
  return (
    <AddressComponent>
      <Headings type="h4-left">Office</Headings>
      <Location>
        Lindfield Avenue 21, New South Wales, Sydney. Australia.
      </Location>

      <Contact>
        {/* <Phone>
          Phone:{" "}
          <a
            href={`https://wa.me/${"+61784545388"}`}
            rel="noreferrer"
            target="_blank"
          >
            +61 784 5453 88
          </a>
        </Phone> */}
        <Email>
          <a href="mailto:support@loanerbin.com">
            Email: support@loanerbin.com
          </a>
        </Email>
      </Contact>
    </AddressComponent>
  );
}

export default Address;
