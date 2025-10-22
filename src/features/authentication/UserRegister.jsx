import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { HiOutlineEmojiHappy, HiOutlineMail } from "react-icons/hi";
import {
  HiOutlineHashtag,
  HiOutlineHome,
  HiOutlineLockClosed,
} from "react-icons/hi2";
import toast from "react-hot-toast";

import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import SpinnerAndText from "../../ui/SpinnerAndText";
import TermsAndConditionLink from "../../ui/TermsAndConditionLink";
import IconForInput from "../../ui/IconForInput";
import ButtonNextAndBack from "../../ui/ButtonNextAndBack";
import SelectInput from "../../ui/SelectInput";

import { isValidPhonePlain } from "../../utils/helpers";
import { countries } from "../../utils/ArrayHelper";

import { useSignup } from "./useSignUp";
import { useGetAReferralWithEmail } from "../referral/useReferral";
import { EyeClosed, EyeOff } from "lucide-react";

const StyledRegister = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.5rem;

  align-items: center;
  justify-content: center;

  width: 100%;
  margin: 6rem auto;
  transition: all 0.5s ease-in-out;

  ${(props) =>
    props.$searchDB === "true" &&
    css`
      margin: 0 auto;
    `}

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

const Logo = styled.h1`
  font-size: 2rem;
`;

const Heading = styled.div`
  text-align: center;

  & p {
    font-size: 1.4rem;
  }
`;

const RegisterField = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 80%;
  margin: 0 auto;
`;

const ErrorMessage = styled.span`
  font-size: 1.3rem;
  margin-top: -1rem;
  color: orangered;
  text-align: center;
`;

const TokenDecisionDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

const NeedToken = styled.p`
  padding: 1rem 1rem;
  width: 100%;
  text-transform: uppercase;
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  color: var(--color-brand-700);
  font-weight: 600;
  text-align: center;
  border-radius: 9px;

  cursor: pointer;
`;
// const HasToken = styled.p`
//   padding: 1rem 2rem;
//   width: 100%;
//   text-transform: uppercase;
//   font-size: 1.3rem;
//   background-color: var(--color-brand-700);
//   color: var(--color-brand-100);
//   text-align: center;
//   cursor: pointer;
// `;

const TokenForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ReferralData = styled.div`
  background-color: var(--color-grey-100);
  padding: 1rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  justify-content: center;

  & p {
    font-size: 1.1rem;
    text-transform: uppercase;

    & span {
      font-size: 1.2rem;
      font-weight: 600;
    }
  }
`;

