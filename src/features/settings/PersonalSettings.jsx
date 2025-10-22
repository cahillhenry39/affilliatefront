import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosRadioButtonOff, IoIosRadioButtonOn } from "react-icons/io";
import styled from "styled-components";
import useUser from "../authentication/useUser";
import { formatTextCapitalize } from "../../utils/helpers";

const StyledContainer = styled.div`
  margin-top: -2rem;
  height: 85vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0;
  }
`;

const StyledFormContainerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem 1rem;
  margin: 2rem 1rem;
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
    width: 100%;

    &:disabled {
      background-color: var(--color-grey-50);
    }
  }

  & textarea {
    border: none;
    border-radius: 9px;
    padding: 1rem 1rem;
    background-color: var(--color-grey-10);
    height: 10rem;
    margin-bottom: 2rem;
  }

  & select {
    border: none;
    border-radius: 9px;
    padding: 1rem 1rem;
    background-color: var(--color-grey-10);
    width: 100%;

    &:disabled {
      background-color: var(--color-grey-50);
    }
  }
`;

const GenderContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  font-size: 1.3rem;
`;

const EachGenderContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.81rem;
  border: 1px solid ${({ $backColor }) => $backColor || "var(--color-grey-100)"};
  padding: 1rem;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${({ $backColor }) => $backColor || "var(--color-grey-10)"};

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-grey-500);
  }
`;

const SVGSelected = styled(IoIosRadioButtonOn)`
  color: var(--color-brand-700) !important;
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

function PersonalSettings({ handleUpdateSettings, isWorking }) {
  const { phoneNum, email, fullName, DOB, address, networkType } = useUser();
  const [gender, setGender] = useState("male");

  const { register, watch, handleSubmit } = useForm({
    defaultValues: { phoneNum, email, fullName, DOB, address, networkType },
  });

  function handleSubmitData(data) {
    const route = "personal";
    const newData = {
      ...data,
      gender,
    };
    // console.log(newData);
    handleUpdateSettings(route, newData);
  }

  function handleSelectGender(gender) {
    setGender((val) => (val === gender ? "" : gender));
  }

  const disabled =
    (watch("phoneNum") === phoneNum &&
      watch("DOB") === DOB &&
      watch("address") === address &&
      watch("networkType") === networkType) ||
    !watch("phoneNum") ||
    !watch("DOB") ||
    !watch("networkType") ||
    !watch("address");

  return (
    <StyledContainer>
      <StyledFormContainerContainer>
        <EachFormContainerContent>
          <LabelContent>Full Name</LabelContent>

          <input
            placeholder="Enter full name"
            defaultValue={formatTextCapitalize(fullName)}
            disabled
          />
        </EachFormContainerContent>

        <EachFormContainerContent>
          <LabelContent>Email Address</LabelContent>
          <input
            placeholder="Enter email address"
            defaultValue={email}
            disabled
          />
        </EachFormContainerContent>

        <EachFormContainerContent>
          <LabelContent>Phone Number</LabelContent>
          <input placeholder="Enter phone number" {...register("phoneNum")} />
        </EachFormContainerContent>

        <EachFormContainerContent>
          <LabelContent>Network Name</LabelContent>

          <select {...register("networkType")}>
            {["", "mtn", "glo", "airtel", "9mobile"].map((el, i) => (
              <option key={i} value={el}>
                {el?.toUpperCase()}
              </option>
            ))}
          </select>
        </EachFormContainerContent>

        <EachFormContainerContent>
          <LabelContent>Gender</LabelContent>

          <GenderContainer>
            <EachGenderContainer
              $backColor={
                gender === "male" ? "var(--color-green-backColor)" : ""
              }
              onClick={() => handleSelectGender("male")}
            >
              <p>MALE</p>

              {gender === "male" ? <SVGSelected /> : <IoIosRadioButtonOff />}
            </EachGenderContainer>

            <EachGenderContainer
              $backColor={
                gender === "female" ? "var(--color-green-backColor)" : ""
              }
              onClick={() => handleSelectGender("female")}
            >
              <p>FEMALE</p>

              {gender === "female" ? <SVGSelected /> : <IoIosRadioButtonOff />}
            </EachGenderContainer>
          </GenderContainer>
        </EachFormContainerContent>

        <EachFormContainerContent>
          <LabelContent>Date of Birth</LabelContent>
          <input
            placeholder="Select date of birth"
            defaultValue={DOB ? new Date(DOB).toISOString().slice(0, 10) : ""}
            type="date"
            {...register("DOB")}
          />
        </EachFormContainerContent>

        <EachFormContainerContent>
          <LabelContent>Home / Ofice Address</LabelContent>
          <textarea
            placeholder="Enter your home or office address"
            {...register("address")}
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

export default PersonalSettings;
