import styled, { css } from "styled-components";
import toast from "react-hot-toast";

import { useUploadImage } from "./useUpdateUser";
import { device } from "../../../mediaQuery";
import { formatDate } from "../../utils/helpers";
import SpinnerMini from "../../ui/SpinnerMini";
import SettingsButtonTransaction from "./SettingsButtonTransaction";
import Headings from "../../ui/Headings";
import FileInput from "../../ui/FileInput";
import { useDarkMode } from "../../context/DarkModeContext";

const StyledUserInformation = styled.div`
  padding: 2.4rem 4rem;
  border: 2px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  display: grid;
  grid-template-columns: repeat(3, 1fr);

  gap: 2rem;
  font-size: 1.2rem;

  grid-column: 1 /-1;

  & p {
    display: flex;
    gap: 1rem;
  }

  & span {
    font-weight: 600;
  }

  @media ${device.laptop} {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
  }

  @media ${device.tablet} {
    grid-template-columns: 1fr;
    padding: 1rem 1rem;
  }

  ${(props) =>
    props.$isDarkMode === "true"
      ? css`
          background-color: var(--color-grey-0);
        `
      : css`
          background-image: url("/app/background/w2.jpg");
          background-size: cover;
        `}
`;

const ImageContainer = styled.div`
  width: 60%;
  position: relative;

  & div {
    opacity: 0;
    transition: all 0.41s;
  }

  &:hover div {
    opacity: 1;
    transition: all 1s;
  }
`;

const Image = styled.img`
  width: 80%;
  border-radius: 50%;
  aspect-ratio: 1;
`;

const PositionSpinner = styled.span`
  position: absolute;
  left: 38%;
  top: 50%;

  transform: translate(-50%, -50%);
  z-index: 50;
`;

const Message = styled.p`
  font-size: 1rem;
  text-align: center;
`;

const Data = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledButton = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1.5rem;
  grid-column: 2 / -1;

  @media ${device.laptop} {
    grid-column: 1 / -1;
    grid-row: 5;
  }

  @media ${device.tablet} {
    grid-column: auto;
    grid-row: 8;
    flex-wrap: wrap;
  }
`;

const DataCapitalize = styled.span`
  text-transform: capitalize;
`;

const FileUploaderContainer = styled.div`
  width: 15rem;
`;

function UserInformation({ user }) {
  const { isDarkMode } = useDarkMode();

  const { user_metadata } = user;
  const { personal, bank, identification, nextKin } = user_metadata;
  const {
    fullName,
    gender,
    DOB,
    idNumber,
    phoneNum,
    city,
    address,
    avatar,
    email,
    country,
  } = personal;

  const { year, month, day } = formatDate(DOB);

  const { bankAccount, bankAccountType, bankName } = bank || {};

  const { nextKinEmail, nextKinFullName, nextKinPhone, relationship } = nextKin;

  const { uploadImage, isPending: isUploading } = useUploadImage();

  function handleUpdateImage(data) {
    const fileSize = data[0].size;

    if (Number(fileSize) > 200000) {
      toast.error("Image file size is too large. Max 200kb");

      return;
    }

    const type = "avatar";
    const newUpdate = personal;
    const imageFile = data;
    uploadImage(
      { type, imageFile, newUpdate },
      {
        onSuccess: () => {
          toast.success(
            `Your image was ${avatar ? "updated" : "added"} successfully`
          );
        },
      }
    );
  }

  return (
    <StyledUserInformation $isDarkMode={isDarkMode.toString()}>
      <ImageContainer>
        <>
          <Image
            src={`${avatar ? avatar : "/main/default-user.jpg"}`}
            alt={`${fullName} photo`}
          />

          {isUploading && (
            <PositionSpinner>
              <SpinnerMini />
            </PositionSpinner>
          )}
          <FileUploaderContainer>
            {isUploading ? (
              <Message>Uploading... Please wait patiently</Message>
            ) : (
              <FileInput
                disabled={isUploading}
                onChange={(e) => handleUpdateImage(e.target.files)}
              />
            )}
          </FileUploaderContainer>
        </>
      </ImageContainer>

      <Data>
        <Headings type="h3">Personal</Headings>
        <p>
          Full Name: <DataCapitalize>{fullName}</DataCapitalize>
        </p>
        <p>
          Email Address:
          <span> {email}</span>
        </p>

        {gender && (
          <p>
            Gender:
            <DataCapitalize> {gender}</DataCapitalize>
          </p>
        )}
        {DOB && (
          <p>
            Date of Birtht:
            <span> {`${year}, ${month}, ${day}`}</span>
          </p>
        )}
        <p>
          User Id:
          <DataCapitalize> {idNumber}</DataCapitalize>
        </p>
      </Data>

      <Data>
        <Headings type="h3">Contact</Headings>

        <p>
          Phone:
          <span> {phoneNum}</span>
        </p>
        {address && (
          <p>
            Home Address:
            <DataCapitalize> {address}</DataCapitalize>
          </p>
        )}

        {city && (
          <p>
            City:
            <DataCapitalize> {city}</DataCapitalize>
          </p>
        )}

        <p>
          Country:
          <DataCapitalize> {country}</DataCapitalize>
        </p>
      </Data>

      {bankAccount && (
        <Data>
          <Headings type="h3">Bank</Headings>

          <p>
            Bank:
            <DataCapitalize> {bankName}</DataCapitalize>
          </p>
          <p>
            Account Number:
            <span> {bankAccount}</span>
          </p>

          <p>
            Account Type:
            <DataCapitalize> {bankAccountType}</DataCapitalize>
          </p>
          <p>
            Account Name:
            <DataCapitalize> {fullName}</DataCapitalize>
          </p>
        </Data>
      )}

      {nextKinFullName && (
        <Data>
          <Headings type="h3">Next of Kin</Headings>
          <p>
            Full Name:
            <DataCapitalize> {nextKinFullName}</DataCapitalize>
          </p>
          <p>
            Relationship:
            <DataCapitalize> {relationship}</DataCapitalize>
          </p>
          <p>
            Email address:
            <span> {nextKinEmail}</span>
          </p>
          <p>
            Phone:
            <span> {nextKinPhone}</span>
          </p>
        </Data>
      )}
      <StyledButton>
        <SettingsButtonTransaction nextKin={nextKin} idCard={identification} />
      </StyledButton>
    </StyledUserInformation>
  );
}

export default UserInformation;
