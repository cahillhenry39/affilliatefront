import { useEffect } from "react";
import styled from "styled-components";

const StyledGoogleLanguage = styled.div`
  z-index: 800;
  & select {
    font-size: 1.4rem;
    padding: 0.8rem 1.2rem 0.8rem 0.1rem;

    /* border: 1px solid var(--color-grey-300); */
    width: 10rem;

    border-radius: var(--border-radius-sm);
    background-color: var(--color-grey-200);
    border: 1.5px solid var(--color-700);
    font-weight: 500;
    box-shadow: var(--shadow-sm);

    &:option {
      font-size: 1rem;
    }
  }

  & span {
    display: none;
  }

  & div {
    color: transparent;

    & div {
      color: var(--color-grey-700);
      position: fixed;
      /* top: 0; */
      left: 0;
      bottom: 0;
      border: 1.5px solid var(--color-700);
    }
  }
`;

const Google = () => {
  function setCookie(key, value, expiry) {
    var expires = new Date();
    expires.setTime(expires.getTime() + expiry * 24 * 60 * 60 * 1000);
    document.cookie = key + "=" + value + ";expires=" + expires.toUTCString();
  }
  const language = navigator?.language?.length ? navigator.language[0] : "en";

  useEffect(() => {
    const googleTranslateElementInit = () => {
      setCookie("googtrans", `/en/${language}`, 1);
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          autoDisplay: true,
        },
        "google_translate_element"
      );
    };

    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, [language]);

  return (
    <StyledGoogleLanguage id="google_translate_element"></StyledGoogleLanguage>
  );
};

export default Google;
