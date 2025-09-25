import styled from "styled-components";
import CurrenUserPageHeader from "../../features/currentUser/CurrenUserPageHeader";
import Sidebar from "../../ui/Sidebar";

import CurrentUserAlertWarning from "../../features/currentUser/CurrentUserAlertWarning";
import CurrentUserEachNavigation from "../../features/currentUser/CurrentUserEachNavigation";
import {
  IoIosCard,
  IoIosLocate,
  IoIosLogOut,
  IoIosPeople,
  IoIosTrophy,
  IoMdCog,
  IoMdListBox,
} from "react-icons/io";
import useUser from "../../features/authentication/useUser";
import { useLogout } from "../../features/authentication/useLogout";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const StyledMainContainerNavigation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: -3rem 1rem 1rem;

  padding: 3rem 0rem 4rem;
  height: 60vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0rem;
  }
`;

const StyledEachContainerNavigation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  background-color: var(--color-grey-0);
  padding: 2rem 1rem;
  border-radius: 9px;
`;

function CurrentUserPage() {
  const { balance, userPackageTitle, personalData } = useUser();
  const { logout, isPending } = useLogout();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  function handleLogout() {
    logout(
      {},
      {
        onSuccess: () => {
          navigate("/member/auth", { replace: true });
          queryClient.removeQueries(); // OR .resetQueries(["currentUser"])
          queryClient.invalidateQueries(); // optional
        },
      }
    );
  }

  return (
    <>
      <CurrenUserPageHeader
        balance={balance}
        userPackageTitle={userPackageTitle}
        personalData={personalData}
      />
      <CurrentUserAlertWarning />

      <StyledMainContainerNavigation>
        <StyledEachContainerNavigation>
          <CurrentUserEachNavigation
            icon={<IoMdListBox />}
            title={"Transaction History"}
            link={"/app/finance"}
          />

          <CurrentUserEachNavigation
            icon={<IoIosTrophy />}
            title={"Task History"}
            message={"Highlights on your tasks"}
            link="/app/task/history"
          />

          <CurrentUserEachNavigation
            icon={<IoIosLocate />}
            title={"Account Type"}
            message={"Account details and tier"}
            link="/app/account/details"
          />

          <CurrentUserEachNavigation
            icon={<IoIosCard />}
            title={"Bank Details"}
            message={"Add / edit your bank details"}
            link="/app/bank/details"
          />
        </StyledEachContainerNavigation>

        <StyledEachContainerNavigation>
          <CurrentUserEachNavigation
            icon={<IoIosPeople />}
            title={"Referral"}
            message={"Invite friends and earn more"}
            link="/app/referral"
          />

          <CurrentUserEachNavigation
            icon={<IoMdCog />}
            title={"Settings"}
            message={"Adjust some settings"}
            link="/app/settings"
          />
        </StyledEachContainerNavigation>

        <StyledEachContainerNavigation>
          <CurrentUserEachNavigation
            icon={<IoIosLogOut />}
            title={"Sign out"}
            isLogoutIcon
            handleLogout={handleLogout}
            isWorking={isPending}
          />
        </StyledEachContainerNavigation>
      </StyledMainContainerNavigation>

      <Sidebar />
    </>
  );
}

export default CurrentUserPage;
