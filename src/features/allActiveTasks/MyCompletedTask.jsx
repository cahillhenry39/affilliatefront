import styled, { css } from "styled-components";
import { sortArrayDesc } from "../../utils/helpers";
import EmptyData from "../../ui/EmptyData";

const StyledTaskAppDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const EachStyledTaskApp = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const AppContent = styled.div`
  display: grid;
  grid-template-columns: 0.3fr 1fr 0.4fr;
  column-gap: 1rem;

  & img {
    width: 100%;
    border-radius: 1rem;
  }

  & div {
    display: flex;
    flex-direction: column;

    & h3 {
      font-size: 1.3rem;
    }

    & span {
      font-size: 1rem;
    }
  }

  ${(props) =>
    props.$isDarkMode === "true" &&
    css`
      & h3 {
        color: var(--color-brand-700);
      }
    `}
`;

function MyCompletedTask({ allMyTask }) {
  if (!allMyTask?.length)
    return (
      <EmptyData
        message="You have not completed any task yet."
        notFull={true}
        image={"/noTask.png"}
      />
    );

  const tasks = allMyTask
    ?.flatMap((each) => {
      return JSON.parse(each.myTask);
    })
    ?.filter((each) => each.isPerformed === true || each.isCompleted === true);

  const sortedData = sortArrayDesc(tasks);

  return (
    <StyledTaskAppDiv>
      {sortedData?.map((each, i) => (
        <EachStyledTaskApp key={i}>
          <AppContent>
            <img src={each.taskImage} alt={each.taskName} />

            <div>
              <h3>{each.taskName}</h3>
              <span>{`${each.totalDownload} ${
                each.action === "download" ? "downloads" : "views"
              }`}</span>
              <span>{each.taskName}</span>
            </div>

            <div>
              <h3>Task Done</h3>
            </div>
          </AppContent>
        </EachStyledTaskApp>
      ))}
    </StyledTaskAppDiv>
  );
}

export default MyCompletedTask;
