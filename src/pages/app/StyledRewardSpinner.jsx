import { useState } from "react";
import useUser from "../../features/authentication/useUser";
import HeaderNavigationBack from "../../ui/HeaderNavigationBack";
import Spinner from "./SpinnerWheels";
import SpinnerRewardTips from "./SpinnerRewardTips";

function StyledRewardSpinner() {
  const [showTips, setShowTips] = useState(false);

  const { spinningReward } = useUser();
  const checkIfReward = spinningReward?.length;

  const currentSpinner = (checkIfReward && spinningReward[0]) || {};
  const benefits = currentSpinner?.benefits
    ? JSON.parse(currentSpinner?.benefits)
    : [];

  return (
    <>
      <HeaderNavigationBack
        text={"Rewards and Gifts"}
        setShowRules={setShowTips}
        modalTitle={"Tips"}
      />

      <Spinner benefits={benefits} currentSpinner={currentSpinner} />

      <SpinnerRewardTips
        showMini={showTips}
        setShowMini={() => setShowTips(false)}
      />
    </>
  );
}

export default StyledRewardSpinner;
