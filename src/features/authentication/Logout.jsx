import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";

import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import SpinnerAndText from "../../ui/SpinnerAndText";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

function Logout({ letter, change }) {
  const { logout, isPending } = useLogout();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  function handleLogout() {
    logout(
      {},
      {
        onSuccess: () => {
          navigate("/", { replace: true });
          queryClient.removeQueries(); // OR .resetQueries(["currentUser"])
          queryClient.invalidateQueries(); // optional
        },
      }
    );
  }

  return (
    <>
      {letter ? (
        <Button
          type="primary"
          disabled={isPending}
          onClick={handleLogout}
          change={change}
        >
          {!isPending ? "Logout" : <SpinnerAndText message="login out..." />}
        </Button>
      ) : (
        <ButtonIcon disabled={isPending} onClick={handleLogout}>
          {!isPending ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
        </ButtonIcon>
      )}
    </>
  );
}

export default Logout;
