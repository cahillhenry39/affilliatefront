import { HiOutlineCurrencyDollar, HiOutlineTrophy } from "react-icons/hi2";

import { formatCurrency } from "../../utils/helpers";
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

function TaskStats({ totalTaskToday, totalEarnedToday }) {
  return (
    <StyledStats>
      <Stat
        title="Total Task"
        color="brand"
        icon={<HiOutlineTrophy />}
        value={totalTaskToday + " " + "Task"}
      />
      <Stat
        title="Today's Earnings"
        color="brand"
        icon={<HiOutlineCurrencyDollar />}
        value={formatCurrency(totalEarnedToday || 0)}
      />
    </StyledStats>
  );
}

export default TaskStats;
