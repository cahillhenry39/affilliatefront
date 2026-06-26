import styled, { css } from "styled-components";
import Headings from "../../ui/Headings";

const LeaderBoardDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
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
    grid-template-columns: 0.5fr 1fr 1fr 1fr;
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
      grid-template-columns: 0.4fr 1fr 1fr 1fr;
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

function ReferralLeaderBoard({ isDarkMode }) {
  return (
    <LeaderBoardDiv>
      <Headings type="h3">Leader board and winnings</Headings>

      <LeaderBoardWinnings>
        <FirstPrize $isDarkMode={isDarkMode?.toString()}>
          1st: N10000
        </FirstPrize>
        <SecondPrize $isDarkMode={isDarkMode?.toString()}>
          2nd: N10000
        </SecondPrize>
        <ThirdPrize $isDarkMode={isDarkMode?.toString()}>
          3rd: N10000
        </ThirdPrize>
      </LeaderBoardWinnings>

      <WeeklyLeaderBoardDiv>
        <Headings type="h3-left">This week leaderboard </Headings>
        <WeeklyLeadingBoard>
          <div>
            <p>S/n</p>
            <p>Champ</p>
            <p>Phone</p>
            <p>Points</p>
          </div>
          <ul>
            <li>
              <p>1st</p>
              <img src="/main/default-user.jpg" />
              <p>909884****</p>
              <p>240 points</p>
            </li>

            <li>
              <p>2nd</p>
              <img src="/main/default-user.jpg" />
              <p>909884****</p>
              <p>240 points</p>
            </li>

            <li>
              <p>3rd</p>
              <img src="/main/default-user.jpg" />
              <p>909884****</p>
              <p>240 points</p>
            </li>
            <li>
              <p>4th</p>
              <img src="/main/default-user.jpg" />
              <p>909884****</p>
              <p>240 points</p>
            </li>
          </ul>
        </WeeklyLeadingBoard>
      </WeeklyLeaderBoardDiv>

      <WeeklyLeaderBoardDiv>
        <Headings type="h3-left">Last week leaderboard winnings </Headings>
        <WeeklyLeadingBoard>
          <div>
            <p>S/n</p>
            <p>Champ</p>
            <p>Phone</p>
            <p>Winnings</p>
          </div>
          <ul>
            <li>
              <p>1st</p>
              <img src="/main/default-user.jpg" />
              <p>909884****</p>
              <p>N 240,000</p>
            </li>

            <li>
              <p>2nd</p>
              <img src="/main/default-user.jpg" />
              <p>909884****</p>
              <p>N 240,000</p>
            </li>

            <li>
              <p>3rd</p>
              <img src="/main/default-user.jpg" />
              <p>909884****</p>
              <p>N 240,000</p>
            </li>
            <li>
              <p>4th</p>
              <img src="/main/default-user.jpg" />
              <p>909884****</p>
              <p>N 240,000</p>
            </li>
          </ul>
        </WeeklyLeadingBoard>
      </WeeklyLeaderBoardDiv>
    </LeaderBoardDiv>
  );
}

export default ReferralLeaderBoard;
