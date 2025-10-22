import styled, { css } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import SpinnerAndText from "../../ui/SpinnerAndText";
import TermsAndConditionLink from "../../ui/TermsAndConditionLink";
import { useLogin } from "./useLogin";
import Button from "../../ui/Button";
import IconForInput from "../../ui/IconForInput";
import { HiOutlineMail } from "react-icons/hi";
import { HiOutlineLockClosed } from "react-icons/hi2";
import { EyeClosed, EyeOff } from "lucide-react";

const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.5rem;

  align-items: center;
  justify-content: center;

  width: 100%;
  margin: 8rem auto;

  ${(props) =>
    props.$searchDB === "true" &&
    css`
      margin: 0 auto;
    `}

  transition: all 0.5s ease-in-out;

  ${(props) =>
    props.$isActive === "true"
      ? css`
          transform: translateX(0%);
        `
      : css`
          transform: translateX(-100%);
          opacity: 0;
        `}

  position: absolute;
`;

const Logo = styled.h1`
  font-size: 2rem;
`;

const Heading = styled.div`
  text-align: center;

  & p {
    font-size: 1.4rem;
  }
`;

const FormField = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 80%;
`;

const ForgottenPassword = styled.div`
  display: flex;
  margin-top: -3rem;
  color: #f05b25c5;
  font-weight: 600;
  font-size: 1.3rem;
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

function Login({ searchDB, isActive, setisProcessing }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { isPending, login } = useLogin();

  useEffect(
    function () {
      if (isPending) {
        setisProcessing(true);
      }

      if (!isPending) {
        setisProcessing(false);
      }
    },
    [isPending, setisProcessing]
  );

  function handleLogin(e) {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please provide your email or password to login");
      return;
    }

    if (password?.length < 6) {
      toast.error("Please provide valid password greater than 6");
      return;
    }

    login(
      { email, password },
      {
        onSuccess: () => {
          navigate("/app", {
            replace: true,
          });
        },
      }
    );
  }

  return (
    <StyledLogin
      $searchDB={searchDB?.toString()}
      $isActive={isActive.toString()}
    >
      {searchDB ? (
        ""
      ) : (
        <>
          <Logo>Logo</Logo>

          <Heading>
            <h3>Welcome Back</h3>

            <p>Login to your c account.</p>
          </Heading>
        </>
      )}

      <FormField>
        <FormRow color label="Email Address" must>
          <>
            <Input
              type="email"
              placeholder="yourmail@example.com"
              disabled={isPending}
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

        <FormRow color label="Your Password (min: 6 digits)" must>
          <>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="***********"
              disabled={isPending}
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

        <Button
          type="primary"
          onClick={(e) => handleLogin(e)}
          disabled={isPending || !email || !password}
        >
          {isPending ? <SpinnerAndText message="Login you in" /> : "Continue"}
        </Button>
      </FormField>
      <ForgottenPassword>
        <Link to="/forgot_password/auth">Forgot your password ?</Link>
      </ForgottenPassword>
      <TermsAndConditionLink />
    </StyledLogin>
  );
}

export default Login;
