import styled from "styled-components";
import { device } from "../../../mediaQuery";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Headings from "../../ui/Headings";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import {
  HiOutlineEnvelope,
  HiOutlineGlobeAsiaAustralia,
  HiOutlineMapPin,
  HiOutlineUserCircle,
  HiOutlineUsers,
} from "react-icons/hi2";
import { isValidPhone } from "../../utils/helpers";
import SelectInput from "../../ui/SelectInput";
import Button from "../../ui/Button";
import SpinnerAndText from "../../ui/SpinnerAndText";
import { useGetLocation } from "../authentication/useUser";
import Form from "../../ui/Form";
import { useUpdateUser } from "./useUpdateUser";
import { countries } from "../../utils/ArrayHelper";
import { useDarkMode } from "../../context/DarkModeContext";

const StyledForm = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;

  @media ${device.tablet} {
    grid-template-columns: 1fr;
    justify-items: center;
  }
`;

const StyledButton = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1rem;

  @media ${device.mobileL} {
    align-items: center;
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

function UpdateUserData({ userData }) {
  const { isDarkMode } = useDarkMode();

  const {
    user_metadata: { personal },
  } = userData;
  const { phoneNum, gender, address, city, country } = personal;

  const { register, handleSubmit, formState, setValue } = useForm({
    defaultValues: personal,
  });
  const { errors } = formState;

  const { fetchAddress } = useGetLocation();
  const [usersCountry, setCountry] = useState("");
  const [countryData, setCountryData] = useState("");
  const [isChanged, setIsChanged] = useState(false);

  const { updateUser, isPending } = useUpdateUser();

  function handleSetCountry(value) {
    setCountry(value);
    setIsChanged(true);
    setValue("phone", "");
    setValue("address", "");

    setValue("city", "");
  }

  function resetValues() {
    setValue("phoneNum", phoneNum);
    setValue("gender", gender);
    setValue("address", address);
    setValue("country", country);
    setValue("city", city);

    setCountry(country);
    setIsChanged(false);
  }

  useEffect(
    function () {
      fetchAddress(usersCountry, {
        onSuccess: (data) => {
          setCountryData(data);
        },
        onError: () => {
          toast.error("Make sure your internet is working");
        },
      });
    },
    [usersCountry, fetchAddress, setCountryData]
  );

  function onSubmit(data) {
    const newUpdate = { personal: data };
    updateUser(newUpdate, {
      onSuccess: () => {
        toast.success("Your information was updated successfully");
        setIsChanged(false);
      },
    });
  }

  return (
    <Form
      $grid={true.toString()}
      onSubmit={handleSubmit(onSubmit)}
      $isDarkMode={isDarkMode.toString()}
    >
      <Headings type="h3">Update personal data</Headings>
      <StyledForm>
        <FormRow label="Full Name" error={errors?.fullName?.message} must>
          <>
            <Input
              disabled={true}
              type="text"
              placeholder="Joe Hill"
              id="fullName"
              {...register("fullName", {
                required: "This field is required",
                minLength: {
                  value: 8,
                  message: "Name should be 8 character long",
                },
              })}
            />

            <IconPrefix>
              <HiOutlineUserCircle />
            </IconPrefix>
          </>
        </FormRow>
        <FormRow label="Email" error={errors?.email?.message} must>
          <>
            <Input
              disabled={true}
              type="email"
              placeholder="example@mail.com"
              id="email"
              {...register("email", {
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
        <FormRow label="Phone Number" error={errors?.phoneNum?.message} must>
          <>
            <Input
              disabled={isPending}
              type="tel"
              placeholder="*******"
              id="phoneNum"
              {...register("phoneNum", {
                required: "This field is required",
                validate: (v) =>
                  isValidPhone(v) || "Please give us a valid phone number",
              })}
            />

            <IconPrefix>
              {countryData?.length ? (
                `${countryData?.[0]?.idd?.root}${
                  countryData?.[0]?.idd?.suffixes?.length === 1
                    ? countryData?.[0]?.idd?.suffixes?.[0]
                    : ""
                }`
              ) : (
                <HiOutlineGlobeAsiaAustralia />
              )}
            </IconPrefix>
          </>
        </FormRow>
        <FormRow label="Gender" error={errors?.gender?.message} must>
          <>
            <SelectInput
              disabled={isPending}
              type="text"
              id="gender"
              {...register("gender", {
                required: "This field is required",
              })}
            >
              {["", "male", "female", "Personal"].map((el) => (
                <option key={el}>{el}</option>
              ))}
            </SelectInput>

            <IconPrefix>
              <HiOutlineUsers />
            </IconPrefix>
          </>
        </FormRow>
        <FormRow label="Address" error={errors?.address?.message} must>
          <>
            <Input
              disabled={isPending}
              type="text"
              id="address"
              {...register("address", {
                required: "This field is required",
                minLength: {
                  value: 8,
                  message: "Address needs a minimum of 8 characters",
                },
              })}
            />

            <IconPrefix>
              <HiOutlineGlobeAsiaAustralia />
            </IconPrefix>
          </>
        </FormRow>
        <FormRow label="Country" error={errors?.country?.message} must>
          <>
            <SelectInput
              disabled={isPending}
              id="country"
              {...register("country", {
                required: "This field is required",
                onChange: (e) => handleSetCountry(e.target.value),
              })}
            >
              {countries.map((el) => (
                <option value={el.value} key={el.value}>
                  {el.option}
                </option>
              ))}
            </SelectInput>

            <IconPrefix>
              {countryData?.length ? (
                <div>
                  <img src={`${countryData?.[0]?.flags?.png}`} />
                </div>
              ) : (
                <HiOutlineGlobeAsiaAustralia />
              )}
            </IconPrefix>
          </>
        </FormRow>

        <FormRow label="City" error={errors?.city?.message} must>
          <>
            <Input
              disabled={isPending}
              id="city"
              {...register("city", {
                required: "This field is required",
              })}
            />

            <IconPrefix>
              <HiOutlineMapPin />
            </IconPrefix>
          </>
        </FormRow>
        <StyledButton>
          <Button type="primary" disabled={isPending}>
            {isPending ? <SpinnerAndText message="updating..." /> : "Update Me"}
          </Button>

          {isChanged && (
            <Button
              onClick={(e) => {
                e.preventDefault();
                resetValues();
              }}
              type="cancel"
            >
              reset
            </Button>
          )}
        </StyledButton>
      </StyledForm>
    </Form>
  );
}

export default UpdateUserData;
