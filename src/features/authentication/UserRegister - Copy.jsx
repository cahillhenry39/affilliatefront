import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import {
  HiOutlineEmojiHappy,
  HiOutlineKey,
  HiOutlineMail,
} from "react-icons/hi";
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

import { generateRandomChar, isValidPhone } from "../../utils/helpers";
import { countries } from "../../utils/ArrayHelper";

import { useSignup } from "./useSignUp";
import { useGetTokenWithToken, useUpdateToken } from "../token/useToken";
import {
  useCreateReferral,
  useGetAReferralWithEmail,
  useUpdateReferral,
} from "../referral/useReferral";
import { useCreateATransaction } from "../transaction/useTransaction";
import { useCreateActivity } from "../activities/useActivities";
import {
  useAdminGetAUser,
  useAdminUpdateAUser,
} from "../../pages/agentApp/services/useServiceUsers";

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
  padding: 1rem 2rem;
  width: 100%;
  text-transform: uppercase;
  font-size: 1.3rem;
  background-color: var(--color-brand-200);
  color: var(--color-brand-700);
  text-align: center;
  cursor: pointer;
`;
const HasToken = styled.p`
  padding: 1rem 2rem;
  width: 100%;
  text-transform: uppercase;
  font-size: 1.3rem;
  background-color: var(--color-brand-700);
  color: var(--color-brand-100);
  text-align: center;
  cursor: pointer;
`;

const TokenForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TokenData = styled.div`
  background-color: var(--color-grey-100);
  padding: 1rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;

  & h5 {
    color: green;
    font-size: 1.5rem;
  }

  & div {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;
  }

  & p {
    font-size: 1.1rem;
    text-transform: uppercase;

    & span {
      font-size: 1.2rem;
      font-weight: 600;
    }
  }
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

const StyledButton = styled.div`
  display: grid;
  grid-template-columns: 0.2fr 1fr;
  column-gap: 1rem;
`;

