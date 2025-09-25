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

function SubscriptionSettings({ handleUpdateSettings, isWorking }) {
  const { newsLetterEmail, newsLetter, promotions, packageUpdates, email } =
    useUser();

  const { register, handleSubmit } = useForm({
    defaultValues: { newsLetterEmail },
  });

  const [isNewsLetter, setIsNewsLetter] = useState(newsLetter || false);
  const [isPromotion, setIsPromotion] = useState(promotions || false);
  const [isPackageUpdate, setIsPackageUpdate] = useState(
    packageUpdates || false
  );

  function handleSubmitData(data) {
    const route = "subscription";
    const newData = {
      isPromotion,
      isPackageUpdate,
      isNewsLetter,
      newsLetterEmail: data?.newsLetterEmail || email,
    };
    handleUpdateSettings(route, newData);
  }

  const disabled =
    isNewsLetter === newsLetter &&
    isPromotion === promotions &&
    isPackageUpdate === packageUpdates;

  return (
    <StyledContainer>
      <StyledFormContainerContainer>
        <EachToggleContainerContent>
          <QuestionLabelContent>Newsletter?</QuestionLabelContent>

          <ToggleButton
            currentState={isNewsLetter}
            onChange={setIsNewsLetter}
            mainDirection
            toggleTextArray={["No", "Yes"]}
            inActiveColor={"var(--color-grey-200)"}
          />
        </EachToggleContainerContent>

        <EachToggleContainerContent>
          <QuestionLabelContent>Promotions?</QuestionLabelContent>

          <ToggleButton
            currentState={isPromotion}
            onChange={setIsPromotion}
            mainDirection
            toggleTextArray={["No", "Yes"]}
            inActiveColor={"var(--color-grey-200)"}
          />
        </EachToggleContainerContent>

        <EachToggleContainerContent>
          <QuestionLabelContent>Package Updates?</QuestionLabelContent>

          <ToggleButton
            currentState={isPackageUpdate}
            onChange={setIsPackageUpdate}
            mainDirection
            toggleTextArray={["No", "Yes"]}
            inActiveColor={"var(--color-grey-200)"}
          />
        </EachToggleContainerContent>

        <EachFormContainerContent>
          <LabelContent>Preferred Email Address</LabelContent>
          <input
            placeholder="Enter email address for newsletter"
            type="email"
            defaultValue={newsLetterEmail || email}
            {...register("newsLetterEmail")}
          />
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

export default SubscriptionSettings;
