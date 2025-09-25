import styled from "styled-components";
import { useForm } from "react-hook-form";
import {
  HiOutlineEnvelope,
  HiOutlineLockClosed,
  HiOutlinePhone,
  HiOutlineUserCircle,
  HiOutlineUsers,
} from "react-icons/hi2";
import toast from "react-hot-toast";
import { device } from "../../../mediaQuery";
import { useUpdatePassword, useUpdateUser } from "./useUpdateUser";
import Form from "../../ui/Form";
import Headings from "../../ui/Headings";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import SpinnerAndText from "../../ui/SpinnerAndText";
import SelectInput from "../../ui/SelectInput";
import PinTransaction from "../../ui/PinTransaction";
import { useState } from "react";
import useUser from "../authentication/useUser";

const StyledGeneralUpdate = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem 1.2rem;

  @media ${device.tablet} {
    & p {
      font-size: 1rem;
      text-align: center;
    }
  }
`;

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
  grid-column: 1 / -1;
  justify-self: end;

  @media ${device.tablet} {
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

function GeneralUpdate({ type, onCloseModal }) {
  const {
    data: {
      user_metadata: { personal },
    },
  } = useUser();



  const { handleSubmit, register, formState, getValues } = useForm();
  const { errors } = formState;

  const [transactionPin, setTransactionPin] = useState("");

  const { updateUser, isPending } = useUpdateUser();
  const { updatePassword, isPending: isPassword } = useUpdatePassword();

  function handleUpdatePassword(data) {
    const password = data.password;
    updatePassword(password, {
      onSuccess: () => {
        toast.success(`Your password was successfully updated`);
        onCloseModal();
      },
    });
  }
  function handleAddNextKin(data) {
    const newUpdate = { nextKin: data };
    updateUser(newUpdate, {
      onSuccess: () => {
        toast.success(`Your next of kin was added successfully`);
        onCloseModal();
      },
    });
  }
  // function handleAddIdCard(data) {
  //   const fileSize = data.idCardPhoto[0].size;

  //   if (Number(fileSize) > 2000000) {
  //     toast.error("Image file size is too large. Max 2mb");

  //     return;
  //   }
  //   const type = "identity";
  //   const newUpdate = data;
  //   const imageFile = data.idCardPhoto;
  //   uploadImage(
  //     { type, imageFile, newUpdate },
  //     {
  //       onSuccess: () => {
  //         toast.success("Your data has been submitted successfully");
  //         onCloseModal();
  //       },
  //     }
  //   );
  // }

  function handleUpdateTransactionPin() {
    const newUpdate = { personal: { ...personal, pin: transactionPin } };

    updateUser(newUpdate, {
      onSuccess: () => {
        toast.success(`Your  pin was changed successfully`);
        onCloseModal();
      },
    });
  }

  return (
    <>
      {type === "pin" && (
        <Form type="modal" onSubmit={handleSubmit(handleUpdateTransactionPin)}>
          <StyledGeneralUpdate>
            <Headings type="h3">Reset Transaction Pin</Headings>
            <p>Securely update your transaction pin.</p>

            <StyledForm>
              <PinTransaction
                isWorking={isPending}
                setTransactionPin={setTransactionPin}
              />

              <StyledButton>
                <Button type="primary" disabled={isPending}>
                  {isPending ? (
                    <SpinnerAndText message="processing" />
                  ) : (
                    "Update Pin"
                  )}
                </Button>
              </StyledButton>
            </StyledForm>
          </StyledGeneralUpdate>
        </Form>
      )}

      {type === "password" && (
        <Form type="modal" onSubmit={handleSubmit(handleUpdatePassword)}>
          <StyledGeneralUpdate>
            <Headings type="h3">Update password</Headings>
            <p>Securely update your password here.</p>
            <StyledForm>
              <FormRow
                label="New password"
                error={errors?.password?.message}
                must
              >
                <>
                  <Input
                    disabled={isPassword}
                    id="password"
                    type="password"
                    placeholder="********"
                    {...register("password", {
                      required: "This field is required",
                      minLength: {
                        value: 8,
                        message: "Password needs a minimum of 8 characters",
                      },
                    })}
                  />

                  <IconPrefix>
                    <HiOutlineLockClosed />
                  </IconPrefix>
                </>
              </FormRow>
              <FormRow
                label="Confirm password"
                error={errors?.confirmPassword?.message}
                must
              >
                <>
                  <Input
                    disabled={isPassword}
                    id="confirmPassword"
                    type="password"
                    placeholder="**********"
                    {...register("confirmPassword", {
                      required: "This field is required",
                      validate: (value) =>
                        value === getValues()?.password ||
                        "Passwords need to match",
                    })}
                  />

                  <IconPrefix>
                    <HiOutlineLockClosed />
                  </IconPrefix>
                </>
              </FormRow>

              <StyledButton>
                <Button type="primary" disabled={isPassword}>
                  {isPassword ? (
                    <SpinnerAndText message="processing" />
                  ) : (
                    "Update password"
                  )}
                </Button>
              </StyledButton>
            </StyledForm>
          </StyledGeneralUpdate>
        </Form>
      )}

      {type === "nextKin" && (
        <Form type="modal" onSubmit={handleSubmit(handleAddNextKin)}>
          <StyledGeneralUpdate>
            <Headings type="h3">Add next of kin</Headings>
            <p>Be sure of who you add. This action can not be undone</p>

            <StyledForm>
              <FormRow
                label="Full name"
                error={errors?.nextKinFullName?.message}
                must
              >
                <>
                  <Input
                    disabled={isPending}
                    placeholder="John hill"
                    id="nextKinFullName"
                    {...register("nextKinFullName", {
                      required: "This field is required",
                    })}
                  />

                  <IconPrefix>
                    <HiOutlineUserCircle />
                  </IconPrefix>
                </>
              </FormRow>
              <FormRow
                label="Email address"
                error={errors?.nextKinEmail?.message}
                must
              >
                <>
                  <Input
                    disabled={isPending}
                    placeholder="name@example.com"
                    id="nextKinEmail"
                    {...register("nextKinEmail", {
                      required: "This field is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Please provide a valid email address",
                      },
                    })}
                  />

                  <IconPrefix>
                    <HiOutlineEnvelope />
                  </IconPrefix>
                </>
              </FormRow>
              <FormRow label="Phone" error={errors?.nextKinPhone?.message}>
                <>
                  <Input
                    disabled={isPending}
                    placeholder="+ ********"
                    id="nextKinPhone"
                    {...register("nextKinPhone")}
                  />

                  <IconPrefix>
                    <HiOutlinePhone />
                  </IconPrefix>
                </>
              </FormRow>
              <FormRow
                label="Relationship"
                error={errors?.relationship?.message}
                must
              >
                <>
                  <SelectInput
                    disabled={isPending}
                    placeholder="Relationship"
                    id="relationship"
                    {...register("relationship", {
                      required: "This field is required",
                    })}
                  >
                    {[
                      "",
                      "Husband",
                      "Wife",
                      "Father",
                      "Mother",
                      "Brother",
                      "Sister",
                      "Son",
                      "Daughter",
                    ].map((el) => (
                      <option key={el}>{el}</option>
                    ))}
                  </SelectInput>

                  <IconPrefix>
                    <HiOutlineUsers />
                  </IconPrefix>
                </>
              </FormRow>

              <StyledButton>
                <Button type="primary" disabled={isPending}>
                  {isPending ? (
                    <SpinnerAndText message="processing" />
                  ) : (
                    "Add next of kin"
                  )}
                </Button>
              </StyledButton>
            </StyledForm>
          </StyledGeneralUpdate>
        </Form>
      )}

      {/* {type === "idCard" && (
        <Form type="modal" onSubmit={handleSubmit(handleAddIdCard)}>
          <StyledGeneralUpdate>
            <Headings type="h3">Upload document</Headings>
            <p>Uploading your means of identification.</p>

            <StyledForm>
              <FormRow label="ID number" error={errors?.idCardNumber?.message}>
                <>
                  <Input
                    disabled={isUploading}
                    placeholder="12345667"
                    id="idCardNumber"
                    {...register("idCardNumber", {
                      required: "This field is required",
                    })}
                  />

                  <IconPrefix>
                    <HiOutlineHashtag />
                  </IconPrefix>
                </>
              </FormRow>

              <FormRow label="Type" error={errors?.idCardType?.message} must>
                <>
                  <SelectInput
                    disabled={isUploading}
                    id="idCardType"
                    {...register("idCardType", {
                      required: "This field is required",
                    })}
                  >
                    {["", "Drivers licence", "National ID", "Passport"].map(
                      (el) => (
                        <option key={el}>{el}</option>
                      )
                    )}
                  </SelectInput>

                  <IconPrefix>
                    <HiOutlineIdentification />
                  </IconPrefix>
                </>
              </FormRow>

              <FormRow label="National" error={errors?.nationale?.message}>
                <>
                  <Input
                    disabled={isUploading}
                    placeholder="American"
                    id="nationale"
                    {...register("nationale", {
                      required: "This field is required",
                    })}
                  />

                  <IconPrefix>
                    <HiOutlineGlobeAmericas />
                  </IconPrefix>
                </>
              </FormRow>

              <FormRow
                label="Max 1 mb size"
                error={errors?.idCardPhoto?.message}
                must
              >
                <FileInput
                  disabled={isUploading}
                  id="idCardPhoto"
                  {...register("idCardPhoto", {
                    required: "This field is required",
                  })}
                />
              </FormRow>

              <StyledButton>
                <Button type="primary" disabled={isUploading}>
                  {isUploading ? (
                    <SpinnerAndText message='processing'>                   
                      
                 
                  ) : (
                    "Upload ID"
                  )}
                </Button>
              </StyledButton>
            </StyledForm>
          </StyledGeneralUpdate>
        </Form>
      )} */}
    </>
  );
}

export default GeneralUpdate;
