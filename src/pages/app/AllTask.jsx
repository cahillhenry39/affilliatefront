import { useValidateUsersTask } from "../../features/task/useTask";
import useUser from "../../features/authentication/useUser";
import MyActiveTask from "../../features/allActiveTasks/MyActiveTask";
import HeaderTitleTop from "../../ui/HeaderTitleTop";
import { BiListCheck } from "react-icons/bi";
import Sidebar from "../../ui/Sidebar";
import TaskLoader from "../../features/task/TaskLoader";

function AllTask() {
  const { data: currentUser } = useUser();

  const {
    todaysTasks,
    totalAmountNotClaimed,
    mainTaskId,
    isLoading,
    taskPaymentClaimed,
  } = useValidateUsersTask(currentUser?.id);

  return (
    <>
      <HeaderTitleTop text={"My Task"} icon={<BiListCheck />} />

      {isLoading ? (
        <TaskLoader />
      ) : (
        <MyActiveTask
          todaysTasks={todaysTasks}
          totalAmountNotClaimed={totalAmountNotClaimed}
          mainTaskId={mainTaskId}
          taskPaymentClaimed={taskPaymentClaimed}
        />
      )}

      <Sidebar />
    </>
  );
}

export default AllTask;
