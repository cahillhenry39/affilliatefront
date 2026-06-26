import styled from "styled-components";
import TaskStats from "../../features/task/TaskStats";
import Headings from "../../ui/Headings";
import { Link, useNavigate } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";
import useUser from "../../features/authentication/useUser";
import {
  useCreateMyTodaysTask,
  useGetAllMyTask,
  useGetMyTodaysTask,
} from "../../features/task/useTask";
import { useGetAPackage } from "../../features/allPackage/usePackage";
import { useQueryClient } from "@tanstack/react-query";
import SpinnerAndText from "../../ui/SpinnerAndText";
import { useEffect, useState } from "react";
import Spinner from "../../ui/Spinner";
import { useGetAllAvailableTask } from "../../features/allActiveTasks/useAllTask";
import { differenceInCalendarDays, isWeekend } from "date-fns";
import Button from "../../ui/Button";
import LogoMarquee from "../../ui/LogoMarquee";
import {
  useGetMyReferralAccount,
  useGetMyReferrals,
} from "../../features/referral/useReferral";
import Modal from "../../ui/Modal";
import NoReferralWarning from "../../ui/NoReferralWarning";

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
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const ImportantInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;

  & p {
    font-size: 1.2rem;
    color: var(--color-brand-100);
  }
`;

function Task() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [progressBar, setProgressBar] = useState(0);
  const {
    data: { id: userId },
    userPackageId,
    userPackageTitle,
  } = useUser();

  const { todaysTask, isLoading: isTodaysTask } = useGetMyTodaysTask(userId);
  const { allMyTask, isLoading: isAllMyTask } = useGetAllMyTask(userId);
  const { myPackageSubscription, isLoading } = useGetAPackage(userPackageId);

  const { createMyTask, isPending: isCreateTask } = useCreateMyTodaysTask();

  const { allAvailableTask, isLoading: isTask } = useGetAllAvailableTask();

  const { myReferrals, isLoading: isReferral } = useGetMyReferrals(userId);
  const { myReferralAccount, isLoading: isMyReferral } =
    useGetMyReferralAccount(userId);

  const {
    id: packageId,
    eachTaskEarns,
    totalDailyTask,
    title,
    cost,
  } = myPackageSubscription?.[0] || {};

  const { performedTask, totalTask } = todaysTask?.[0] || {};

  function handleGetTodaysTask() {
    const startToSlice = Math.floor(
      Math.random() * (allAvailableTask.length - totalDailyTask)
    );
    const stopToSlice = Number(startToSlice) + Number(totalDailyTask);

    const myTask = allAvailableTask
      .slice(startToSlice, stopToSlice)
      .map((el) => {
        return { ...el, isCompleted: false, isPerformed: false };
      });

    const newTask = {
      packageName: title,
      packageCost: cost,
      totalTask: totalDailyTask,
      payPerTask: eachTaskEarns,
      isCompleted: false,
      usersId: userId,
      packageId,
      performedTask: 0,
      myTask: JSON.stringify(myTask),
    };

    createMyTask(newTask, {
      onSuccess: () => {
        queryClient.invalidateQueries();
        navigate("/app/all_task?task=my_todays_task");
      },
    });
  }

  useEffect(
    function () {
      if (todaysTask?.length) {
        const percentage = (performedTask / totalTask) * 100;
        setProgressBar(percentage);
      }
    },
    [performedTask, setProgressBar, todaysTask?.length, totalTask]
  );

  if (
    isTodaysTask ||
    isLoading ||
    isTask ||
    isAllMyTask ||
    isReferral ||
    isMyReferral
  )
    return <Spinner />;

  const hasReferred = myReferrals.filter(
    (each) =>
      differenceInCalendarDays(new Date(), new Date(each.created_at)) <= 7
  );

  const isNewUser =
    differenceInCalendarDays(
      new Date(),
      new Date(myReferralAccount?.[0].created_at)
    ) <= 7;

  const isUserRegistered =
    Number(hasReferred?.[0]?.amountPaidToReferral) > 3500;

  // const result = differenceInCalendarDays(
  //   new Date(2024, 4, 18),
  //   new Date(2024, 4, 12)
  // );

  // console.log(hasReferred, isNewUser, isUserRegistered);

  return (
    <TaskSection>
      <Imagediv>
        <img src="/gif/3.gif" />
      </Imagediv>

      <LogoMarquee />

      <TaskSectionContainer>
        <TaskStats totalTaskToday={totalDailyTask} userId={userId} />

        <TaskForm>
          <StyledProgressBar>
            <ProgressBarTitle>
              <p>Progress Bar</p>
              {todaysTask?.length ? (
                <p>{`${performedTask}/${totalTask}`}</p>
              ) : (!hasReferred?.length &&
                  !isNewUser &&
                  !isUserRegistered &&
                  allMyTask.length < 3) ||
                (Boolean(hasReferred?.length) &&
                  !isNewUser &&
                  !isUserRegistered &&
                  allMyTask.length < 3) ? (
                <p>Refer to Perform Task</p>
              ) : (
                <p>Not Started Yet</p>
              )}
            </ProgressBarTitle>

            <ProgressBar
              completed={Math.trunc(progressBar)}
              bgColor="#4338ca"
            />
          </StyledProgressBar>

          {allMyTask.length >= 3 && userPackageTitle === "BM0" ? (
            <ButtonLinksDiv>
              <Link to="/app/all_package">
                <Button type="primary">Subscribe To a package</Button>
              </Link>
            </ButtonLinksDiv>
          ) : (
            <ButtonLinksDiv>
              {isWeekend(new Date()) ? (
                <Button type="primary" disabled={true}>
                  No task today
                </Button>
              ) : (!hasReferred?.length &&
                  !isNewUser &&
                  !isUserRegistered &&
                  allMyTask.length < 3) ||
                (Boolean(hasReferred?.length) &&
                  !isNewUser &&
                  !isUserRegistered &&
                  allMyTask.length < 3) ? (
                <Modal>
                  <Modal.Open opens="warning_referral">
                    <Button type="adminBtn-cancel">Click Here</Button>
                  </Modal.Open>

                  <Modal.Window name="warning_referral">
                    <NoReferralWarning
                      referralURL={myReferralAccount?.[0]?.referralUrl}
                      onCloseModal
                    />
                  </Modal.Window>
                </Modal>
              ) : todaysTask?.length ? (
                <Link to="/app/all_task?task=my_todays_task">
                  <Button type="secondary">{`${
                    progressBar === 100
                      ? "Task completed"
                      : "continue with task"
                  }`}</Button>
                </Link>
              ) : (
                <Button type="secondary" onClick={handleGetTodaysTask}>
                  {isCreateTask ? (
                    <SpinnerAndText message="Setting up" />
                  ) : (
                    " Get Todays task"
                  )}
                </Button>
              )}

              {userPackageTitle === "BM0" ? (
                <Link to="/app/all_package">
                  <Button type="primary">Subscribe Here</Button>
                </Link>
              ) : (
                <Link to="/app/all_task?task=all">
                  <Button type="secondary">Open all task</Button>
                </Link>
              )}
            </ButtonLinksDiv>
          )}
        </TaskForm>

        <ImportantInfo>
          <Headings $color type="h4">
            Important Notice
          </Headings>
          <p>Always perform all your task daily.</p>
        </ImportantInfo>
      </TaskSectionContainer>
    </TaskSection>
  );
}

export default Task;
