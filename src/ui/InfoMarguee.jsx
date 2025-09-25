import styled from "styled-components";
import Marquee from "react-fast-marquee";
import { formatCurrency } from "../utils/helpers";

const InfoSliderMessage = styled.div`
  /* display: flex;
  flex-direction: column;
  gap: 1.5rem; */
  /* height: 40rem;
  width: 35rem; */
`;

const SliderMessage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;

  font-weight: 600;
  font-size: 1rem;
  padding: 1rem;
  background-color: var(--color-grey-200);
  color: var(--color-grey-800);
  border-radius: var(--border-radius-lg);
`;

const ImageNameDiv = styled.div`
  /* align-self: flex-end;

  display: flex;
  gap: 1rem;
  align-items: center;
  & img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: 2px solid var(--color-brand-700);
    margin-left: -0.5rem;
    box-shadow: var(--shadow-md);
  } */
`;

const style = {
  width: "140%",
  height: "160%",
  overflow: "hidden",
  margin: "0px auto",
  padding: "1px",
  backgroundColor: "red",
  color: "green",
  display: "flex",
  gap: "35px",
  alignItems: "center",
};

function InfoMarguee({ allTestimony }) {
  const testing = [
    {
      phoneNumber: "09094877488",
      amount: "12000",
      image: "/images/1.jpeg",
      points: "100",
    },
    {
      phoneNumber: "09094877432",
      amount: "12000",
      image: "/images/2.jpeg",
      points: "400",
    },
    {
      phoneNumber: "090948734234",
      amount: "12000",
      image: "/images/3.jpeg",
      points: "350",
    },
    {
      phoneNumber: "090948722334",
      amount: "12000",
      image: "/images/4.jpeg",
      points: "110",
    },
    {
      phoneNumber: "090948772342",
      amount: "12000",
      image: "/images/2.jpeg",
      points: "150",
    },
    {
      phoneNumber: "09094872233",
      amount: "12000",
      image: "/images/5.jpeg",
      points: "1000",
    },
  ];

  return (
    <Marquee
      direction="up"
      gradient={true}
      gradientWidth={40}
      // gradientColor="#c7d2fe"
      pauseOnClick={true}
      pauseOnHover={true}
      speed={5}
      style={style}
    >
      {testing?.length ? (
        // <InfoSliderMessage>
        <>
          {testing?.map((each, i) => (
            <SliderMessage key={i}>
              <p>{`Completed ${each.points} today`}</p>

              <span>{formatCurrency(each.amount)}</span>
              <ImageNameDiv>
                <img src={each.image} alt={each.phoneNumber} />
                <span>{each.phoneNumber}</span>
              </ImageNameDiv>
            </SliderMessage>
          ))}
        </>
      ) : (
        // </InfoSliderMessage>
        ""
      )}
    </Marquee>
  );
}

export default InfoMarguee;
