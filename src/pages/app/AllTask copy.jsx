import { useState } from "react";
import styled, { css } from "styled-components";
import BackButton from "../../ui/BackButton";
import { useSearchParams } from "react-router-dom";

import {
  useGetAllMyTask,
  useGetMyTodaysTask,
} from "../../features/task/useTask";
import useUser from "../../features/authentication/useUser";
import MyActiveTask from "../../features/allActiveTasks/MyActiveTask";
import MyCanceledTask from "../../features/allActiveTasks/MyCanceledTask";
import MyCompletedTask from "../../features/allActiveTasks/MyCompletedTask";
import Spinner from "../../ui/Spinner";
import { useDarkMode } from "../../context/DarkModeContext";
import HeaderNavigationBack from "../../ui/HeaderNavigationBack";
import HeaderTitleTop from "../../ui/HeaderTitleTop";
import { BiCalendar, BiListCheck } from "react-icons/bi";

const StyledAllTask = styled.section`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: -3rem;

  & p {
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    font-size: 1.3rem;
  }
`;

const HeadNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-grey-200);
  padding: 2rem 2rem 1rem;
`;

const Para = styled.p`
  font-size: 1.4rem;
  cursor: pointer;

  ${(props) =>
    props.$isActive === "true" &&
    css`
      font-weight: 600;
      border-bottom: 2px solid var(--color-brand-700);
      color: var(--color-brand-700);
    `}
`;

function AllTask() {
  const { isDarkMode } = useDarkMode();

  const [searchParams] = useSearchParams();
  const taskType = searchParams.get("task");
  const {
    data: {
      id: userId,
      user_metadata: { bank },
    },
  } = useUser();

  const [pageView, setPageView] = useState(
    taskType === "all" ? "completed" : "active"
  );
  const { todaysTask, isLoading: isTodaysTask } = useGetMyTodaysTask(userId);
  const { allMyTask, isLoading: isGettingAll } = useGetAllMyTask(userId);

  if (isTodaysTask || isGettingAll) return <Spinner />;

  return (
    <>
      <HeaderTitleTop text={"My Task"} icon={<BiListCheck />} />
      <StyledAllTask>
        <HeadNavigation>
          <Para
            onClick={() => setPageView("active")}
            $isActive={(pageView === "active")?.toString()}
          >
            Active
          </Para>

          <Para
            onClick={() => setPageView("canceled")}
            $isActive={(pageView === "canceled")?.toString()}
          >
            Canceled
          </Para>

          <Para
            onClick={() => setPageView("completed")}
            $isActive={(pageView === "completed")?.toString()}
          >
            Completed
          </Para>
        </HeadNavigation>

        {pageView === "active" && (
          <MyActiveTask
            todaysTask={todaysTask}
            bank={bank}
            isDarkMode={isDarkMode?.toString()}
          />
        )}

        {pageView === "canceled" && (
          <MyCanceledTask
            todaysTask={todaysTask[0]}
            isDarkMode={isDarkMode?.toString()}
          />
        )}

        {pageView === "completed" && (
          <MyCompletedTask
            allMyTask={allMyTask}
            isDarkMode={isDarkMode?.toString()}
          />
        )}
      </StyledAllTask>
    </>
  );
}

export default AllTask;
