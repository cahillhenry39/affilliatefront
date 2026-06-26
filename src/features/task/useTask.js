import { useMutation, useQuery } from "@tanstack/react-query";
import {
  checkAndValidateTask,
  claimTodaysTaskEarnings,
  createATodayTask,
  getMyATask,
  getMyPastTask,
  updateMyTodaysTask,
} from "../../services/apiTasks";
import toast from "react-hot-toast";

export function useValidateUsersTask(userId) {
  const { data, isLoading } = useQuery({
    queryFn: () => checkAndValidateTask(),

    queryKey: ["validate_users_task", userId],
  });

  return {
    todaysTasks: data?.todaysTasks,
    totalUserTask: data?.totalUserTask,
    totalDailyTask: data?.totalDailyTask,
    totalTodaysTaskDone: data?.totalTodaysTaskDone,
    totalEarnedToday: data?.totalEarnedToday,
    isNotSubscribed: data?.isNotSubscribed,
    isHighestSubscription: data?.isHighestSubscription,
    totalAmountNotClaimed: data?.totalAmountNotClaimed,
    mainTaskId: data?.mainTaskId,
    taskPaymentClaimed: data?.taskPaymentClaimed,
    isOverDoneTask: data?.isOverDoneTask,
    isLoading,
  };
}

export function useGetAllMyTask() {
  const { data, isLoading } = useQuery({
    queryFn: () => getMyPastTask(),

    queryKey: ["my_past_task_all"],
  });

  return {
    allTask: data?.allTask,
    total: data?.total,
    page: data?.page,
    perPage: data?.perPage,
    totalEarned: data?.totalEarned,
    userPackageTitle: data?.userPackageTitle,
    isLoading,
  };
}

export function useGetATask(taskId) {
  const { data, isLoading } = useQuery({
    queryFn: () => getMyATask(taskId),

    queryKey: ["a_single_task_", taskId],
  });

  return {
    taskLists: data?.taskLists,
    totalEarnedToday: data?.totalEarnedToday,
    packageName: data?.packageName,
    totalTask: data?.totalTask,
    isCompleted: data?.isCompleted,
    totalCompleted: data?.totalCompleted,
    isLoading,
  };
}

export function useCreateMyTodaysTask() {
  const { mutate: createMyTask, isPending } = useMutation({
    mutationFn: createATodayTask,

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createMyTask, isPending };
}

export function useUpdateMyTodaysTask() {
  const { mutate: updateTodaysTask, isPending } = useMutation({
    mutationFn: updateMyTodaysTask,

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateTodaysTask, isPending };
}

export function useClaimTodaysTaskEarnings() {
  const { mutate: claimRewardHandler, isPending } = useMutation({
    mutationFn: claimTodaysTaskEarnings,

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { claimRewardHandler, isPending };
}
