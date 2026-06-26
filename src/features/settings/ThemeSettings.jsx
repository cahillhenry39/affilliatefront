import { useForm } from "react-hook-form";
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

const EachFormContainerContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.51rem;
  font-size: 1.3rem;

  & input {
    border: none;
    border-radius: 9px;
    padding: 1rem 1rem;
    background-color: var(--color-grey-10);
  }

  & select {
    border: none;
    border-radius: 9px;
    padding: 1rem 1rem;
    background-color: var(--color-grey-10);
  }

  & textarea {
    border: none;
    border-radius: 9px;
    padding: 1rem 1rem;
    background-color: var(--color-grey-10);
  }
`;

const EachToggleContainerContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.51rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-grey-50);
`;

const LabelContent = styled.label`
  font-size: 1.3rem;
  color: var(--color-grey-500);
  font-weight: 600;
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

function ThemeSettings({ handleUpdateSettings, isWorking }) {
  const { darkModeSettings } = useUser();

  const { register, handleSubmit } = useForm();

  const [isDarkMode, setIsDarkMode] = useState(darkModeSettings || false);

  function handleSubmitData() {
    const route = "theme";
    const newData = {
      darkModeDefault: isDarkMode,
    };
    handleUpdateSettings(route, newData);
  }

  const disabled = darkModeSettings === isDarkMode;

  return (
    <StyledContainer>
      <StyledFormContainerContainer>
        <EachToggleContainerContent>
          <QuestionLabelContent>Dark Mode?</QuestionLabelContent>

          <ToggleButton
            currentState={isDarkMode}
            onChange={setIsDarkMode}
            mainDirection
            toggleTextArray={["No", "Yes"]}
            inActiveColor={"var(--color-grey-200)"}
          />
        </EachToggleContainerContent>

        <EachFormContainerContent>
          <LabelContent>Default Language</LabelContent>
          <select
            placeholder="Enter new password"
            {...register("withdrawalLimit")}
          >
            <option value={"engish"}>English</option>
          </select>
        </EachFormContainerContent>
      </StyledFormContainerContainer>

      <StyledButtonContainer>
        <button disabled={disabled} onClick={handleSubmit(handleSubmitData)}>
          {isWorking ? "Processing..." : `Confirm`}
        </button>
      </StyledButtonContainer>
    </StyledContainer>
  );
}

export default ThemeSettings;
