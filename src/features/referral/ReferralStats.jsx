import {
  HiOutlineBanknotes,
  HiOutlineCurrencyDollar,
  HiOutlineFaceSmile,
  HiOutlineLink,
} from "react-icons/hi2";

import { formatCurrency, getReferralsOnDuration } from "../../utils/helpers";
import styled from "styled-components";
import { device } from "../../../mediaQuery";
import Stat from "../../ui/Stat";

const StyledStats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 2rem;

  @media ${device.mobileL} {
    gap: 0.7rem;
  }

  @media ${device.mobileS} {
    gap: 0.2rem;
  }
`;

function ReferralStats({ myReferrals, myReferralAccount }) {
  // const totalAllAmountReferral = getReferralsOnDuration(myReferrals, "all");
  const totalTodayAmountReferral = getReferralsOnDuration(myReferrals, "today");

  const isWorking = false;

  return (
    <StyledStats>
      <Stat
        title="Total Amount Referred"
        color="blue"
        icon={<HiOutlineCurrencyDollar />}
        value={formatCurrency(myReferralAccount.totalReferralAmount || 0)}
        isWorking={isWorking}
      />
      <Stat
        title="Total Amount Today"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(totalTodayAmountReferral)}
        isWorking={isWorking}
      />

      <Stat
        title="Total Referred"
        color="yellow"
        icon={<HiOutlineFaceSmile />}
        value={myReferrals?.length || 0}
        isWorking={isWorking}
      />
      <Stat
        title="Total Generation"
        color="silver"
        icon={<HiOutlineLink />}
        value={myReferrals?.length || 0}
        isWorking={isWorking}
      />
    </StyledStats>
  );
}

export default ReferralStats;
