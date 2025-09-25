import {
  IoIosMail,
  IoLogoFacebook,
  IoLogoLinkedin,
  IoLogoTwitter,
  IoLogoWhatsapp,
} from "react-icons/io";
import styled, { css } from "styled-components";

const StyledSocialMediaShare = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-end;

  & svg {
    width: 3rem;
    height: 3rem;
    transition: all 0.3s;
    cursor: pointer;
    color: inherit;
    &:hover {
      transform: scale(1.2);
    }
  }

  ${(props) =>
    props?.$isDarkMode === "true"
      ? css`
          color: var(--color-brand-200);
        `
      : css`
          color: var(--color-brand-900);
        `}
`;

//url = "mailto:?subject=%22" + pageTitle + "%22&body=Read%20the%20article%20%22" + pageTitle + "%22%20on%20" + pageUrl;

function SocialMediaShare({ url, isDarkMode }) {
  function socialWindow(url, width, height) {
    var left = (screen.width - width) / 2;
    var top = (screen.height - height) / 2;
    var params =
      "menubar=no,toolbar=no,status=no,width=" +
      width +
      ",height=" +
      height +
      ",top=" +
      top +
      ",left=" +
      left;
    window.open(url, "", params);
  }

  function handleCallSocialLink(social) {
    let socialLink = "";

    if (social === "facebook") {
      socialLink = "https://www.facebook.com/sharer.php?u=" + url;

      socialWindow(socialLink, 570, 570);

      return;
    }

    if (social === "linkedIn") {
      socialLink = "https://www.linkedin.com/shareArticle?mini=true&url=" + url;

      socialWindow(socialLink, 570, 570);

      return;
    }

    if (social === "mail") {
      socialLink =
        "mailto:?subject=%22" +
        "Referral link" +
        "%22&body=Read%20the%20article%20%22" +
        "join me" +
        "%22%20on%20" +
        url;

      socialWindow(socialLink, 570, 570);

      return;
    }

    if (social === "whatsapp") {
      socialLink = "whatsapp://send?text=" + "%20" + url;

      socialWindow(socialLink, 570, 570);

      return;
    }

    if (social === "twitter") {
      socialLink = "https://twitter.com/intent/tweet?url=" + url;
      socialWindow(socialLink, 570, 570);

      return;
    }
  }
  return (
    <StyledSocialMediaShare $isDarkMode={isDarkMode?.toString()}>
      <IoLogoFacebook onClick={() => handleCallSocialLink("facebook")} />

      <IoLogoLinkedin onClick={() => handleCallSocialLink("linkedIn")} />

      <IoIosMail onClick={() => handleCallSocialLink("mail")} />

      <IoLogoWhatsapp onClick={() => handleCallSocialLink("whatsapp")} />

      <IoLogoTwitter onClick={() => handleCallSocialLink("twitter")} />
    </StyledSocialMediaShare>
  );
}

export default SocialMediaShare;
