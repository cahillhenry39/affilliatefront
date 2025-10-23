import styled, { css } from "styled-components";
import { useEffect, useState } from "react";

const StyledDisplayOther = styled.section`
  /* ✅ use CSS variable */
  /* height: calc(var(--real-vh, 1vh) * 100); */
  height: 12rem;
  width: 100%;
  overflow: hidden;

  background-color: var(--color-grey-0);

  display: flex;
  flex-direction: column;
`;

const RecentActivitiesContainter = styled.div`
  display: flex;
  flex-direction: column;
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
`;

const ImageDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & img {
    width: 100%;
    height: 12rem;
    box-shadow: var(--shadow-md);
  }
`;

const DotContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.51rem;
  margin-top: -1rem;
  z-index: 100;
`;

const DotButtons = styled.button`
  width: 0.5rem;
  height: 0.5rem;
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

function DasboardSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const successStories = ["slider1.jpg", "slider2.jpg", "slider3.jpg"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % successStories.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [successStories?.length]);

  return (
    <>
      <StyledDisplayOther>
        <RecentActivitiesContainter>
          <MainSliderContainerMajor>
            <MainSliderContainerSecond $currentIndex={currentIndex}>
              {successStories?.map((each, i) => {
                return (
                  <MainSliderContainerThird key={i}>
                    <ImageDiv>
                      <img src={`/main/${each}`} />
                    </ImageDiv>
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
      </StyledDisplayOther>
    </>
  );
}

export default DasboardSlider;
