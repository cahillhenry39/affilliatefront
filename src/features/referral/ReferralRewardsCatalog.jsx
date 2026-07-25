import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";

const Section = styled.section`
  padding: 2rem 1rem;
`;

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 5rem;
  text-align: center;

  p {
    font-size: 1.3rem;
    color: var(--color-grey-500);
  }
`;

const Badge = styled.div`
  display: inline-block;

  padding: 0.7rem 1.4rem;

  border-radius: 9px;
  background: #0bb78322;
  color: #0bb783;
  font-weight: 600;
  font-size: 1.5rem;
`;

const GrandPrize = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding: 2rem;
  border-radius: 9px;
  background: var(--color-grey-50);
  backdrop-filter: blur(18px);
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.15);
  margin-bottom: 4rem;
`;

const TopThree = styled.div`
  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 2rem;

  margin-bottom: 2rem;
`;

const Grid = styled.div`
  display: grid;

  grid-template-columns: repeat(3, 1fr);

  gap: 2rem;
`;

const RewardCard = styled.div`
  position: relative;

  padding: 2rem;

  border-radius: 26px;

  background: white;

  transition: 0.35s;

  overflow: hidden;

  &:hover {
    transform: translateY(-10px);

    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.15);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 240px;
  object-fit: contain;
  display: block;

  margin: auto;

  background: radial-gradient(
    circle,
    rgba(11, 183, 131, 0.12),
    transparent 70%
  );
  border-radius: 22px;
  padding: 2rem;
`;

const ItemProductImage = styled.div`
  width: 100%;
  height: 240px;
  object-fit: contain;
  display: block;

  margin: auto;

  background: radial-gradient(
    circle,
    rgba(11, 183, 131, 0.12),
    transparent 70%
  );
  border-radius: 22px;
  padding: 2rem;

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  text-align: center;
  color: var(--color-grey-400);
`;

const PrizeInfo = styled.div`
  small {
    color: #0bb783;
    font-size: 1.1rem;
  }

  h3 {
    font-size: 1.8rem;
    margin: 0.7rem 0;
  }

  p {
    color: var(--color-grey-500);
    margin-bottom: 1rem;
    font-size: 1.3rem;
  }
`;

const Value = styled.div`
  display: inline-block;
  padding: 0.6rem 1.4rem;
  border-radius: 9px;
  background: #0bb78318;
  color: #0bb783;
  font-size: 1.2rem;
  letter-spacing: 1.1px;
`;

const RankBadge = styled.div`
  position: absolute;
  top: -8px;
  left: 0px;
  padding: 0.6rem 1rem;
  background: var(--color-brand-800);
  color: #e6e6e6;

  font-size: 1.1rem;
  z-index: 101;
  letter-spacing: 1.6px;
`;

const Rank = styled.div`
  position: absolute;

  top: 18px;

  right: 18px;

  width: 42px;

  height: 42px;

  border-radius: 50%;

  background: #0bb783;

  color: white;

  display: flex;

  align-items: center;

  justify-content: center;

  font-weight: 700;
`;

function ReferralRewardsCatalog({ rewardsCatalog }) {
  return (
    <Section>
      <Heading>
        <Badge>🏆 Weekly Rewards are Below</Badge>
        <p>
          Become the top 6 referrers this week to receive the rewards. Invite
          more people and climb the leaderboard.
        </p>
      </Heading>

      {/* GRAND PRIZE */}

      {rewardsCatalog?.map((each, i) => {
        const {
          position,
          image,
          title,
          description,
          prize,
          // displayOrder,
          // isActive,
          // id,
          // created_at,
        } = each;

        return (
          <GrandPrize key={i}>
            <RankBadge>{`${position} Position`}</RankBadge>

            {image ? (
              <ProductImage src={image} alt="Image for the current prize" />
            ) : (
              <ItemProductImage>Item Image Dislayed Here</ItemProductImage>
            )}

            <PrizeInfo>
              <small>Grand Prize</small>

              <h3>{title}</h3>

              <p>{description}</p>

              <Value>{`Worth ${formatCurrency(prize)}+`}</Value>
            </PrizeInfo>
          </GrandPrize>
        );
      })}
    </Section>
  );
}

export default ReferralRewardsCatalog;
