import { useForm } from "react-hook-form";
import styled from "styled-components";
import useUser, { useUpdateSettings } from "../authentication/useUser";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useDarkMode } from "../../context/DarkModeContext";

const StyledContainer = styled.div``;

const FeedbackContainer = styled.div`
  font-size: 1.4rem;
  font-style: italic;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;

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
    height: 15rem;
  }
`;

const LabelContent = styled.label`
  font-size: 1.3rem;
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

const ImageComponent = styled.div``;

const Image = styled.img`
  width: 26.4rem;
`;

const mainLogoDark = "/main/logomaindark.png";
const mainLogoLight = "/main/logomainlight.png";

function FeedbackSettings() {
  const { isDarkMode } = useDarkMode();
  const { email, fullName } = useUser();
  const { updateSettings, isPending } = useUpdateSettings();
  const queryClient = useQueryClient();
  const { register, watch, handleSubmit, reset } = useForm();

  const src = isDarkMode ? mainLogoDark : mainLogoLight;

  function handleUpdateSettings(route, newData) {
    const updateData = {
      route,
      newData,
    };

    updateSettings(updateData, {
      onSuccess: () => {
        queryClient.invalidateQueries();
        toast.success("Your feedback was sent successfully.");
        reset({
          feedbackMessage: "",
        });
      },
    });
  }

  function handleSubmitData(data) {
    const route = "feedback";
    const newData = {
      ...data,
      email,
      fullName,
    };
    handleUpdateSettings(route, newData);
  }

  const disabled = !watch("feedbackMessage");

  return (
    <StyledContainer>
      <StyledFormContainerContainer>
        <ImageComponent to="/">
          <Image src={src} alt="Taskiit services Logo" />
        </ImageComponent>

        <FeedbackContainer>
          {`“We’d love to hear from you! Your feedback helps us improve the app,
          add features you care about, and make stock purchases and ratings even
          smoother. Please share your thoughts below — everything you send goes
          directly to our core team.”`}
        </FeedbackContainer>

        <EachFormContainerContent>
          <LabelContent>Your Feedback</LabelContent>
          <textarea
            placeholder="Enter feedback"
            {...register("feedbackMessage")}
          />
        </EachFormContainerContent>
      </StyledFormContainerContainer>

      <StyledButtonContainer>
        <button
          disabled={disabled || isPending}
          onClick={handleSubmit(handleSubmitData)}
        >
          {isPending ? "Processing..." : `Confirm`}
        </button>
      </StyledButtonContainer>
    </StyledContainer>
  );
}

export default FeedbackSettings;
