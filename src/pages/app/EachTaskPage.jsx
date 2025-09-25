import { useParams } from "react-router-dom";
import HeaderNavigationBack from "../../ui/HeaderNavigationBack";
import TaskHistoryHeader from "../../features/taskHistory/TaskHistoryHeader";
import { useGetATask } from "../../features/task/useTask";
import styled from "styled-components";
import {
  formatCurrency,
  formatTextCapitalizeFirstLetter,
} from "../../utils/helpers";
import Sidebar from "../../ui/Sidebar";

import DefineRating from "../../ui/DefineRating";
import TaskLoader from "../../features/task/TaskLoader";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: -2rem;
  padding: 2rem 1rem 8rem;
  height: 75vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0rem;
  }
`;

const StyledTaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  background-color: var(--color-grey-0);
  padding: 1rem 1rem;
  border-radius: 9px;
`;

const StyledTaskContainerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  border-bottom: 1px solid var(--color-grey-50);
  padding-bottom: 1rem;
`;

const StyledTaskImageAndTextContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 1rem;

  & p {
    font-size: 1.5rem;
    font-weight: 600;
    text-transform: capitalize;
  }
`;

const StyledTaskImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  overflow: hidden;
  background-color: var(--color-grey-100);

  & img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
  }
`;

const SuccessSpan = styled.span`
  background-color: var(--color-green-backColor);
  color: var(--color-brand-700);
  width: fit-content;
  border-radius: 5px;
  padding: 0.1rem 1rem;
  font-size: 1.1rem;
`;

const NotSuccessSpan = styled.span`
  background-color: #ff440026;
  color: orangered;
  width: fit-content;
  border-radius: 5px;
  padding: 0.1rem 1rem;
  font-size: 1.1rem;
`;

const CostPara = styled.p`
  color: var(--color-brand-700);
  font-size: 1.4rem;
  font-weight: 600;
`;

const CostNoPara = styled.p`
  color: var(--color-grey-300);
  font-size: 1.4rem;
  font-weight: 600;
`;

const RateContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0rem;
`;

const RateMessagePara = styled.p`
  color: var(--color-grey-600);
  font-size: 1.4rem;
`;

function EachTaskPage() {
  const { taskId } = useParams();
  const {
    taskLists,
    totalEarnedToday,
    // isCompleted,
    isLoading,
    packageName,
    totalCompleted,
  } = useGetATask(taskId);

  return (
    <>
      <HeaderNavigationBack text={"Task Details"} />

      <TaskHistoryHeader
        balance={totalEarnedToday}
        balanceTitle={"Reward Claimed"}
        packageName={packageName}
        otherMesage={`Complted ${totalCompleted} task`}
        isLoading={isLoading}
      />

      {isLoading ? (
        <TaskLoader />
      ) : (
        <StyledContainer>
          {taskLists?.map((each, i) => {
            return (
              <StyledTaskContainer key={i}>
                <StyledTaskContainerHeader>
                  <StyledTaskImageAndTextContainer>
                    <StyledTaskImageContainer>
                      <img src={each?.taskImage} alt={each?.taskName} />
                    </StyledTaskImageContainer>

                    <div>
                      <p>{each?.taskName?.slice(0, 30)}</p>
                      {each?.isCompleted ? (
                        <SuccessSpan>Completed</SuccessSpan>
                      ) : (
                        <NotSuccessSpan>Not Completed</NotSuccessSpan>
                      )}
                    </div>
                  </StyledTaskImageAndTextContainer>

                  {each?.isCompleted ? (
                    <CostPara>{formatCurrency(each?.cost)}</CostPara>
                  ) : (
                    <CostNoPara>{formatCurrency(each?.cost)}</CostNoPara>
                  )}
                </StyledTaskContainerHeader>

                {each?.rate ? (
                  <RateContainer>
                    <DefineRating
                      rating={each?.rate}
                      starWidth={"14"}
                      starHeigth={"14"}
                      color="var(--color-brand-700)"
                    />
                    <RateMessagePara>
                      {formatTextCapitalizeFirstLetter(each?.rateMessage)}
                    </RateMessagePara>
                  </RateContainer>
                ) : (
                  ""
                )}
              </StyledTaskContainer>
            );
          })}
        </StyledContainer>
      )}

      <Sidebar />
    </>
  );
}

export default EachTaskPage;
