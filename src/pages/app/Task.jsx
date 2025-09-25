import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import useUser from "../../features/authentication/useUser";
import {
  useCreateMyTodaysTask,
  useValidateUsersTask,
} from "../../features/task/useTask";
import { useQueryClient } from "@tanstack/react-query";

import LogoMarquee from "../../ui/LogoMarquee";

import Sidebar from "../../ui/Sidebar";
import TaskContent from "../../features/task/TaskContent";
import TaskLoader from "../../features/task/TaskLoader";

const TaskSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const Imagediv = styled.div`
  width: 100%;
  display: flex;

  & img {
    height: 18rem;
    width: 100%;
    margin: 0 auto;
    box-shadow: 0 1px 5px #00000011;
  }
`;

function Task() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: currentUser, userPackageTitle, allPackages } = useUser();

  const { todaysTasks, totalDailyTask, totalTodaysTaskDone, isLoading } =
    useValidateUsersTask(currentUser?.id);

  const taskCompleted = totalTodaysTaskDone === totalDailyTask;

  const { createMyTask, isPending } = useCreateMyTodaysTask();

  function handleGetTodaysTask() {
    if (todaysTasks?.length && (taskCompleted || totalTodaysTaskDone > 0)) {
      navigate("/app/task/today");
      return;
    }

    if (todaysTasks?.length && totalTodaysTaskDone === 0) {
      navigate("/app/task/today");
      return;
    }

    createMyTask(
      {},
      {
        onSuccess: () => {
          queryClient.invalidateQueries();
          navigate("/app/task/today");
        },
      }
    );
  }

  return (
    <>
      <TaskSection>
        <Imagediv>
          <img src="/gif/3.gif" />
        </Imagediv>

        <LogoMarquee />

        {isLoading ? (
          <TaskLoader />
        ) : (
          <TaskContent
            handleGetTodaysTask={handleGetTodaysTask}
            isPending={isPending}
            taskCompleted={taskCompleted}
            currentUser={currentUser}
            userPackageTitle={userPackageTitle}
            allPackages={allPackages}
          />
        )}
      </TaskSection>

      <Sidebar />
    </>
  );
}

export default Task;