const NoReferralConfirm = styled.div`
  display: grid;
  grid-template-columns: 0.2fr 1fr;
  column-gap: 1rem;
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

function UserRegister({
  searchDB,
  usersReferralData,
  isActive,
  setisProcessing,

  allAvailableBank,
}) {
  const [referralIsValidated, setReferralIsValidate] = useState(false);
  const [noReferral, setNoReferral] = useState(false);
  const [referralInformation, setReferralInformation] = useState({});

  const [error, setError] = useState({});
  const [num, setNum] = useState(1);

  const [referral, setReferral] = useState(
    usersReferralData ? usersReferralData : ""
  );
  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("");
  const [networkType, setNetworkType] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [pin] = useState("0000");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const { signup, isPending } = useSignup();

  const { validateAReferral, isPending: isReferral } =
    useGetAReferralWithEmail();

  const isWorking = isPending;

  useEffect(
    function () {
      if (isWorking) {
        setisProcessing(true);
      }

      if (!isWorking) {
        setisProcessing(false);
      }
    },
    [isWorking, setisProcessing]
  );

  function validateReferral(e) {
    e.preventDefault();

    if (!referral) {
      toast.error("Add referral's email address");
      return;
    }

    if (!referral?.includes("@") || !referral?.includes(".com")) {
      toast.error("Invalid email address. ex: (user@email.com)");
      setError({
        ...error,
        referral: "Invalid email address. ex: (user@useremail.com)",
      });

      setTimeout(() => setError({}), 4000);

      return;
    }

    if (referral) {
      validateAReferral(referral, {
        onSuccess: (res) => {
          if (!res?.length) {
            setError({
              ...error,
              referral: "Referral was not found",
            });

            setTimeout(() => setError({}), 4000);
            return;
          }

          const { id, referralName, referralPhone, referralEmail, usersId } =
            res[0];

          setReferralIsValidate(true);
          setReferralInformation({
            referralName,
            referralPhone,
            referralPubId: id,
            referralUserId: usersId,
            referralUserEmail: referralEmail,
          });
        },
      });
    }
  }

  function activateNextFun(e) {
    e.preventDefault();

    setNoReferral(true);
    setError({
      ...error,
      referral:
        "Your referral bonus will not be given to anyone if you confirm.",
    });
  }

  function handleGoBack(e) {
    e.preventDefault();
    setNum((num) => num - 1);
  }

  function handleRegister(e) {
    e.preventDefault();

    if (
      num === 8 &&
      fullName &&
      country &&
      email &&
      phoneNum &&
      bankName &&
      bankAccount &&
      pin &&
      password &&
      confirmPassword &&
      networkType &&
      password === confirmPassword
    ) {
      const newUser = {
        referral,
        fullName,
        country,
        email,
        phoneNum,
        bankName,
        bankAccount,
        password,
        balance: 0,
        pin,
        referralInformation,
        networkType,
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

    setNum((num) => num + 1);
  }

  /// for nigerian banks //////////////

  const allBanks = allAvailableBank
    ?.map((each) => {
      return {
        banks: each?.banks,
      };
    })
    .flatMap((item) => item.banks);

  return (
    <StyledRegister
      $searchDB={searchDB?.toString()}
      $isActive={isActive.toString()}
    >
      {searchDB ? (
        ""
      ) : (
        <>
          <Logo>Logo</Logo>

          <Heading>
            <h3>Welcome to Onyeozi</h3>

            <p>A Very quick step. Create an account with us.</p>
          </Heading>
        </>
      )}

      <RegisterField>
        {num === 1 ? (
          <TokenDecisionDiv>
            <NeedToken onClick={() => setNum(2)}>
              Click to open your free account
            </NeedToken>
          </TokenDecisionDiv>
        ) : (
          ""
        )}

        {num === 2 ? (
          <TokenForm>
            <NeedToken>Provide your email address</NeedToken>

            <FormRow color label="Your email address" must>
              <>
                <Input
                  disabled={isWorking}
                  placeholder="example@email.com"
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

            <ButtonNextAndBack
              nextFunction={handleRegister}
              backFunction={handleGoBack}
              disableNext={!email?.includes("@") || !email?.includes(".com")}
            />
          </TokenForm>
        ) : (
          ""
        )}

        {num === 3 ? (
          <TokenForm>
            <FormRow color label="Referred by who" must>
              <>
                <Input
                  disabled={isWorking}
                  placeholder="Referral email address"
                  type="email"
                  value={referral}
                  onChange={(e) =>
                    setReferral(e.target.value?.trim()?.split(" ")?.join(""))
                  }
                />
                <IconForInput>
                  <HiOutlineMail />
                </IconForInput>
              </>
            </FormRow>
            {error?.referral && <ErrorMessage>{error?.referral}</ErrorMessage>}

            {referralInformation?.referralName && (
              <ReferralData>
                <h5>Referral was found</h5>
                <div>
                  <p>
                    Name: <span>{referralInformation?.referralName}</span>
                  </p>
                  <p>
                    Phone: <span>{referralInformation?.referralPhone}</span>
                  </p>
                  <p>
                    Country: <span>{referralInformation?.referralCountry}</span>
                  </p>
                </div>
              </ReferralData>
            )}
            {referralIsValidated ? (
              <ButtonNextAndBack
                nextFunction={handleRegister}
                backFunction={handleGoBack}
              />
            ) : noReferral ? (
              <NoReferralConfirm>
                <Button
                  type="secondary"
                  onClick={() => {
                    setError({});
                    setNoReferral(false);
                  }}
                >
                  reset
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    setReferral("");
                    setReferralIsValidate(true);
                  }}
                >
                  confirm
                </Button>
              </NoReferralConfirm>
            ) : (
              <>
                <Button type="primary" onClick={validateReferral}>
                  {isReferral ? (
                    <SpinnerAndText message="verifying" />
                  ) : (
                    "Verify referral"
                  )}
                </Button>

                <Button type="secondary" onClick={activateNextFun}>
                  No referral
                </Button>
              </>
            )}
          </TokenForm>
        ) : (
          ""
        )}

        {num === 4 ? (
          <TokenForm>
            <FormRow color label="Full Name. (Must match your bank)" must>
              <>
                <Input
                  disabled={isWorking}
                  placeholder="Adams Smith"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <IconForInput>
                  <HiOutlineEmojiHappy />
                </IconForInput>
              </>
            </FormRow>
            {error?.fullName && <ErrorMessage>{error?.fullName}</ErrorMessage>}

            <ButtonNextAndBack
              nextFunction={handleRegister}
              backFunction={handleGoBack}
              disableNext={
                !fullName ||
                fullName?.split(" ")?.length <= 1 ||
                !fullName?.split(" ")?.[1]
              }
            />
          </TokenForm>
        ) : (
          ""
        )}

        {num === 5 ? (
          <TokenForm>
            <FormRow color label="Country" must>
              <>
                <SelectInput
                  disabled={isWorking}
                  placeholder="BM1*******"
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  {countries.map((el, i) => (
                    <option key={i} value={el.value}>
                      {el.option}
                    </option>
                  ))}
                </SelectInput>
                <IconForInput>
                  <HiOutlineHashtag />
                </IconForInput>
              </>
            </FormRow>
            {error?.country && <ErrorMessage>{error?.country}</ErrorMessage>}

            <ButtonNextAndBack
              nextFunction={handleRegister}
              backFunction={handleGoBack}
              disableNext={!country}
            />
          </TokenForm>
        ) : (
          ""
        )}

        {num === 6 ? (
          <TokenForm>
            {/* <FormRow color label="4 transaction digit pin" must>
              <>
                <Input
                  disabled={isWorking}
                  placeholder="Transaction pin"
                  type="tel"
                  value={pin}
                  onChange={(e) => {
                    // console.log(Number(e.target.value));
                    if (
                      (e.target.value?.length < 5 && Number(e.target.value)) ||
                      Number(e.target.value) === 0
                    ) {
                      // console.log("entered");
                      setPin(e.target.value);
                    }

                    if (e.target.value === "") {
                      setPin("");
                    }
                  }}
                />

                <IconForInput>
                  <HiOutlineKey />
                </IconForInput>
              </>
            </FormRow> */}

            <FormRow color label="Your phone Number" must>
              <>
                <Input
                  disabled={isWorking}
                  placeholder="Phone number"
                  type="tel"
                  value={phoneNum}
                  maxLength={11}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow only digits and max 11 characters
                    if (/^\d{0,11}$/.test(value)) {
                      setPhoneNum(value);
                    }
                  }}
                />
                <IconForInput>
                  <HiOutlineHashtag />
                </IconForInput>
              </>
            </FormRow>

            <FormRow color label="Network Name" must>
              <>
                <SelectInput
                  disabled={isWorking}
                  placeholder="MTN || AIRTEL || GLO"
                  type="text"
                  value={networkType}
                  onChange={(e) => setNetworkType(e.target.value)}
                >
                  {["", "mtn", "glo", "airtel", "9mobile"].map((el, i) => (
                    <option key={i} value={el}>
                      {el?.toUpperCase()}
                    </option>
                  ))}
                </SelectInput>
                <IconForInput>
                  <HiOutlineHashtag />
                </IconForInput>
              </>
            </FormRow>

            {error?.email_tel && (
              <ErrorMessage>{error?.email_tel}</ErrorMessage>
            )}

            <ButtonNextAndBack
              nextFunction={handleRegister}
              backFunction={handleGoBack}
              disableNext={
                !pin ||
                String(pin).length !== 4 ||
                !phoneNum ||
                !isValidPhonePlain(phoneNum) ||
                !networkType
              }
            />
          </TokenForm>
        ) : (
          ""
        )}

        {num === 7 ? (
          <TokenForm>
            <FormRow color label="Bank Name" must>
              <>
                <SelectInput
                  disabled={isWorking}
                  placeholder="Bank Name"
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                >
                  <option value={""}>Choose a bank from options</option>

                  {allBanks?.map((each, i) => {
                    return (
                      <option key={i} value={each?.name}>
                        {each?.name}
                      </option>
                    );
                  })}
                </SelectInput>
                <IconForInput>
                  <HiOutlineHome />
                </IconForInput>
              </>
            </FormRow>

            <FormRow color label="Account Number" must>
              <>
                <Input
                  disabled={isWorking}
                  placeholder="Account Number"
                  type="tel"
                  value={bankAccount}
                  onChange={(e) => {
                    if (
                      Number(e.target.value) ||
                      Number(e.target.value) === 0
                    ) {
                      setBankAccount(e.target.value);
                    }

                    if (e.target.value === "") {
                      setBankAccount("");
                    }
                  }}
                />
                <IconForInput>
                  <HiOutlineHashtag />
                </IconForInput>
              </>
            </FormRow>
            {error?.bank && <ErrorMessage>{error?.bank}</ErrorMessage>}

            <ButtonNextAndBack
              nextFunction={handleRegister}
              disableNext={
                !bankName ||
                !bankAccount ||
                bankAccount.length > 10 ||
                bankAccount.length < 10
              }
            />
          </TokenForm>
        ) : (
          ""
        )}

        {num === 8 ? (
          <>
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

                <PasswordOpenClose
                  onClick={() => setShowPassword((val) => !val)}
                >
                  {!showPassword ? <EyeClosed /> : <EyeOff />}
                </PasswordOpenClose>
              </>
            </FormRow>
            <FormRow color label="Confirm password" must>
              <>
                <Input
                  disabled={isWorking}
                  placeholder="***********"
                  type={showConfirmPassword ? "text" : "password"}
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

                <PasswordOpenClose
                  onClick={() => setShowConfirmPassword((val) => !val)}
                >
                  {!showConfirmPassword ? <EyeClosed /> : <EyeOff />}
                </PasswordOpenClose>
              </>
            </FormRow>
            {error?.password && <ErrorMessage>{error?.password}</ErrorMessage>}

            <Button
              type="primary"
              disabled={
                !password || !confirmPassword || password !== confirmPassword
              }
              onClick={handleRegister}
            >
              {isWorking ? (
                <SpinnerAndText message="Registering" />
              ) : (
                "Register"
              )}
            </Button>
            <TermsAndConditionLink />
          </>
        ) : (
          ""
        )}
      </RegisterField>
    </StyledRegister>
  );
}

export default UserRegister;
