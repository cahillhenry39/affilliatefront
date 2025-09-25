import styled from "styled-components";
import { IoLogoFacebook, IoLogoTwitter, IoLogoWhatsapp } from "react-icons/io5";

const SocialConnectComponent = styled.div`
  display: flex;
  gap: 1.5rem;
  font-size: 1.3rem;

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    cursor: pointer;
  }
`;

function SocialConnect() {
  return (
    <SocialConnectComponent>
      <a
        href="https://www.facebook.com/profile.php?id=61555785945557&mibextid=ZbWKwL"
        rel="noreferrer"
        target="_blank"
      >
        <IoLogoFacebook />
      </a>
      <a
        href="https://www.twitter.com/loanerbin"
        rel="noreferrer"
        target="_blank"
      >
        <IoLogoTwitter />
      </a>

      <a
        href={`https://whatsapp.com/channel/0029VaNfNLe8qIzydvEdBQ0B`}
        rel="noreferrer"
        target="_blank"
      >
        <IoLogoWhatsapp />
      </a>
    </SocialConnectComponent>
  );
}

export default SocialConnect;
