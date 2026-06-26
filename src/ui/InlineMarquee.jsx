import styled from "styled-components";
import Marquee from "react-fast-marquee";
import { device } from "../../mediaQuery";
import { formatDate2 } from "../utils/helpers";

const InfoSliderMessage = styled.div`
  display: flex;

  gap: 1.5rem;
`;

const SliderMessage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  font-weight: 600;
  font-size: 1rem;
  padding: 1rem;
  background-color: var(--color-grey-200);
  color: var(--color-grey-800);
  border-radius: var(--border-radius-lg);
  max-width: 30rem;

  @media ${device.mobileL} {
    font-size: 0.71rem;
    max-width: 25rem;
  }
`;

const ImageNameDiv = styled.div`
  align-self: flex-end;

  display: flex;
  gap: 1rem;
  align-items: center;
  & img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    border: 2px solid var(--color-brand-700);
    margin-left: -0.5rem;
    box-shadow: var(--shadow-md);
  }
`;

const style = {
  width: "100%",
  overflow: "hidden",
};

function InlineMarquee({ allTestimony }) {
  return (
    <Marquee
      gradient={true}
      gradientWidth={40}
      gradientColor="#c7d2fe"
      pauseOnClick={true}
      pauseOnHover={true}
      speed={7}
      style={style}
    >
      {allTestimony?.length ? (
        <InfoSliderMessage>
          {allTestimony?.map((each, i) => (
            <SliderMessage key={i}>
              <p>{each.testimony}</p>

              <span>{formatDate2(each.created_at)}</span>
              <ImageNameDiv>
                <img src={each.image} alt={each.fullName} />
                <span>{each.fullName.split(" ")[0]}</span>
              </ImageNameDiv>
            </SliderMessage>
          ))}
        </InfoSliderMessage>
      ) : (
        ""
      )}
    </Marquee>
  );
}

export default InlineMarquee;
