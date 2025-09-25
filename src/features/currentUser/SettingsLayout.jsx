import styled from "styled-components";

import UserInformation from "./UserInformation";
import UpdateUserData from "./UpdateUserData";
import { device } from "../../../mediaQuery";
import useUser from "../authentication/useUser";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto auto;
  gap: 2.4rem;
  padding-bottom: 4rem;

  @media ${device.laptop} {
    display: flex;
    flex-direction: column;
  }
`;

function SettingsLayout() {
  const { data } = useUser();

  return (
    <StyledDashboardLayout>
      <UserInformation user={data} />

      <UpdateUserData userData={data} />

      {/* <UpdateBank userData={data} /> */}
    </StyledDashboardLayout>
  );
}

export default SettingsLayout;
