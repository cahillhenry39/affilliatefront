import styled from "styled-components";
import NavigationHeader from "../../features/Home/NavigationHeader";
import FrequentlyAsked from "../../features/faq/FrequentlyAsked";

const StyledDisplayOther = styled.section`
  /* ✅ use CSS variable */
  /* height: calc(var(--real-vh, 1vh) * 100); */
  min-height: 100vh;
  width: 100%;
  overflow: hidden;

  padding-top: 6rem;
  padding-bottom: 5rem;

  background-color: var(--color-grey-10);

  display: flex;
  flex-direction: column;
`;

const WelcomIntro = styled.div`
  & h2 {
    font-size: 3rem;
    text-align: center;
    & span {
      color: var(--color-brand-700);
    }
  }

  & p {
    font-size: 1.4rem;
    padding: 0 2rem;
    text-align: center;
    color: var(--color-grey-600);
    hyphens: none;
    -webkit-hyphens: none;
  }
`;

function FAQ() {
  return (
    <>
      <NavigationHeader />
      <StyledDisplayOther>
        <WelcomIntro>
          <h2>
            Frequently Asked <span>Questions</span>
          </h2>

          <p>
            Got questions? We&apos;ve got answers. Find everything you need to
            know about earning money on our platform.
          </p>
        </WelcomIntro>

        <FrequentlyAsked />
      </StyledDisplayOther>
    </>
  );
}

export default FAQ;
