import styled from "styled-components";
import { device } from "../../../mediaQuery";
import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import {
  HiHashtag,
  HiOutlineBanknotes,
  HiOutlineBuildingLibrary,
} from "react-icons/hi2";
import SpinnerAndText from "../../ui/SpinnerAndText";
import Button from "../../ui/Button";
import Headings from "../../ui/Headings";
import { useUpdateUser } from "./useUpdateUser";
import toast from "react-hot-toast";
import { useDarkMode } from "../../context/DarkModeContext";

const StyledForm = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;

  @media ${device.tablet} {
    grid-template-columns: 1fr;
    justify-items: center;
  }
`;

const StyledButton = styled.div`
  grid-column: 1 /-1;
  justify-self: end;

  @media ${device.mobileL} {
    justify-self: center;
  }
`;

const IconPrefix = styled.span`
  position: absolute;

  padding: 0rem 0.3rem;
  margin-left: 0.5rem;
  height: 30%;

  display: flex;
  align-items: center;
  justify-content: center;

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-brand-700);
  }

  & img {
    width: 2rem;
    height: auto;
  }
`;

function UpdateBank({ userData }) {
  const { isDarkMode } = useDarkMode();

  const {
    user_metadata: { bank },
  } = userData;

  const { register, handleSubmit, formState } = useForm({
    defaultValues: bank,
  });
  const { errors } = formState;

  const { updateUser, isPending } = useUpdateUser();

  function onSubmit(data) {
    const newUpdate = { bank: data };
    updateUser(newUpdate, {
      onSuccess: () => {
        toast.success(
          `Your bank was ${
            bank?.bankAccount ? "Updated" : "Added"
          } successfully`
        );
      },
    });
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)} $isDarkMode={isDarkMode.toString()}>
      <Headings type="h3">{bank?.bankAccount ? "Update" : "Add"} Bank</Headings>

      <StyledForm>
        <FormRow label="Bank Name" error={errors?.bankName?.message} must>
          <>
            <Input
              disabled={isPending}
              type="text"
              placeholder="Chase"
              id="bankName"
              {...register("bankName", {
                required: "This field is required",
              })}
            />

            <IconPrefix>
              <HiOutlineBuildingLibrary />
            </IconPrefix>
          </>
        </FormRow>

        <FormRow
          label="Account number"
          error={errors?.bankAccount?.message}
          must
        >
          <>
            <Input
              disabled={isPending}
              type="text"
              placeholder="123456"
              id="bankAccount"
              {...register("bankAccount", {
                required: "This field is required",
              })}
            />

            <IconPrefix>
              <HiHashtag />
            </IconPrefix>
          </>
        </FormRow>

        <FormRow label="Type" error={errors?.bankAccountType?.message} must>
          <>
            <Input
              disabled={isPending}
              type="text"
              placeholder="Savings or credit"
              id="bankAccountType"
              {...register("bankAccountType", {
                required: "This field is required",
              })}
            />

            <IconPrefix>
              <HiOutlineBanknotes />
            </IconPrefix>
          </>
        </FormRow>

        {/* <FormRow label="Swift code" error={errors?.swiftCode?.message} must>
          <>
            <Input
              disabled={isPending}
              type="text"
              placeholder="swift code"
              id="swiftCode"
              {...register("swiftCode", {
                required: "This field is required",
              })}
            />

            <IconPrefix>
              <HiOutlineTag />
            </IconPrefix>
          </>
        </FormRow> */}

        <StyledButton>
          <Button type="primary" disabled={isPending}>
            {isPending ? (
              <SpinnerAndText
                message={bank?.bankAccount ? "Updating" : "Adding"}
              />
            ) : bank?.bankAccount ? (
              "Update Bank"
            ) : (
              "Add Bank"
            )}
          </Button>
        </StyledButton>
      </StyledForm>
    </Form>
  );
}

export default UpdateBank;
