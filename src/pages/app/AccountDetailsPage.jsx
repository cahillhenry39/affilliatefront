import styled from "styled-components";
import HeaderNavigationBack from "../../ui/HeaderNavigationBack";
import useUser, {
  useSubscribePackage,
} from "../../features/authentication/useUser";
import Spinner from "../../ui/Spinner";
import BankAndAccountDetails from "../../features/accountDetails/BankAndAccountDetails";
import EachPackagesDetails from "../../features/accountDetails/EachPackagesDetails";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const StyledContainer = styled.div`
  overflow: hidden;
  height: 100vh;

  padding: 0rem 1.5rem 8rem;

  display: flex;
  flex-direction: column;
  gap: 2rem;

  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0;
  }
`;

function AccountDetailsPage() {
  const {
    personalData,
    // balance,
    bankAccount,
    bankName,
    isLoading,
    userPackageTitle,
    allPackages,
  } = useUser();
  const { subscribePackage, isPending } = useSubscribePackage();
  const queryClient = useQueryClient();

  if (isLoading) return <Spinner />;

  const currentTierNum =
    userPackageTitle?.split("")?.[userPackageTitle?.split("")?.length - 1];

  function handleSubscribePackage(packageId) {
    const data = {
      packageId,
    };

    subscribePackage(data, {
      onSuccess: () => {
        queryClient.invalidateQueries();
        toast.success("Package scubscription was successful");
      },
    });
  }

  return (
    <>
      <HeaderNavigationBack text={"Account Details"} />

      <StyledContainer>
        <BankAndAccountDetails
          personalData={personalData}
          bankAccount={bankAccount}
          bankName={bankName}
        />

        {allPackages?.map((each, i) => {
          const levelNumber =
            each?.title?.split("")?.[each?.title?.split("")?.length - 1];

          return (
            <EachPackagesDetails
              packageId={each?.id}
              currentLevel={levelNumber}
              isHigher={+currentTierNum < +levelNumber}
              isCurrent={
                userPackageTitle?.toLowerCase() === each?.title?.toLowerCase()
              }
              key={i}
              totalDailyTask={each?.totalDailyTask}
              cost={each?.cost}
              referralBonus={each?.referralBonus}
              eachTaskEarns={each?.eachTaskEarns}
              handleSubscribePackage={handleSubscribePackage}
              isWorking={isPending}
            />
          );
        })}
      </StyledContainer>
    </>
  );
}

export default AccountDetailsPage;
