import styled, { css } from "styled-components";
import {
  formatCurrency,
  formatDateOnly,
  formatTextCapitalize,
  getCurrentWeekRange,
} from "../../utils/helpers";

const LeaderBoardDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;

  padding: 3rem 1rem;
`;

const Headings = styled.h3`
  font-size: 1.5rem;
  color: var(--color-grey-600);
`;

const SubHeadings = styled.span`
  font-size: 1.2rem;
  color: var(--color-grey-400);
`;

const LeaderBoardWinnings = styled.div`
  display: flex;
  justify-content: space-around;

  & p {
    font-size: 1.2rem;
    font-weight: 600;
    padding: 1rem 1.3rem;
    box-shadow: var(--shadow-md);
  }
`;

const FirstPrize = styled.p`
  ${(props) =>
    props.$isDarkMode === "true"
      ? css`
          background-color: var(--color-brand-600);
        `
      : css`
          background-color: var(--color-brand-200);
        `}
`;
const SecondPrize = styled.p`
  ${(props) =>
    props.$isDarkMode === "true"
      ? css`
          background-color: var(--color-brand-600);
        `
      : css`
          background-color: var(--color-brand-200);
        `}
`;

const ThirdPrize = styled.p`
  ${(props) =>
    props.$isDarkMode === "true"
      ? css`
          background-color: var(--color-brand-600);
        `
      : css`
          background-color: var(--color-brand-200);
        `}
`;

const WeeklyLeaderBoardDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const WeeklyLeadingBoard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & div {
    display: grid;
    grid-template-columns: 0.4fr 1fr 0.41fr;
    gap: 1rem;
    background-color: var(--color-brand-700);
    color: var(--color-brand-100);
    padding: 0.2rem 1rem;

    & p {
      font-size: 1.2rem;
      font-weight: 600;
    }
  }

  & ul {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;

    & li {
      display: grid;
      grid-template-columns: 0.4fr 1fr 0.41fr;
      gap: 1rem;
      padding: 0.7rem 1rem;
      align-items: end;

      & p {
        font-size: 1.2rem;
      }

      & img {
        width: 3rem;
        border-radius: 50%;
        /* margin: 0 auto; */
      }

      &:nth-last-of-type(even) {
        background-color: var(--color-grey-100);
      }
    }
  }
`;

const currentWeekLeaderboard = [
  {
    package: "Level 5",
    cost: 1050000,
    points: 140,
  },

  {
    package: "Level 4",
    cost: 380000,
    points: 60,
  },

  {
    package: "Level 3",
    cost: 200000,
    points: 30,
  },

  {
    package: "Level 2",
    cost: 65000,
    points: 9,
  },

  {
    package: "Level 1",
    cost: 18000,
    points: 2,
  },
];

function ReferralPointTable({ isDarkMode, packages }) {
  const { startDate, endDate } = getCurrentWeekRange();

  return (
    <LeaderBoardDiv>
      <WeeklyLeaderBoardDiv>
        <div>
          <Headings>{`Subscription Table Points`}</Headings>
        </div>
        <WeeklyLeadingBoard>
          <div>
            <p>Package</p>
            <p>Cost</p>
            <p>Points</p>
          </div>
          <ul>
            {packages?.map((each, i) => {
              return (
                <li key={i}>
                  <p>{formatTextCapitalize(each?.title)}</p>
                  <p>{formatCurrency(each?.cost)}</p>
                  <p>{`${each?.points} Points`}</p>
                </li>
              );
            })}

            {/* <li key={i}>
                  <p>{formatTextCapitalize(each?.package)}</p>
                  <p>{formatCurrency(each?.cost)}</p>
                  <p>{`${each?.points} Points`}</p>
                </li> */}
          </ul>
        </WeeklyLeadingBoard>
      </WeeklyLeaderBoardDiv>
    </LeaderBoardDiv>
  );
}

export default ReferralPointTable;
