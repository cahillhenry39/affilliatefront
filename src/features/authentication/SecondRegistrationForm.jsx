import styled, { css } from "styled-components";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import SelectInput from "../../ui/SelectInput";
import SpinnerAndText from "../../ui/SpinnerAndText";
import toast from "react-hot-toast";

import IconForInput from "../../ui/IconForInput";
import {
  HiOutlineHashtag,
  HiOutlineLockClosed,
  HiOutlineMail,
  HiOutlineEmojiHappy,
} from "react-icons/hi";

import { EyeClosed, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useSignup } from "./useSignUp";
import Button from "../../ui/Button";
import { useGetAReferralWithPubId } from "../referral/useReferral";

import { formatTextCapitalize } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";

const StyledRegister = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.5rem;

  align-items: center;
  justify-content: center;

  width: 100%;
  transition: all 0.5s ease-in-out;

  ${(props) =>
    props.$isActive === "true"
      ? css`
          transform: translateX(0%);
        `
      : css`
          transform: translateX(100%);
          opacity: 0;
        `}

  position: absolute;
`;

const RegisterField = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 80%;
  height: 40vh;
  margin: 0 auto;

  overflow-y: scroll;
`;

const NumberGridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.4fr;
  gap: 1rem;
`;

const ReferralContainer = styled.div`
  background-color: var(--color-brand-100);
  padding: 1rem;
  border-radius: 12px;

  & p {
    color: #303030;
    font-size: 1.2rem;
  }

  & span {
    color: #1a1a1a;
    font-size: 1.4rem;
    font-weight: 600;
  }
`;

const PasswordOpenClose = styled.div`
  position: absolute;
  right: 1rem;

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-grey-700);
  }
  /* top: 0; */
`;

function SecondRegistrationForm({ isActive, usersReferralData }) {
  const { signup, isPending } = useSignup();
  const isWorking = isPending;
  const navigate = useNavigate();

  const { validateAReferral, isLoading } =
    useGetAReferralWithPubId(usersReferralData);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  function handleRegister(e) {
    e.preventDefault();

    if (fullName && email && password) {
      const newUser = {
        fullName,
        email,
        password,
        balance: 0,
        referralInformation: validateAReferral?.length
          ? validateAReferral[0]
          : null,
      };

      signup(newUser, {
        onSuccess: () => {
          toast.success("Your registration was successful");
          navigate("/app", {
            replace: true,
          });
        },
      });
      return;
    }
  }

  return (
    <StyledRegister $isActive={isActive.toString()}>
      <RegisterField>
        <FormRow color label="Your full name" must>
          <>
            <Input
              disabled={isWorking}
              placeholder="John Micheal"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <IconForInput>
              <HiOutlineEmojiHappy />
            </IconForInput>
          </>
        </FormRow>

        <FormRow color label="Your email address" must>
          <>
            <Input
              disabled={isWorking}
              placeholder="example@mail.com"
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value?.trim()?.split(" ")?.join(""))
              }
            />
            <IconForInput>
              <HiOutlineMail />
            </IconForInput>
          </>
        </FormRow>

        <FormRow color label="Password" must>
          <>
            <Input
              disabled={isWorking}
              placeholder="***********"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <IconForInput>
              <HiOutlineLockClosed />
            </IconForInput>

            <PasswordOpenClose onClick={() => setShowPassword((val) => !val)}>
              {!showPassword ? <EyeClosed /> : <EyeOff />}
            </PasswordOpenClose>
          </>
        </FormRow>

        {isLoading || !validateAReferral?.length ? (
          ""
        ) : (
          <ReferralContainer>
            <p>Your were referred by: </p>
            <span>
              {formatTextCapitalize(
                validateAReferral?.[0]?.referralName || "-----",
              )}
            </span>
          </ReferralContainer>
        )}

        <Button
          type="primary"
          disabled={!password || !email || isWorking}
          onClick={handleRegister}
        >
          {isWorking ? <SpinnerAndText message="Registering" /> : "Register"}
        </Button>
      </RegisterField>
    </StyledRegister>
  );
}

export default SecondRegistrationForm;
