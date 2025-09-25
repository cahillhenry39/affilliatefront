import styled, { css, keyframes } from "styled-components";
import Button from "../../ui/Button";
import { useState } from "react";
import {
  useClaimTodaysTaskEarnings,
  useUpdateMyTodaysTask,
} from "../task/useTask";
import { useQueryClient } from "@tanstack/react-query";
import { formatCurrency } from "../../utils/helpers";
import SpinnerAndText from "../../ui/SpinnerAndText";
import StarRating from "../../ui/StarRating";
import toast from "react-hot-toast";
import Headings from "../../ui/Headings";
import FormRow from "../../ui/FormRow";

// import { FaTrophy } from "react-icons/fa";
//  <FaTrophy style={{ marginRight: "8px", color: "#ffd700" }} />;

import Textarea from "../../ui/TextArea";
import ClaimRewardActionButton from "../../ui/ClaimRewardActionButton";
import confetti from "canvas-confetti";
import EmptyList from "../../ui/EmptyList";

const coloringAndExpand = keyframes`
0% {    color: red; transform: scale(1);}
  25% { color: orange; transform: scale(1.2); }
  50% { color: #9ee69e; transform: scale(1); }
  75% { color: #9ed199; transform: scale(1.2);}
  100% { color: red; transform: scale(1);} 

`;

const StyledTaskAppDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 2rem 1rem 12rem;

  height: 80vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0rem;
  }
`;

const EachStyledTaskApp = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &:not(:last-of-type) {
    border-bottom: 1px solid var(--color-grey-50);
  }
`;

const AppContent = styled.div`
  display: grid;
  grid-template-columns: 0.3fr 1fr 0.4fr;
  column-gap: 1rem;
  padding-bottom: 2rem;

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

const StarRatingForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: var(--color-grey-0);
  border-radius: 9px;
  padding: 2rem 2rem;
`;

const ErrorMessage = styled.p`
  font-size: 1.2rem;
  color: orangered;
`;

const ButtonWrapperContainer = styled.div`
  position: fixed;
  bottom: 7rem;
  left: 0;
  width: 100%;
  margin: 0 auto !important;
  z-index: 999;
  display: flex;
  justify-content: center;
`;

const RateAndEarnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.21rem;

  & button {
    text-transform: uppercase;
    font-weight: 600;
    border: none;
    border-radius: var(--border-radius-sm);
    color: var(--color-grey-0);

    background-color: var(--color-grey-800);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    font-size: 1.1rem;
    padding: 0.41rem 2rem;
    animation: ${(props) => props.$animationTimer}s ${coloringAndExpand}
      infinite;

    &:disabled {
      background-color: var(--color-grey-50);
      color: var(--color-grey-300);
      animation: none;
    }
  }
`;

const EarnAmaount = styled.aside`
  color: var(--color-brand-700);
  font-size: 1.1rem;
`;

function MyActiveTask({
  todaysTasks,
  totalAmountNotClaimed,
  mainTaskId,
  taskPaymentClaimed,
}) {
  const queryClient = useQueryClient();

  const [rate, setRate] = useState("");
  const [rateMessage, setRateMessage] = useState("");
  const [isSelectedATask, setisSelectedATask] = useState("");
  const [error, setError] = useState("");
  const [isRateFinished, setIsRatingFinished] = useState(false);

  const { updateTodaysTask, isPending } = useUpdateMyTodaysTask();
  const { claimRewardHandler, isPending: isClaimingReward } =
    useClaimTodaysTaskEarnings();

  const isWorking = isPending;

  if (!todaysTasks?.length)
    return <EmptyList message="No Tasks Yet" imageLink={"/timer.svg"} />;

  function handleClaimReward() {
    claimRewardHandler(
      { mainTaskId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries();

          confetti({
            particleCount: 350,
            spread: 90,
            origin: { y: 0.6 },
          });

          toast.success(
            `You have successfully claimed ${formatCurrency(
              totalAmountNotClaimed
            )}`
          );
        },
      }
    );
  }

  function handleRating() {
    if (!rate) {
      toast.error("You need to rate at least 4 stars");
      return;
    }

    if (!rateMessage) {
      toast.error("You need to write a good comments");
      return;
    }

    if (rateMessage.length < 40) {
      toast.error("Comment must be above 40 letters long");
      return;
    }

    if (rate < 4) {
      setError("You need to rate at least 4 stars");
      setTimeout(() => {
        setError("");
      }, 4000);
      return;
    }

    const updatedData = {
      taskId: isSelectedATask,
      rate,
      rateMessage,
    };
    updateTodaysTask(updatedData, {
      onSuccess: () => {
        queryClient.invalidateQueries();
        setIsRatingFinished(true);

        confetti({
          particleCount: 350,
          spread: 90,
          origin: { y: 0.6 },
        });

        setTimeout(() => {
          setisSelectedATask("");
          setIsRatingFinished(false);
          setRateMessage("");
          setRate("");
        }, 2000);
      },
    });
  }

  return (
    <StyledTaskAppDiv>
      {todaysTasks.map((each, i) => (
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

            {each.action === "rate" &&
              (each.isPerformed ? (
                <RateAndEarnContainer>
                  <button disabled={true}>completed</button>
                </RateAndEarnContainer>
              ) : (
                <RateAndEarnContainer $animationTimer={(i + 1) * 6}>
                  <EarnAmaount>Earn {formatCurrency(each?.cost)}</EarnAmaount>
                  <button
                    disabled={isSelectedATask}
                    onClick={() => setisSelectedATask(each.id)}
                  >
                    rate
                  </button>
                </RateAndEarnContainer>
              ))}
          </AppContent>

          {isSelectedATask === each.id ? (
            <StarRatingForm>
              {!isRateFinished ? (
                <>
                  <StarRating
                    color="var(--color-brand-700)"
                    starWidth="22"
                    starHeigth="22"
                    size={20}
                    onSetRating={setRate}
                  />

                  <FormRow label="Comment" must>
                    <Textarea
                      placeholder="Please write good comment here"
                      value={rateMessage}
                      onChange={(e) => {
                        setRateMessage(e.target.value);
                      }}
                    />
                  </FormRow>

                  {error ? <ErrorMessage>{error}</ErrorMessage> : ""}

                  <Button type="primary" onClick={handleRating}>
                    {isWorking ? (
                      <SpinnerAndText messsage="processing" />
                    ) : (
                      `rate ${each.taskName}`
                    )}
                  </Button>
                </>
              ) : (
                <Headings type="h3">Rating successful</Headings>
              )}
            </StarRatingForm>
          ) : (
            ""
          )}
        </EachStyledTaskApp>
      ))}

      <ButtonWrapperContainer>
        <ClaimRewardActionButton
          totalDone={
            todaysTasks?.filter(
              (each) => each?.isPerformed && each?.isCompleted
            )?.length
          }
          totalAmountNotClaimed={totalAmountNotClaimed}
          totalTask={todaysTasks?.length}
          claimed={taskPaymentClaimed}
          isWorking={isClaimingReward}
          handleSubmit={handleClaimReward}
        />
      </ButtonWrapperContainer>
    </StyledTaskAppDiv>
  );
}

export default MyActiveTask;
