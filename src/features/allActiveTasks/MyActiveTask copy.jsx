import styled, { css } from "styled-components";
import EmptyData from "../../ui/EmptyData";
import Button from "../../ui/Button";
import { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { useUpdateMyTodaysTask } from "../task/useTask";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateUser } from "../settings/useUpdateUser";
import { useCreateATransaction } from "../transaction/useTransaction";
import { generateRandomChar } from "../../utils/helpers";
import SpinnerAndText from "../../ui/SpinnerAndText";
// import FormRow from "../../ui/FormRow";
// import Textarea from "../../ui/TextArea";
import StarRating from "../../ui/StarRating";
import toast from "react-hot-toast";
import Headings from "../../ui/Headings";
import { useCreateActivity } from "../activities/useActivities";

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

const StyledButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & button {
    color: var(--color-green-100);
    background-color: var(--color-green-700);
    font-size: 1rem;
    padding: 0.4rem 1rem;
    width: 10rem;

    &:disabled {
      background-color: #9ca3af;
      color: #f3f4f6;
    }
  }
`;

const DownloadSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 3rem;

  & p {
    font-size: 1.2rem;
    text-align: center;
  }
`;

const StarRatingForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  background-color: var(--color-grey-100);
  padding: 2rem 2rem;
`;

const ErrorMessage = styled.p`
  font-size: 1.2rem;
  color: orangered;
