import styled from "styled-components";
import { formatCurrency, formatTextCapitalize } from "../../utils/helpers";
import { useClaimReferralBonus } from "../authentication/useUser";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: var(--color-grey-0);
  padding: 3rem 1rem 4rem;
  margin: 1rem;
  border-radius: 9px;
`;

const ReferralInformationContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1rem;
  row-gap: 1rem;
`;

const EachReferralInformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  gap: 0rem;

  & div {
  }

  & p {
    font-size: 1.1rem;
    color: var(--color-grey-800);
    font-weight: 600;
  }

  & span {
    font-size: 1.3rem;
    color: var(--color-grey-400);
  }

  & img {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

const EachCOntainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  column-gap: 0.21rem;
`;

const ImageCOntainer = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  overflow: hidden;
`;

const ReferralListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
  border-top: 1px solid var(--color-grey-100);
  padding-top: 2rem;

  & h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const EachReferralListsContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.1rem;
  padding-bottom: 1rem;

  &:not(:last-of-type) {
    border-bottom: 1px solid var(--color-grey-50);
  }

  & p {
    font-size: 1.2rem;
    color: var(--color-grey-700);
    font-weight: 600;
  }
`;

const StyledClaimedContainer = styled.span`
  font-size: 1rem;
  color: var(--color-grey-500);
  background-color: var(--color-grey-50);
  text-align: center;
  padding: 0.51rem 1rem;
  border-radius: 11px;
  margin: 0rem 2rem;
  cursor: pointer;
`;

const StyledNotClaimedContainer = styled.span`
  font-size: 0.81rem;
  color: var(--color-brand-800);
  background-color: var(--color-green-backColor);
  text-align: center;
  padding: 0.51rem 1rem;
  border-radius: 11px;
  margin: 0rem 2rem;
  cursor: pointer;
`;

function MyReferrals({
  allMyReferrals,
  totalClaimed = 0,
  totalNotClaimed = 0,
}) {
  const { claimReferralBonus, isPending } = useClaimReferralBonus();
  const queryClient = useQueryClient();
  const isWorking = isPending;

  function handleClaimReferral(referralId, referralCost) {
    const newData = {
      referralId,
    };


    claimReferralBonus(newData, {
      onSuccess: () => {
        queryClient.invalidateQueries();
        toast.success(`You have claimed ${formatCurrency(referralCost)}`);
      },
    });
  }

  return (
    <StyledContainer>
      <ReferralInformationContainer>
        <EachReferralInformationContainer>
          <EachCOntainer>
            <p>Total Claimed</p>
            <ImageCOntainer>
              <img src="/main/coin.png" alt="" />
            </ImageCOntainer>
          </EachCOntainer>

          <span>{formatCurrency(totalClaimed)}</span>
        </EachReferralInformationContainer>

        <EachReferralInformationContainer>
          <EachCOntainer>
            <p>Not Claimed</p>
            <ImageCOntainer></ImageCOntainer>
          </EachCOntainer>

          <span>{formatCurrency(totalNotClaimed)}</span>
        </EachReferralInformationContainer>
      </ReferralInformationContainer>

      <ReferralListContainer>
        <h3>Referral Lists ({allMyReferrals?.length})</h3>

        {allMyReferrals?.map((each, i) => {
          return (
            <EachReferralListsContainer key={i}>
              <p>{`${i + 1}. ${formatTextCapitalize(each?.referralName)}`}</p>

              {each?.claimedStatus === "claimed" && (
                <StyledClaimedContainer>Claimed</StyledClaimedContainer>
              )}

              {each?.claimedStatus === "not_claimed" && (
                <StyledNotClaimedContainer
                  onClick={() =>
                    handleClaimReferral(each?.id, each?.referralCost)
                  }
                >
                  {isWorking
                    ? "Claiming..."
                    : `Claim ${formatCurrency(each?.referralCost)}`}
                </StyledNotClaimedContainer>
              )}

              {each?.claimedStatus === "pending" && (
                <StyledClaimedContainer>Pending</StyledClaimedContainer>
              )}
            </EachReferralListsContainer>
          );
        })}
      </ReferralListContainer>
    </StyledContainer>
  );
}

export default MyReferrals;
