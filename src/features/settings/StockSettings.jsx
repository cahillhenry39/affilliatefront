import { useForm } from "react-hook-form";
import styled from "styled-components";
import useUser from "../authentication/useUser";
import ToggleButton from "../../ui/ToogleBotton";
import { useState } from "react";
import { formatCurrency } from "../../utils/helpers";

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

function StockSettings({ handleUpdateSettings, isWorking }) {
  const { stockLimit, stockNotes, stockNews, manageStock, buyStock } =
    useUser();
  const { register, watch, handleSubmit } = useForm({
    defaultValues: { stockLimit, stockNotes },
  });

  const [autoBuyStock, setAutoBuyStock] = useState(buyStock || false);
  const [autoManageStock, setAutoManageStock] = useState(manageStock || false);
  const [autoStockNews, setAutoStockNews] = useState(stockNews || false);

  function handleSubmitData(data) {
    // const {
    //   stockLimit,
    //   stockNotes,
    //   autoStockNews,
    //   autoManageStock,
    //   autoBuyStock,
    // } = data;

    const route = "market/stock";
    const newData = {
      ...data,
      autoStockNews,
      autoManageStock,
      autoBuyStock,
    };
    handleUpdateSettings(route, newData);
  }

  const disabled =
    (watch("stockNotes") === stockNotes &&
      watch("stockLimit") === stockLimit &&
      manageStock === autoManageStock &&
      buyStock === autoBuyStock &&
      stockNews === autoStockNews) ||
    !watch("stockNotes") ||
    !watch("stockLimit");

  return (
    <StyledContainer>
      <StyledFormContainerContainer>
        <EachToggleContainerContent>
          <QuestionLabelContent>Auto Buy Stock?</QuestionLabelContent>

          <ToggleButton
            currentState={autoBuyStock}
            onChange={setAutoBuyStock}
            mainDirection
            toggleTextArray={["No", "Yes"]}
            inActiveColor={"var(--color-grey-200)"}
          />
        </EachToggleContainerContent>

        <EachToggleContainerContent>
          <QuestionLabelContent>Auto Manage Stock?</QuestionLabelContent>

          <ToggleButton
            currentState={autoManageStock}
            onChange={setAutoManageStock}
            mainDirection
            toggleTextArray={["No", "Yes"]}
            inActiveColor={"var(--color-grey-200)"}
          />
        </EachToggleContainerContent>

        <EachToggleContainerContent>
          <QuestionLabelContent>Receive Stock News?</QuestionLabelContent>

          <ToggleButton
            currentState={autoStockNews}
            onChange={setAutoStockNews}
            mainDirection
            toggleTextArray={["No", "Yes"]}
            inActiveColor={"var(--color-grey-200)"}
          />
        </EachToggleContainerContent>

        <EachFormContainerContent>
          <LabelContent>Set Limit</LabelContent>
          <select placeholder="Enter new password" {...register("stockLimit")}>
            <option value={""}>Choose limit</option>
            {[1000, 3000, 5000, 10000, 50000, 100000]?.map((each, i) => {
              return (
                <option key={i} value={each}>
                  {formatCurrency(each, "USD")}
                </option>
              );
            })}
          </select>
        </EachFormContainerContent>

        <EachFormContainerContent>
          <LabelContent>Write notes</LabelContent>
          <textarea
            placeholder="Provid further notes"
            {...register("stockNotes")}
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

export default StockSettings;
