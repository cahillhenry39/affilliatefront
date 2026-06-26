import { HiOutlineChevronRight } from "react-icons/hi2";
import styled from "styled-components";
import HeaderNavigationBack from "../../ui/HeaderNavigationBack";
import { formatTextCapitalize } from "../../utils/helpers";
import { FaNetworkWired } from "react-icons/fa";
import TaskLoader from "../task/TaskLoader";
import useUser, { useUpdateSettings } from "../authentication/useUser";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const StyledBankAccountContainer = styled.div`
  color: var(--color-brand-700);
  background-color: var(--color-grey-0);
  padding: 2rem 4rem 1rem;
  margin-top: -2.4rem;

  border-bottom: 1px solid var(--color-brand-700);
`;

const StyledAlertWarningContainer = styled.div`
  padding: 1rem 1.5rem;
  background-color: var(--color-green-backColor);
  color: var(--color-brand-700);

  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  border-radius: 9px;
  margin: 0 1rem;

  & span {
    font-size: 1.1rem;
  }
`;

const StyledAFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 0 1rem;
  border-radius: 9px;

  background-color: var(--color-grey-0);
  padding: 3rem 2rem 3rem;
`;

const EachFormContainerContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: 1.3rem;

  & input {
    border: none;
    border-radius: 9px;
    padding: 1rem 1rem;
    background-color: var(--color-grey-10);
  }
`;

const LabelContent = styled.label`
  font-size: 1.3rem;
  color: var(--color-grey-500);
  font-weight: 600;
`;

const InnerBankAndLogoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  border: none;
  border-radius: 9px;
  padding: 0.8rem 1rem;
  background-color: var(--color-grey-10);
  cursor: pointer;
`;

const BankAndLogoContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 1rem;
`;

const SVGContainer = styled.div`
  width: 3rem;
  height: 3rem;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: var(--color-grey-100);
  font-size: 0.21rem;
  color: var(--color-grey-500);
  & svg {
    width: 1.5rem;
    height: 1.5rem;
    color: var(--color-grey-300);
  }
`;

const IconeNavSVG = styled(HiOutlineChevronRight)`
  width: 2rem;
  height: 2rem;
  color: var(--color-grey-700);
`;

const StyledButtonContainer = styled.div`
  margin: 1rem 3rem;
  display: flex;

  & button {
    padding: 1rem;
    width: 100%;
    border: none;
    border-radius: 22px;
    background-color: var(--color-green-backColor);
    color: var(--color-brand-800);
    font-weight: 600;

    &:disabled {
      color: var(--color-brand-200);
      font-weight: 500;
    }
  }
`;

function MainBankEditPage({
  handleNavigateToBank,
  bankSelected,
  isLoading,
  allAvailableBank,
}) {
  const { updateSettings, isPending } = useUpdateSettings();
  const queryClient = useQueryClient();

  const { bankName, bankAccount, fullName } = useUser();
  const [accountNumber, setAccountNumber] = useState(bankAccount);

  const allBanks = allAvailableBank
    ?.map((each) => {
      return {
        banks: each?.banks,
      };
    })
    .flatMap((item) => item.banks);

  const currentBankFiltered = allBanks?.find((each) => each?.name === bankName);

  const disableButton =
    (!bankName && !currentBankFiltered?.name) ||
    accountNumber === bankAccount ||
    !accountNumber ||
    accountNumber?.length !== 10;

  function handleUpdateBank() {
    if (
      (!currentBankFiltered?.name && !bankName) ||
      !accountNumber ||
      accountNumber?.length !== 10
    ) {
      toast.error("Please select or fill current bank name and account");
      return;
    }

    const route = "bank";
    const newData = {
      bankName: bankSelected ? bankSelected?.name : bankName,
      bankAccount: accountNumber,
    };

    const updateData = {
      route,
      newData,
    };

    updateSettings(updateData, {
      onSuccess: () => {
        queryClient.invalidateQueries();
        toast.success("Your bank details was saved successfully.");
      },
    });
  }

  return (
    <>
      <HeaderNavigationBack text={"Add / Edit Bank Details"} />
      <StyledBankAccountContainer>Bank Account</StyledBankAccountContainer>

      <StyledAlertWarningContainer>
        <span>
          To ensure the security of your funds, you can only add bank account
          linked to your fullname.
        </span>
      </StyledAlertWarningContainer>

      {isLoading ? (
        <TaskLoader />
      ) : (
        <>
          <StyledAFormContainer>
            <EachFormContainerContent>
              <LabelContent>Account Name</LabelContent>
              <input defaultValue={formatTextCapitalize(fullName)} disabled />
            </EachFormContainerContent>

            <EachFormContainerContent>
              <LabelContent>Bank</LabelContent>
              <InnerBankAndLogoContainer
                onClick={() => handleNavigateToBank("all banks")}
              >
                {currentBankFiltered &&
                bankAccount &&
                bankName &&
                !bankSelected ? (
                  <BankAndLogoContainer>
                    <SVGContainer>
                      <img src={currentBankFiltered?.logo} />
                    </SVGContainer>

                    <p>{formatTextCapitalize(currentBankFiltered?.name)}</p>
                  </BankAndLogoContainer>
                ) : (
                  <BankAndLogoContainer>
                    {bankSelected?.name ? (
                      <SVGContainer>
                        {bankSelected?.logo ? (
                          <img src={bankSelected?.logo} />
                        ) : (
                          "bank image"
                        )}
                      </SVGContainer>
                    ) : (
                      <SVGContainer>
                        <FaNetworkWired />
                      </SVGContainer>
                    )}

                    <p>
                      {bankSelected?.name
                        ? formatTextCapitalize(bankSelected?.name)
                        : "Select Bank"}
                    </p>
                  </BankAndLogoContainer>
                )}

                <IconeNavSVG />
              </InnerBankAndLogoContainer>
            </EachFormContainerContent>

            <EachFormContainerContent>
              <LabelContent>Bank Account</LabelContent>
              <input
                placeholder="Enter 10 digit account number"
                value={accountNumber}
                onChange={(e) => {
                  setAccountNumber(e.target.value);
                }}
              />
            </EachFormContainerContent>
          </StyledAFormContainer>

          <StyledButtonContainer>
            <button disabled={disableButton} onClick={handleUpdateBank}>
              {isPending ? "Processing..." : `Confirm`}
            </button>
          </StyledButtonContainer>
        </>
      )}
    </>
  );
}

export default MainBankEditPage;
