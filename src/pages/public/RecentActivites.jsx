import styled, { css } from "styled-components";
import NavigationHeader from "../../features/Home/NavigationHeader";
import { useEffect, useState } from "react";
import { useGetAllActivities } from "../../features/activities/useActivities";
import { formatCurrency, formatTextCapitalize } from "../../utils/helpers";

const StyledDisplayOther = styled.section`
  /* ✅ use CSS variable */
  height: calc(var(--real-vh, 1vh) * 100);
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

const LoaderActivity = styled.div`
  height: 40rem;
  width: 25rem;
  margin: 4rem auto 0rem;

  background-color: var(--color-grey-50);
`;

const RecentActivitiesContainter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
`;

const MainSliderContainerMajor = styled.div`
  position: relative;
  overflow: hidden;
`;

const MainSliderContainerSecond = styled.div`
  display: flex;
  transition: transform 500ms ease-in-out;
  transform: ${({ $currentIndex }) => `translateX(-${$currentIndex * 100}%)`};
`;

const MainSliderContainerThird = styled.div`
  width: 100%;
  flex-shrink: 0;
  padding-left: 1rem;
  padding-right: 1rem;
`;

const CardContainer = styled.div`
  max-width: 28rem; /* max-w-md */
  margin-left: auto; /* mx-auto */
  margin-right: auto;

  transition: all 300ms ease;
  background-color: var(--color-grey-0);
  padding: 4rem 0rem;

  &:hover {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
      0 10px 10px -5px rgba(0, 0, 0, 0.04); /* shadow-xl */
  }
`;

const ImageDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & img {
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    border: 2px solid var(--color-brand-700);

    box-shadow: var(--shadow-md);
  }
`;

const CustomersName = styled.h3`
  font-size: 1.82rem;
  font-weight: 600;
  text-align: center;
  margin-top: 1rem;
`;

const AmountEarned = styled.div`
  background-color: var(--color-green-backColors);
  padding: 1rem 2rem;
  font-size: 2.2rem;
  color: var(--color-brand-800);
  text-align: center;
  font-weight: 600;
`;

const MessagePara = styled.p`
  font-size: 1.5rem;
  text-align: center;
  margin-top: 1rem;
  color: var(--color-grey-500);
`;

const DotContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.51rem;
  margin-top: 2rem;
`;

const DotButtons = styled.button`
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
  transition: all 0.3s;
  border: none;

  ${(props) =>
    props.$isActive === "true"
      ? css`
          background-color: var(--color-brand-700);
        `
      : css`
          background-color: var(--color-brand-100);
        `}
`;

function RecentActivites() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { allActivities, isLoading } = useGetAllActivities();

  const successStories = allActivities ? allActivities?.slice(0, 11) : [];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % successStories.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [successStories?.length]);

  return (
    <>
      <NavigationHeader />
      <StyledDisplayOther>
        <WelcomIntro>
          <h2>
            Recent Activities & <span>Earnings</span>
          </h2>

          <p>
            Real people earning real money. Join our community of successful
            task performers and investors.
          </p>
        </WelcomIntro>

        {isLoading ? (
          <LoaderActivity />
        ) : (
          <RecentActivitiesContainter>
            <MainSliderContainerMajor>
              <MainSliderContainerSecond $currentIndex={currentIndex}>
                {successStories?.map((each, i) => {
                  const { avatar, amount, message } = each;

                  return (
                    <MainSliderContainerThird key={i}>
                      <CardContainer>
                        <ImageDiv>
                          <img
                            src={`${avatar ? avatar : "/main/badGuy.jpg"}`}
                          />
                        </ImageDiv>

                        <CustomersName>Ebuka Gabriel</CustomersName>
                        <AmountEarned>+ {formatCurrency(amount)}</AmountEarned>
                        <MessagePara>
                          {formatTextCapitalize(message)}
                        </MessagePara>
                      </CardContainer>
                    </MainSliderContainerThird>
                  );
                })}
              </MainSliderContainerSecond>
            </MainSliderContainerMajor>

            <DotContainer>
              {successStories.map((_, index) => (
                <DotButtons
                  key={index}
                  $isActive={(index === currentIndex)?.toString()}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </DotContainer>
          </RecentActivitiesContainter>
        )}
      </StyledDisplayOther>
    </>
  );
}

export default RecentActivites;
