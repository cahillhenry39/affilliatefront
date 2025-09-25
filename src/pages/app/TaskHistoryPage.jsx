import styled from "styled-components";
import TaskHistoryHeader from "../../features/taskHistory/TaskHistoryHeader";
import HeaderNavigationBack from "../../ui/HeaderNavigationBack";
import { useGetAllMyTask } from "../../features/task/useTask";
import EachTaskHistory from "../../features/taskHistory/EachTaskHistory";
import { formatDate2 } from "../../utils/helpers";
import { ListTodo, ListX } from "lucide-react";
import TaskLoader from "../../features/task/TaskLoader";
import EmptyList from "../../ui/EmptyList";

const StyledContainer = styled.div`
  overflow: hidden;
  height: 90vh;
`;

const StyledMainContainerNavigation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: -2rem;
  padding: 2rem 0rem 8rem;
  height: 75vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0rem;
  }
`;

const StyledTaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.3rem;

  background-color: var(--color-grey-0);
  height: 100vh;
  margin: 0rem 1rem;
  padding: 2rem 1rem 6rem;
  border-top-right-radius: 9px;
  border-top-left-radius: 9px;
`;

const StyledTaskHeaderSPan = styled.span`
  font-size: 1.3rem;
  color: var(--color-grey-500);
  margin-bottom: 1rem;
`;

function TaskHistoryPage() {
  const { allTask, totalEarned, userPackageTitle, isLoading } =
    useGetAllMyTask();

  return (
    <>
      <HeaderNavigationBack text={"Task History"} />
      <TaskHistoryHeader
        balance={totalEarned}
        packageName={userPackageTitle}
        isLoading={isLoading}
      />

      {isLoading ? (
        <TaskLoader />
      ) : (
        <StyledContainer>
          {!allTask?.length ? (
            <EmptyList />
          ) : (
            <StyledTaskContainer>
              <StyledTaskHeaderSPan>Task Listings</StyledTaskHeaderSPan>

              <StyledMainContainerNavigation>
                {allTask?.map((each, i) => {

                  return (
                    <EachTaskHistory
                      key={i}
                      icon={each?.isCompleted ? <ListTodo /> : <ListX />}
                      title={`Created on ${formatDate2(
                        new Date(each?.created_at)
                      )}`}
                      link={`${each?.id}`}
                      isCompleted={each?.isCompleted}
                    />
                  );
                })}
              </StyledMainContainerNavigation>
            </StyledTaskContainer>
          )}
        </StyledContainer>
      )}
    </>
  );
}

export default TaskHistoryPage;