function UserRegister({
  searchDB,
  usersReferralData,
  isActive,
  setisProcessing,
}) {
  const [tokenIsValidated, setTokenIsValidate] = useState(false);
  const [tokenInformation, setTokenInformation] = useState({});

  const [referralIsValidated, setReferralIsValidate] = useState(false);
  const [noReferral, setNoReferral] = useState(false);
  const [referralInformation, setReferralInformation] = useState({});

  const [error, setError] = useState({});
  const [triedToken, setTriedToken] = useState(3);
  const [num, setNum] = useState(1);

  const [token, setToken] = useState("");
  const [referral, setReferral] = useState(
    usersReferralData ? usersReferralData : ""
  );
  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [pin, setPin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const { signup, isPending } = useSignup();

  const { validateAToken, isPending: isToken } = useGetTokenWithToken();
  const { validateAReferral, isPending: isReferral } =
    useGetAReferralWithEmail();

  const { createReferralAccount, isPending: isCreatingReferral } =
    useCreateReferral();
  const { updateToken, isPending: isUpdatingToken } = useUpdateToken();
  const { updateReferral, isPending: isUpdatingReferral } = useUpdateReferral();

  const { createTransaction, isPending: isTransact } = useCreateATransaction();

  const { createActivity, isPending: isActivity } = useCreateActivity();

  const { agentGetuser, isPending: isGettingUser } = useAdminGetAUser();
  const { agentUpdateUser, isPending: isUpdating } = useAdminUpdateAUser();

  const isWorking =
    isPending ||
    isCreatingReferral ||
    isUpdatingToken ||
    isUpdatingReferral ||
    isTransact ||
    isActivity ||
    isGettingUser ||
    isUpdating;

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

  function validateToken(e) {
    e.preventDefault();
    if (!token) {
      return;
    }

    if (token.length < 15 || token.length > 15) {
      setTriedToken((token) => token - 1);
      toast.error("Invalid token. You may be barred for 12 hours");
      setError({
        ...error,
        token: `Token is invalid. (${triedToken - 1}) ${
          triedToken - 1 <= 1 ? "chance" : "chances"
        } remain`,
      });

      setTimeout(() => setError({}), 4000);

      return;
    }

    // if database should check and token is invalid, the same condition above will take effect.

    validateAToken(token, {
      onSuccess: (data) => {
        if (!data.length) {
          setTriedToken((token) => token - 1);
          toast.error("Invalid token. You may be barred for 12 hours");
          setError({
            ...error,
            token: `Token is invalid. (${triedToken - 1}) ${
              triedToken - 1 <= 1 ? "chance" : "chances"
            } remain`,
          });

          setTimeout(() => setError({}), 4000);

          return;
        }

        // BM1test11111111

        if (data?.length) {
          const {
            id,
            cost,
            packageTitle,
            packageWelcomeBonus,
            referralAmount,
            packageId,
            registeredEmail,
          } = data[0];

          if (registeredEmail && registeredEmail !== email) {
            setTriedToken((token) => token - 1);
            toast.error(
              `Invalid token. You may be barred for 12 hours (${
                triedToken - 1
              }) ${triedToken - 1 <= 1 ? "chance" : "chances"} remain`
            );
            setError({
              ...error,
              token: `Token belongs to ${registeredEmail}`,
            });

            setTimeout(() => setError({}), 4000);
            return;
          }

          const updatedToken = {
            registeredDate: new Date(),
            registeredEmail: email,
          };

          updateToken(
            { id, updatedToken },
            {
              onSuccess: (data) => {
                const { registeredEmail } = data[0];

                setTokenIsValidate(true);
                setTokenInformation({
                  ...tokenInformation,
                  packageName: packageTitle,
                  packageAmount: cost,
                  tokenId: id,
                  packageWelcomeBonus,
                  referralAmount,
                  packageId,
                  registeredEmail,
                });
              },
            }
          );
        }
      },

      onError: () => {
        setTriedToken((token) => token - 1);
        toast.error("Invalid token. You may be barred for 12 hours");
        setError({
          ...error,
          token: `Token is invalid. (${triedToken - 1}) ${
            triedToken - 1 <= 1 ? "chance" : "chances"
          } remain`,
        });

        setTimeout(() => setError({}), 4000);
      },
    });
  }

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
        referral: "Invalid email address. ex: (user@email.com)",
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

          const {
            id,
            referralName,
            referralCountry,
            referralPhone,
            totalReferralAmount,
            totalReferred,
            referralEmail,
            usersId,
          } = res[0];

          setReferralIsValidate(true);
          setReferralInformation({
            ...referralInformation,
            referralName,
            referralPhone,
            referralCountry,
            referralId: id,
            totalReferralAmount,
            totalReferred,
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
      token &&
      fullName &&
      country &&
      email &&
      phoneNum &&
      bankName &&
      bankAccount &&
      pin &&
      password &&
      confirmPassword &&
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
        balance: Number(tokenInformation.packageWelcomeBonus),
        pin,
        idNumber: "Champ" + generateRandomChar(6),
        userPackageId: tokenInformation.packageId,
        userPackageTitle: tokenInformation.packageName,
        userPackageCost: tokenInformation.packageAmount,
      };

      signup(newUser, {
        onSuccess: (data) => {
          const { id, user_metadata } = data.user;
          const { email, country, fullName, phoneNum } = user_metadata.personal;

          const updatedToken = {
            dateUsed: new Date(),
            isUsedByWho: email,
            isUsedByWhoId: id,
            isActive: false,
          };

          updateToken(
            { id: tokenInformation.tokenId, updatedToken },
            {
              onSuccess: () => {
                const newReferral = {
                  referralPhone: phoneNum,
                  referralName: fullName,
                  referralEmail: email,
                  referralCountry: country,
                  usersId: id,
                  referredByWhoId: referralInformation?.referralUserId,
                  referredBy: referralInformation?.referralName,
                  amountPaidToReferral: tokenInformation?.referralAmount,
                  referralUrl: `member/auth?referral=${email}`,
                };
                createReferralAccount(newReferral, {
                  onSuccess: () => {
                    if (referral) {
                      const updatedReferral = {
                        totalReferralAmount:
                          Number(referralInformation.totalReferralAmount) +
                          Number(tokenInformation?.referralAmount),
                        totalReferred:
                          Number(referralInformation.totalReferred) + 1,
                      };

                      updateReferral(
                        {
                          id: referralInformation.referralId,
                          updatedReferral,
                        },
                        {
                          onSuccess: () => {
                            agentGetuser(referralInformation.referralUserId, {
                              onSuccess: (data) => {
                                const { bank, personal } =
                                  data.user.user_metadata;

                                const newUpdate = {
                                  bank: {
                                    ...bank,
                                    balance:
                                      Number(bank.balance) +
                                      Number(tokenInformation.referralAmount),
                                  },
                                };

                                agentUpdateUser(
                                  {
                                    id: referralInformation.referralUserId,
                                    newUpdate,
                                  },
                                  {
                                    onSuccess: () => {
                                      const newTransaction = {
                                        userId:
                                          referralInformation.referralUserId,
                                        amount: Number(
                                          tokenInformation.referralAmount
                                        ),
                                        reference:
                                          "Invoice-" + generateRandomChar(5),
                                        message: "Referral bonus",
                                        type: "deposit",
                                        status: "success",
                                      };

                                      createTransaction(newTransaction, {
                                        onSuccess: () => {
                                          const newActivity = {
                                            usersPhoneNum:
                                              referralInformation.referralPhone,
                                            avatar: personal.avatar,
                                            amount: Number(
                                              tokenInformation.referralAmount
                                            ),
                                            message: "Referral Bonus",
                                            type: "referral",
                                            usersId:
                                              referralInformation.referralUserId,
                                          };

                                          createActivity(newActivity, {
                                            onSuccess: () => {
                                              const newTransaction = {
                                                userId: id,
                                                amount: Number(
                                                  tokenInformation.packageWelcomeBonus
                                                ),
                                                reference:
                                                  "invoice-" +
                                                  generateRandomChar(5),
                                                message: "Welcome bonus",
                                                type: "deposit",
                                                status: "success",
                                              };

                                              createTransaction(
                                                newTransaction,
                                                {
                                                  onSuccess: () => {
                                                    const newActivity = {
                                                      usersPhoneNum: phoneNum,
                                                      avatar: "",
                                                      amount: Number(
                                                        tokenInformation.packageWelcomeBonus
                                                      ),
                                                      message: "Welcome Bonus",
                                                      type: "referral",
                                                      usersId: id,
                                                    };

                                                    createActivity(
                                                      newActivity,
                                                      {
                                                        onSuccess: () => {
                                                          if (!isWorking)
                                                            toast.success(
                                                              "Your registration was successful"
                                                            );
                                                          navigate("/app", {
                                                            replace: true,
                                                          });
                                                        },
                                                      }
                                                    );
                                                  },
                                                }
                                              );
                                            },
                                          });
                                        },
                                      });
                                    },
                                  }
                                );
                              },
                            });
                          },
                        }
                      );

                      return;
                    }

                    if (!referral) {
                      const newTransaction = {
                        userId: id,
                        amount: Number(tokenInformation.packageWelcomeBonus),
                        reference: "invoice-" + generateRandomChar(5),
                        message: "Welcome bonus",
                        type: "deposit",
                        status: "success",
                      };

                      createTransaction(newTransaction, {
                        onSuccess: () => {
                          const newActivity = {
                            usersPhoneNum: phoneNum,
                            avatar: "",
                            amount: Number(
                              tokenInformation.packageWelcomeBonus
                            ),
                            message: "Welcome Bonus",
                            type: "referral",
                            usersId: id,
                          };

                          createActivity(newActivity, {
                            onSuccess: () => {
                              if (!isWorking)
                                toast.success(
                                  "Your registration was successful"
                                );
                              navigate("/app", { replace: true });
                            },
                          });
                        },
                      });
                    }
                  },
                });
              },
            }
          );
        },
      });

      return;
    }

    setNum((num) => num + 1);
  }

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
            <HasToken onClick={() => setNum(2)}>
              I already have a token
            </HasToken>

            <NeedToken>
              <Link to="/new_user/register">I need a registration token</Link>
            </NeedToken>
          </TokenDecisionDiv>
        ) : (
          ""
        )}

        {num === 2 ? (
          <TokenForm>
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

            <FormRow color label="Token" must>
              <>
                <Input
                  disabled={isWorking}
                  placeholder="BM1*******"
                  type="text"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                />
                <IconForInput>
                  <HiOutlineHashtag />
                </IconForInput>
              </>
            </FormRow>
            {error?.token && <ErrorMessage>{error?.token}</ErrorMessage>}

            {tokenInformation?.packageName && (
              <TokenData>
                <h5>Token is valid</h5>
                <div>
                  <p>
                    Type: <span>{tokenInformation?.packageName}</span>
                  </p>
                  <p>
                    Amount: <span>{tokenInformation?.packageAmount}</span>
                  </p>
                </div>
              </TokenData>
            )}

            {tokenIsValidated ? (
              <ButtonNextAndBack
                nextFunction={handleRegister}
                removeBack={true}
                disableBack={Boolean(tokenInformation?.packageName).toString()}
              />
            ) : (
              <StyledButton>
                <ButtonNextAndBack backFunction={handleGoBack} removeNext />
                <Button
                  type="primary"
                  onClick={validateToken}
                  disabled={
                    !email?.includes("@") || !email?.includes(".com") || !token
                  }
                >
                  {isToken ? (
                    <SpinnerAndText message="validating" />
                  ) : (
                    "Validate token"
                  )}
                </Button>
              </StyledButton>
            )}
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
            <FormRow color label="4 transaction digit pin" must>
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
            </FormRow>

            <FormRow color label="Your phone Number" must>
              <>
                <Input
                  disabled={isWorking}
                  placeholder="Phone number"
                  type="tel"
                  value={phoneNum}
                  onChange={(e) => {
                    if (Number(e.target.value)) {
                      setPhoneNum(Number(e.target.value));
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
                !isValidPhone(phoneNum)
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
                <Input
                  disabled={isWorking}
                  placeholder="Bank Name"
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                />
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
                  disabled={isWorking}
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
