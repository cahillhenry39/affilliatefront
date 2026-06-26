import styled, { css } from "styled-components";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import IconForInput from "../../ui/IconForInput";
import Button from "../../ui/Button";
import SpinnerAndText from "../../ui/SpinnerAndText";
import { useState } from "react";
import { HiOutlineLockClosed } from "react-icons/hi2";
import Logo from "../../ui/Logo";
import { useUpdatePassword } from "../../features/currentUser/useUpdateUser";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const StyledForgottenPass = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;

  padding: 2rem 4rem;

  padding-top: 4rem;

  height: 100vh;

  ${(props) =>
    props.$isDarkMode === "true"
      ? css`
          background-color: var(--color-grey-50);
        `
      : css`
          background-image: url("/app/background/w4.jpg");
          background-size: cover;
        `}

  overflow-x: hidden;

  & p {
    font-size: 1.5rem;
    text-align: center;
  }
`;

const Heading = styled.h2`
  text-align: center;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  /* align-items: center;/ */
`;

const ErrorMessage = styled.span`
  font-size: 1.3rem;
  margin-top: -1rem;
  color: orangered;
  text-align: center;
`;

function ResetPasswordForm() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { updatePassword, isPending } = useUpdatePassword();

  function handleUpdatePassword(e) {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Please put in your password correctly");
      return;
    }

    updatePassword(password, {
      onSuccess: () => {
        toast.success("Password updated successfully");
        navigate("/app", { replace: true });
      },
    });
  }

  return (
    <StyledForgottenPass>
      <Logo />
      <Heading>Kindly Reset Your Password?</Heading>

      <StyledForm>
        <FormRow color label="Password" must>
          <>
            <Input
              disabled={isPending}
              placeholder="***********"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <IconForInput>
              <HiOutlineLockClosed />
            </IconForInput>
          </>
        </FormRow>
        <FormRow color label="Confirm password" must>
          <>
            <Input
              disabled={isPending}
              placeholder="***********"
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                if (password !== e.target.value) {
                  setError({ ...error, password: "Password must match" });
                }

                if (password === e.target.value) {
                  setError({});
                }
                setConfirmPassword(e.target.value);
              }}
            />
            <IconForInput>
              <HiOutlineLockClosed />
            </IconForInput>
          </>
        </FormRow>
        {error?.password && <ErrorMessage>{error?.password}</ErrorMessage>}
        <Button
          type="primary"
          onClick={handleUpdatePassword}
          disabled={
            isPending ||
            !password ||
            !confirmPassword ||
            password !== confirmPassword
          }
        >
          {isPending ? (
            <SpinnerAndText message="Resetting" />
          ) : (
            "Reset Password"
          )}
        </Button>{" "}
      </StyledForm>
    </StyledForgottenPass>
  );
}

export default ResetPasswordForm;
