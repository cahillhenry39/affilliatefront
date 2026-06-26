import styled from "styled-components";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import IconForInput from "../../ui/IconForInput";
import { HiOutlineMail } from "react-icons/hi";
import Button from "../../ui/Button";
import SpinnerAndText from "../../ui/SpinnerAndText";
import Logo from "../../ui/Logo";
import { useState } from "react";
import { useForgottenPassword } from "../../features/authentication/useUser";
import toast from "react-hot-toast";

const StyledForgottenPass = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;

  padding: 0rem 2rem;
  margin-top: -4rem;
  background-color: var(--color-grey-10);

  height: 100vh;

  & p {
    font-size: 1.5rem;
    text-align: center;
  }
`;

const Heading = styled.h2`
  text-align: center;
  color: var(--color-grey-800);
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  /* align-items: center;/ */
`;

function ForgottenPassword() {
  const { forgottenPassword, isPending } = useForgottenPassword();
  const [email, setEmail] = useState("");

  function handleSendPass(e) {
    e.preventDefault();

    if (!email) {
      toast.error("Please provide your email address");
      return;
    }

    forgottenPassword(email, {
      onSuccess: () => {
        toast.success("We have received your request. Check your email");
        setEmail("");
      },
    });
  }

  return (
    <StyledForgottenPass>
      <Logo />
      <Heading>Forgotten Password?</Heading>

      <p>
        Provide your email address by submiting the form below. If your emaill
        is registered with us, be sure to receive a password reset link.{" "}
      </p>

      <StyledForm>
        <FormRow>
          <>
            <Input
              type="email"
              placeholder="your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isPending}
            />

            <IconForInput>
              <HiOutlineMail />
            </IconForInput>
          </>
        </FormRow>
        <Button
          type="primary"
          onClick={handleSendPass}
          disabled={isPending || !email}
        >
          {isPending ? <SpinnerAndText message="submitting" /> : "submit"}
        </Button>{" "}
      </StyledForm>
    </StyledForgottenPass>
  );
}

export default ForgottenPassword;
