import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import styled, { css } from "styled-components";
import { device } from "../../../mediaQuery";

const StyledContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  margin: 0rem 2rem;
`;

const ComponentContentUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  width: 70rem;
  margin: 4rem auto 0;

  @media ${device.mobileL} {
    width: auto;
  }
`;

const EachQuestionLi = styled.li`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-grey-300);

  & div {
    display: flex;
    justify-content: space-between;
  }

  & h5 {
    font-size: 1.5rem;
  }
`;

const AnswersPara = styled.p`
  font-size: 1.4rem;
  max-width: 50rem;
  color: var(--color-grey-600);
  overflow-y: hidden;

  transition: all 1s;

  ${(props) =>
    props.$isShowing === "true"
      ? css`
          max-height: 20rem;
        `
      : css`
          max-height: 0rem;
        `}
`;

const IconSVG = styled(IoIosArrowDown)`
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;

  transition: all 1s;

  ${(props) =>
    props.$isShowing === "true"
      ? css`
          transform: rotate(180deg);
        `
      : css`
          transform: rotate(0deg);
        `}
`;

const FooterPara = styled.p`
  font-size: 1.5rem;
  text-align: center;

  & span {
    color: var(--color-brand-700);
    font-weight: 600;
  }
`;

const questionsAndAnswers = [
  {
    question: "How much can I really earn on this platform?",
    answer:
      "Earnings vary based on your activity level engagement, and the package you subscribed to. Our top users earn 1 million to 5 million naira monthly through a combination of app rating tasks and stock investments. Beginners typically start earning 9,000 t0 18,000 in their first month.",
  },
  {
    question: "Is this platform legitimate and safe?",
    answer:
      "Absolutely! We're a registered business with proper licensing and insurance. We use bank-level security to protect your data and funds. All payments are processed through secure, encrypted channels, and we have a 98% user satisfaction rate.",
  },
  {
    question: "How do app rating tasks work?",
    answer:
      "You'll receive list of apps / websites for your daily task. You provide an honest rating and brief review. Each task pays 100 naira to 30,000 naira and takes just minutes to complete.",
  },
  {
    question: "What about stock trading? Do I need experience?",
    answer:
      "No experience required! We provide educational resources, market analysis, and expert recommendations. You can start with small investments and grow your portfolio over time. Many users begin with just $50-$2000.",
  },
  {
    question: "How and when do I get paid?",
    answer:
      "Payments are processed daily! You can withdraw your earnings once you reach the minimum threshold of 10,000 naira. We support bank transfers, and various digital payment methods. Most withdrawals are processed within 24 hours.",
  },
  {
    question: "Are there any fees or hidden costs?",
    answer:
      "No hidden fees ever! The platform is completely free to join and use, except you want to subscribe to a premium user. We only make money when you make money - through small commissions on successful stock trades. App rating tasks have no fees whatsoever.",
  },
  {
    question: "Can I do this alongside my regular job?",
    answer:
      "Yes! Our platform is designed for flexible, part-time earning. Most tasks can be completed in your spare time - during commutes, lunch breaks, or evenings. Many users treat this as a side hustle that grows into substantial income.",
  },
  {
    question: "What devices and locations are supported?",
    answer:
      "Our platform works only on smartphones. We support users in west africa, est africa, and select other regions. Check our availability list during registration to confirm your location is supported.",
  },
];
function FrequentlyAsked() {
  const [showAnswers, setShowAnswer] = useState("");
  return (
    <StyledContainer>
      <ComponentContentUl>
        {questionsAndAnswers?.map((el, i) => (
          <EachQuestionLi key={i}>
            <div>
              <h5>{el.question}</h5>

              <IconSVG
                $isShowing={(showAnswers?.question === el.question)?.toString()}
                onClick={() =>
                  setShowAnswer((value) =>
                    value?.question === el.question ? "" : el
                  )
                }
              />
            </div>

            <AnswersPara
              $isShowing={(showAnswers?.question === el.question)?.toString()}
            >
              {el.answer}
            </AnswersPara>
          </EachQuestionLi>
        ))}
      </ComponentContentUl>

      <FooterPara>
        Can&apos;t find the answer to your question?{" "}
        <span> Contact support </span>
        to receive help from our team.
      </FooterPara>
    </StyledContainer>
  );
}

export default FrequentlyAsked;
