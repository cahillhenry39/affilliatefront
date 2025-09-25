import styled, { css } from "styled-components";
import { useValidateUsersTask } from "./useTask";
import TaskStats from "./TaskStats";
import Button from "../../ui/Button";
import SpinnerAndText from "../../ui/SpinnerAndText";
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TaskHelpContent from "./TaskHelpContent";

const TaskSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
`;

const TaskForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: var(--color-grey-0);
  padding: 1.5rem;
  box-shadow: 0 2px 5px #00000018;
  border-radius: 9px;

  position: relative;
`;

const StyledProgressBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-bottom: 1px solid var(--color-grey-100);
  padding-bottom: 1rem;
`;

const ProgressBarTitle = styled.div`
  display: flex;
  justify-content: space-between;
  & p {
    font-size: 1.4rem;
  }
`;

const ButtonLinksDiv = styled.div`
  display: grid;
  gap: 1rem;

  ${(props) =>
    props.$isHighestSubscription === "true" || props.$isOverDoneTask === "true"
      ? css`
          grid-template-columns: 1fr;
        `
      : css`
          grid-template-columns: 1fr 1fr;
        `}
`;

const ImportantInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.51rem;

  & h3 {
    font-size: 1.5rem;
    color: var(--color-brand-700);
    margin-bottom: 1rem;
  }

  & p {
    font-size: 1.2rem;
    color: var(--color-grey-700);
  }
`;

const FooterMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  & h3 {
    font-size: 1.3rem;
    color: var(--color-brand-800);
  }
`;

const RulesSpan = styled.span`
  font-size: 1.2rem;
  /* color: var(--color-grey-500); */
  background-color: var(--color-grey-0);
  padding: 0.21rem 1rem;
  width: fit-content;
  border-radius: 9px;
  align-self: flex-start;
  cursor: pointer;
  color: orangered;

  position: absolute;
  top: -1.5rem;
  right: 0rem;
`;

function TaskContent({
  handleGetTodaysTask,
  isPending,

  currentUser,
  taskCompleted,
}) {
  const [showTips, setShowTips] = useState(false);

  const navigate = useNavigate();

  const {
    todaysTasks,
    totalDailyTask,
    totalTodaysTaskDone,
    totalEarnedToday,
    isNotSubscribed,
    isHighestSubscription,
    isOverDoneTask,
  } = useValidateUsersTask(currentUser?.id);

  const progressBar = Math.round((totalTodaysTaskDone / totalDailyTask) * 100);

  return (
    <TaskSectionContainer>
      <TaskStats
        totalTaskToday={totalDailyTask}
        totalEarnedToday={totalEarnedToday}
        userId={currentUser?.id}
      />

      <TaskForm>
        {isNotSubscribed ? (
          <RulesSpan onClick={() => setShowTips(true)}>Help</RulesSpan>
        ) : (
          ""
        )}
        <StyledProgressBar>
          <ProgressBarTitle>
            <p>Progress Bar</p>

            <p>
              {totalTodaysTaskDone}/{totalDailyTask}
            </p>
          </ProgressBarTitle>

          <ProgressBar
            completed={Math.trunc(progressBar)}
            bgColor="var(--color-brand-700)"
          />
        </StyledProgressBar>

        <ButtonLinksDiv
          $isHighestSubscription={isHighestSubscription?.toString()}
          $isOverDoneTask={isOverDoneTask?.toString()}
        >
          {!isOverDoneTask ? (
            <Button type="secondary" onClick={handleGetTodaysTask}>
              {isPending ? (
                <SpinnerAndText message={"Processing"} />
              ) : !todaysTasks?.length && totalTodaysTaskDone === 0 ? (
                "Start Task"
              ) : taskCompleted ? (
                "View Task"
              ) : (
                "Continue Task"
              )}
            </Button>
          ) : (
            ""
          )}

          {isNotSubscribed ? (
            <Button
              type="primary"
              onClick={() => navigate("/app/account/details")}
            >
              {isOverDoneTask ? "subscribe to earn more!" : `Subscribe Here`}
            </Button>
          ) : (
            ""
          )}

          {!isHighestSubscription && !isNotSubscribed ? (
            <Button
              type="primary"
              onClick={() => navigate("/app/account/details")}
            >
              Upgrade Level
            </Button>
          ) : (
            ""
          )}
        </ButtonLinksDiv>
      </TaskForm>

      <ImportantInfo>
        <h3>Important Suggestions</h3>
        <p>1. Always perform all your task daily.</p>
        <p>2. The more you perform tasks, the more you earn.</p>
        <p>3. Please rate responsibly.</p>
        <p>4. Do not write repeated messages.</p>
      </ImportantInfo>

      <FooterMessage>
        <h3>Happy Tasking !!!</h3>
      </FooterMessage>

      <TaskHelpContent
        showMini={showTips}
        setShowMini={() => setShowTips(false)}
        isOverDoneTask={isOverDoneTask}
        isNotSubscribed={isNotSubscribed}
      />
    </TaskSectionContainer>
  );
}

export default TaskContent;
