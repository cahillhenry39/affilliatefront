import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import styled from "styled-components";

const StyledContainer = styled.div``;

const StyledFormContainerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem 1rem;
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

function TransactionSettings({ handleUpdateSettings, isWorking }) {
  const { register, watch, handleSubmit } = useForm();

  function handleSubmitData(data) {
    const { currentPin, confirmNewPin, newPin } = data;

    if (!newPin || !confirmNewPin || !currentPin) {
      toast.error("All fields are required");
      return;
    }

    if (newPin !== confirmNewPin) {
      toast.error("New transaction pin must match the confirm pin");
      return;
    }

    const route = "pin";
    const newData = {
      ...data,
    };
    handleUpdateSettings(route, newData);
  }

  const disabled =
    !watch("currentPin") || !watch("confirmNewPin") || !watch("newPin");

  return (
    <StyledContainer>
      <StyledFormContainerContainer>
        <EachFormContainerContent>
          <LabelContent>Current Transaction Pin</LabelContent>

          <input placeholder="Enter current pin" {...register("currentPin")} />
        </EachFormContainerContent>

        <EachFormContainerContent>
          <LabelContent>New Transaction Pin</LabelContent>
          <input
            placeholder="Enter new pin"
            inputMode="numeric" // mobile numeric keyboard
            maxLength={4}
            {...register("newPin", {
              required: "PIN is required",
              pattern: {
                value: /^[0-9]{4}$/, // must be exactly 4 digits
                message: "PIN must be 4 numbers",
              },
            })}
          />
        </EachFormContainerContent>

        <EachFormContainerContent>
          <LabelContent>Confirm Transaction Pin</LabelContent>
          <input
            placeholder="Re-enter new pin"
            inputMode="numeric" // mobile numeric keyboard
            maxLength={4}
            {...register("confirmNewPin", {
              required: "Confirm new pin is required",
              pattern: {
                value: /^[0-9]{4}$/, // must be exactly 4 digits
                message: "PIN must be 4 numbers",
              },
            })}
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

export default TransactionSettings;