`;

function MyActiveTask({ todaysTask, bank, isDarkMode }) {
  const queryClient = useQueryClient();

  const [isTasking, setIsTasking] = useState("");
  const [percentage, setPercentage] = useState(0);

  const [rate, setRate] = useState("");
  // const [rateMessage, setRateMessage] = useState("");
  const [isRating, setIsRating] = useState("");
  const [error, setError] = useState("");
  const [isRateProcessing, setIsRatinProcess] = useState(false);
  const [isRateFinished, setIsRatingFinished] = useState(false);

  const { id, performedTask, payPerTask, totalTask, myTask } =
    todaysTask[0] || {};

  const taskToPerform = myTask
    ? JSON.parse(myTask)?.filter((el) => el.isPerformed === false)
    : [];

  const { updateTodaysTask, isPending } = useUpdateMyTodaysTask();
  const { updateUser, isPending: isUpdating } = useUpdateUser();
  const { createTransaction, isPending: isTransact } = useCreateATransaction();

  const { createActivity, isPending: isActivity } = useCreateActivity();

  const isWorking = isPending || isUpdating || isTransact || isActivity;

  useEffect(
    function () {
      const TransactionInterval = setInterval(() => {
        if (percentage >= 100) {
          return;
        }

        setPercentage((percentage) => percentage + 10);
      }, 4000);

      if (percentage >= 100) {
        clearInterval(TransactionInterval);

        return;
      }

      return () => clearInterval(TransactionInterval);
    },

    [isTasking, percentage]
  );

  if (!taskToPerform?.length)
    return (
      <EmptyData
        message="There is no task for you."
        notFull={true}
        image={"/noTask.png"}
      />
    );

  function handleClaimReward(taskId) {
    // 1) update the taskToPerform parent to cmpleted,

    const updatedTask = taskToPerform.find((el) => el.id === taskId);
    const filteredTask = taskToPerform.filter((el) => el.id !== taskId);

    const newArrr = [
      ...filteredTask,
      { ...updatedTask, isPerformed: true, isCompleted: true },
    ];

    const updatedTodaysTask = {
      performedTask: Number(performedTask) + 1,
      isCompleted:
        Number(performedTask) === Number(totalTask) - 1 ? true : false,
      myTask: JSON.stringify(newArrr),
    };
    updateTodaysTask(
      { id, updatedTodaysTask },
      {
        onSuccess: () => {
          // 2) credit user with the amount,

          updateUser(
            { bank: { ...bank, balance: bank.balance + payPerTask } },
            {
              //3) create transaction revenue details,
              onSuccess: (data) => {
                const {
                  id,
                  user_metadata: { personal },
                } = data.user;
                const { phoneNum, avatar } = personal;

                const newActivity = {
                  usersPhoneNum: phoneNum,
                  avatar,
                  amount: payPerTask,
                  message: "User Completed a task",
                  type: "task",
                  usersId: id,
                };

                createActivity(newActivity);

                const newTransaction = {
                  userId: id,
                  amount: payPerTask,
                  reference: "invoice-" + generateRandomChar(5),
                  message: "Task done",
                  type: "revenue",
                  status: "success",
                };

                //4) set isTasking to null and percentage to 0
                //4) invalidate queriess
                createTransaction(newTransaction, {
                  onSuccess: () => {
                    queryClient.invalidateQueries();
                    setIsTasking("");
                    setRate("");
                    // setRateMessage("");
                    setIsRating("");
                    setIsRatinProcess(false);
                    setIsRatingFinished(false);
                    setPercentage(0);
                  },
                });
              },
            }
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

    // if (!rateMessage) {
    //   toast.error("You need to write a good comments");
    //   return;
    // }

    // if (rateMessage.length < 40) {
    //   toast.error("Comment must be above 50 letters long");
    //   return;
    // }

    if (rate < 4) {
      setError("You need to rate at least 4 stars");
      return;
    }

    // if (rate && rateMessage) {
    if (rate) {
      setIsRatinProcess(true);

      setTimeout(() => {
        setIsRatingFinished(true);
        setIsRatinProcess(false);
      }, 5000);
    }
  }

  return (
    <StyledTaskAppDiv>
      {taskToPerform.map((each, i) => (
        <EachStyledTaskApp key={i}>
          <AppContent $isDarkMode={isDarkMode}>
            <img src={each.taskImage} alt={each.taskName} />

            <div>
              <h3>{each.taskName}</h3>
              <span>{`${each.totalDownload} ${
                each.action === "download" ? "downloads" : "views"
              }`}</span>
              <span>{each.taskName}</span>
            </div>

            <StyledButton>
              {each.action === "download" &&
                (percentage >= 100 && isTasking === each.id ? (
                  <Button
                    type="adminBtn"
                    onClick={() => handleClaimReward(each.id)}
                  >
                    {isWorking ? (
                      <SpinnerAndText message="processing" />
                    ) : (
                      "claim reward"
                    )}
                  </Button>
                ) : (
                  <Button
                    type="adminBtn"
                    disabled={isTasking || isRating}
                    onClick={() => setIsTasking(each.id)}
                  >
                    install
                  </Button>
                ))}

              {each.action === "watch" && (
                <Button type="adminBtn" disabled={isTasking || isRating}>
                  watch
                </Button>
              )}

              {each.action === "rate" &&
                (isRateFinished && isRating === each.id ? (
                  <Button
                    type="adminBtn"
                    onClick={() => handleClaimReward(each.id)}
                  >
                    {isWorking ? (
                      <SpinnerAndText message="processing" />
                    ) : (
                      "claim reward"
                    )}
                  </Button>
                ) : (
                  <Button
                    type="adminBtn"
                    disabled={isTasking || isRating}
                    onClick={() => setIsRating(each.id)}
                  >
                    rate
                  </Button>
                ))}
            </StyledButton>
          </AppContent>

          {isTasking === each.id ? (
            <DownloadSection>
              {percentage >= 100 ? <p>Downloaded</p> : <p>Downloading...</p>}
              <div>
                <ProgressBar
                  completed={percentage}
                  maxCompleted={100}
                  bgColor="#4338ca"
                  height="15px"
                  width="100%"
                />
              </div>
            </DownloadSection>
          ) : (
            ""
          )}

          {isRating === each.id ? (
            <StarRatingForm>
              {!isRateFinished ? (
                <>
                  <StarRating
                    color="#4338ca"
                    starWidth="22"
                    starHeigth="22"
                    size={20}
                    onSetRating={setRate}
                  />

                  {/* <FormRow label="Comment" must>
                    <Textarea
                      placeholder="Please write good comment here"
                      value={rateMessage}
                      onChange={(e) => {
                        setRateMessage(e.target.value);
                      }}
                    />
                  </FormRow> */}

                  {error ? <ErrorMessage>{error}</ErrorMessage> : ""}

                  <Button type="primary" onClick={handleRating}>
                    {isRateProcessing ? (
                      <SpinnerAndText messsage="rating" />
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
    </StyledTaskAppDiv>
  );
}

export default MyActiveTask;
