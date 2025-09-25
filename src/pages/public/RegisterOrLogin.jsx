import { useState } from "react";
import styled, { css } from "styled-components";
import UserRegister from "../../features/authentication/UserRegister";
import Login from "../../features/authentication/Login";
import Logo from "../../ui/Logo";
import { useSearchParams } from "react-router-dom";
import { useDarkMode } from "../../context/DarkModeContext";
import { useGetAllAvailableBank } from "../../features/depositType/useDepositType";

const StyledRegisterOrLogin = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
  align-items: center;

  padding-top: 4rem;
  height: 100vh;
  background-color: var(--color-grey-10);

  overflow: hidden;
`;

const Heading = styled.div`
  text-align: center;
  max-width: 30rem;

  & p {
    font-size: 1.3rem;
  }
  position: relative;
`;

const ToggleLogin = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  background-color: var(--color-grey-0);
  padding: 1rem 2rem;
  border-radius: 9px;
`;

const LoginButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 0.5s;
  text-transform: capitalize;
  border-radius: 9px;

  ${(props) =>
    props.$isProcessing === "true"
      ? css`
          cursor: not-allowed;
        `
      : css`
          cursor: pointer;
        `}

  & p {
    font-size: 1.3rem;
    text-transform: uppercase;
  }

  ${(props) =>
    props.$isActive === "true" &&
    css`
      background-color: var(--color-brand-700);
      color: var(--color-brand-50);
      padding: 0.5rem 6rem;

      & p {
        font-size: 1.5rem;
        font-weight: 600;
      }
    `}
`;
const RegisterButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 0.5s;
  border-radius: 9px;

  ${(props) =>
    props.$isProcessing === "true"
      ? css`
          cursor: not-allowed;
        `
      : css`
          cursor: pointer;
        `}

  & p {
    font-size: 1.3rem;
    text-transform: uppercase;
  }

  ${(props) =>
    props.$isActive === "true" &&
    css`
      background-color: var(--color-brand-700);
      color: var(--color-brand-50);
      padding: 0.5rem 6rem;

      & p {
        font-size: 1.5rem;
        font-weight: 600;
      }
    `}
`;

const StyledFormDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  position: relative;

  width: 100%;
`;

function RegisterOrLogin() {
  const { isDarkMode } = useDarkMode();
  const [isProcessing, setisProcessing] = useState(false);

  const { allAvailableBank } = useGetAllAvailableBank();

  const [searchParams] = useSearchParams();
  const usersReferralData = searchParams?.get("referral");

  const [isActive, setIsActive] = useState(
    usersReferralData ? "register" : "login"
  );

  return (
    <StyledRegisterOrLogin $isDarkMode={isDarkMode.toString()}>
      <Logo />

      <Heading>
        {isActive === "login" ? (
          <>
            <h3>Welcome Back</h3>
            <p>Securely log into your TASKIIT account</p>
          </>
        ) : (
          <>
            <h3>Start your journey to success</h3>
            <p>Please carefully fill in the form with correct information.</p>
          </>
        )}
      </Heading>

      <ToggleLogin>
        <LoginButton
          $isActive={(isActive === "login").toString()}
          $isProcessing={isProcessing.toString()}
          onClick={() => {
            if (!isProcessing) {
              setIsActive("login");
            }
          }}
        >
          <p>Login</p>
        </LoginButton>
        <RegisterButton
          $isActive={(isActive === "register").toString()}
          $isProcessing={isProcessing.toString()}
          onClick={() => {
            if (!isProcessing) {
              setIsActive("register");
            }
          }}
        >
          <p>Register</p>
        </RegisterButton>
      </ToggleLogin>

      <StyledFormDiv>
        <Login
          setisProcessing={setisProcessing}
          searchDB={true}
          isActive={isActive === "login"}
        />

        <UserRegister
          setisProcessing={setisProcessing}
          isActive={isActive === "register"}
          searchDB={true}
          usersReferralData={usersReferralData}
          allAvailableBank={allAvailableBank}
        />
      </StyledFormDiv>
    </StyledRegisterOrLogin>
  );
}

export default RegisterOrLogin;
