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
import { useState } from "react";
import SpecialPackageOffer from "../../features/accountDetails/SpecialPackageOffer";
import { useGetCompanyDetails } from "../../services/useCompanyDetails";

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
    expenseBal,
    bankAccount,
    bankName,
    isLoading,
    userPackageTitle,
    allPackages,
    specialPackage,
    phoneNum,
  } = useUser();
  const { subscribePackage, isPending } = useSubscribePackage();
  const { getCompanuDetails } = useGetCompanyDetails();

  const queryClient = useQueryClient();

  const [isCurrentPackage, setIsCurrentPackage] = useState("");

  if (isLoading) return <Spinner />;

  const currentTierNum =
    userPackageTitle?.split("")?.[userPackageTitle?.split("")?.length - 1];

  function handleSubscribePackage(packageId, cost) {
    if (expenseBal < cost) {
      toast.error("Low balance. Make a deposit to continue");
      return;
    }

    setIsCurrentPackage(packageId);
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

  function handleSubscribeSpecialPackage(packageId, cost) {
    if (expenseBal < cost) {
      toast.error("Insufficient balance. Please deposit to continue");
      return;
    }

    setIsCurrentPackage(packageId);
    const data = {
      packageId,
      isSpecialSubscription: true,
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

        {specialPackage?.map((each, i) => {
          const levelNumber =
            each?.packageOffered?.split("")?.[
              each?.packageOffered?.split("")?.length - 1
            ];

          return (
            <SpecialPackageOffer
              key={i}
              packageId={each?.id}
              currentLevel={levelNumber}
              title={each?.title}
              packageOffered={each?.packageOffered} //usePakcgae offered
              cost={each?.cost}
              originalCost={each?.originalCost}
              referralBonus={each?.referralBonus}
              eachTaskEarns={each?.eachTaskEarns}
              totalDailyTask={each?.totalDailyTask}
              isSubscribed={currentTierNum > 0}
              endTime={each?.endTime}
              isAirtime={getCompanuDetails?.isAirtime}
              handleSubscribeSpecialPackage={handleSubscribeSpecialPackage}
              isWorking={isPending}
              isCurrentPackage={isCurrentPackage}

              //welcomeBonus
            />
          );
        })}

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
              isCurrentPackage={isCurrentPackage}
              isAirtime={getCompanuDetails?.isAirtime}
            />
          );
        })}
      </StyledContainer>
    </>
  );
}

export default AccountDetailsPage;
