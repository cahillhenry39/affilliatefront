import styled from "styled-components";

import { useState } from "react";
import { formatTextCapitalize } from "../../utils/helpers";

const HeaderTopContainer = styled.div`
  display: grid;
  grid-template-columns: 5rem 1fr;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0rem;

  & p {
    color: var(--color-grey-800);
    font-size: 1.6rem;
    font-weight: 500;
  }

  & span {
    color: var(--color-grey-500);
    font-size: 1.3rem;
  }
`;

const ImageLogo = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: var(--color-grey-10);
  overflow: hidden;

  & img {
    height: 4rem;
    width: 4rem;
    margin: 0 auto;
    box-shadow: 0 1px 5px #00000011;
  }
`;

const MainContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-bottom: 1px solid var(--color-grey-50);
  padding-bottom: 2rem;

  & p {
    color: var(--color-grey-700);
    font-size: 1.4rem;
  }

  & span {
    color: var(--color-brand-800);
    font-size: 1.3rem;
    text-decoration: underline;
    cursor: pointer;
  }
`;

function SingleStockHeader({ singleStock }) {
  const [readMore, setReadMore] = useState(false);

  const {
    description,
    sector,
    symbole,
    logo,
    change,
    image,
    lastPrice,
    marketOpen,
    price,
    risk,
    weeklyValues,
  } = singleStock;

  return (
    <>
      <HeaderTopContainer>
        <ImageLogo>
          <img src={logo || "/logos/2.png"} />
        </ImageLogo>

        <ContentContainer>
          <p>{formatTextCapitalize(symbole)}</p>
          <span>
            {formatTextCapitalize(symbole)} - {formatTextCapitalize(sector)}
          </span>
        </ContentContainer>
      </HeaderTopContainer>

      <MainContentContainer>
        <p>
          {description?.slice(0, readMore ? description?.length : 200)}
          {readMore ? "" : `...`}
        </p>

        <span
          onClick={() => {
            setReadMore((val) => !val);
          }}
        >
          {readMore ? "Read Less" : `Read more`}
        </span>
      </MainContentContainer>
    </>
  );
}

export default SingleStockHeader;
