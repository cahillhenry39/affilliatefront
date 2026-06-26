import styled from "styled-components";
import useUser from "../authentication/useUser";
import ToggleButton from "../../ui/ToogleBotton";
import { useState } from "react";

const StyledContainer = styled.div``;

const StyledFormContainerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding: 4rem 1rem 2rem;
  margin: 0rem 1rem;
  border-radius: 9px;
  background-color: var(--color-grey-0);
`;

const EachToggleContainerContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.51rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-grey-50);
`;

const QuestionLabelContent = styled.label`
  font-size: 1.5rem;
  color: var(--color-grey-500);
  font-weight: 600;
`;

const StyledButtonContainer = styled.div`
  margin: 2rem 3rem;
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

function HomeSettings({ handleUpdateSettings, isWorking }) {
  const { hideBalanceSettings, hideExpenseSettings, noAdvertSettings } =
    useUser();

  const [hideBalance, setHideBalance] = useState(hideBalanceSettings || false);

  const [hideExpense, setHideExpense] = useState(hideExpenseSettings || false);

  const [noAdverts, setNoAdverts] = useState(noAdvertSettings || false);

  function handleSubmitData() {
    const route = "home/page";
    const newData = {
      hideBalance,
      hideExpense,
      noAdverts,
    };
    handleUpdateSettings(route, newData);
  }

  const disabled =
    hideBalance === hideBalanceSettings &&
    hideExpense === hideExpenseSettings &&
    noAdverts === noAdvertSettings;

  return (
    <StyledContainer>
      <StyledFormContainerContainer>
        <EachToggleContainerContent>
          <QuestionLabelContent>Hide Balance?</QuestionLabelContent>

          <ToggleButton
            currentState={hideBalance}
            onChange={setHideBalance}
            mainDirection
            toggleTextArray={["No", "Yes"]}
            inActiveColor={"var(--color-grey-200)"}
          />
        </EachToggleContainerContent>

        <EachToggleContainerContent>
          <QuestionLabelContent>Hide Expense?</QuestionLabelContent>

          <ToggleButton
            currentState={hideExpense}
            onChange={setHideExpense}
            mainDirection
            toggleTextArray={["No", "Yes"]}
            inActiveColor={"var(--color-grey-200)"}
          />
        </EachToggleContainerContent>

        <EachToggleContainerContent>
          <QuestionLabelContent>No Advert?</QuestionLabelContent>

          <ToggleButton
            currentState={noAdverts}
            onChange={setNoAdverts}
            mainDirection
            toggleTextArray={["No", "Yes"]}
            inActiveColor={"var(--color-grey-200)"}
          />
        </EachToggleContainerContent>
      </StyledFormContainerContainer>

      <StyledButtonContainer>
        <button disabled={disabled} onClick={handleSubmitData}>
          {isWorking ? "Processing..." : `Confirm`}
        </button>
      </StyledButtonContainer>
    </StyledContainer>
  );
}

export default HomeSettings;
