import styled, { css } from "styled-components";
import Logo from "../../ui/Logo";
import Button from "../../ui/Button";
import {
  useGetAllContact,
  useGetAllPackages,
} from "../../features/allPackage/usePackage";
import Spinner from "../../ui/Spinner";
import { useDarkMode } from "../../context/DarkModeContext";
import LogoMarquee from "../../ui/LogoMarquee";
import { IoLogoWhatsapp } from "react-icons/io";

const StyledGetRegistrationCode = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 5rem 0 2rem;
  min-height: 100vh;

  ${(props) =>
    props.$isDarkMode === "true"
      ? css`
          background-color: var(--color-grey-50);
        `
      : css`
          background-image: url("/app/background/w4.jpg");
          background-size: cover;
        `}
`;

const HeadingDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin: 0 auto;
`;

const PackagesDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 2rem;
  gap: 1rem;
`;

const EachPackageDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 0rem;
  row-gap: 0.41rem;

  padding: 1.5rem 2rem;

  & div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    & p {
      font-size: 1.2rem;
    }

    & span {
      font-size: 1.5rem;
      font-weight: 600;
    }
  }

  & a {
    grid-column: 1 / span 2;
    justify-self: center;
  }

  ${(props) =>
    props.$isDarkMode === "true"
      ? css`
          background-color: var(--color-grey-0);
          border: 1.5px solid var(--color-grey-50);
        `
      : css`
          background-image: url("/app/background/w2.jpg");
          background-size: cover;
        `}
`;

function GetRegistrationCode() {
  const { isDarkMode } = useDarkMode();

  const { allPackages, isLoading } = useGetAllPackages();
  const { allContact, isLoading: isContact } = useGetAllContact();
  if (isLoading || isContact) return <Spinner />;

  const { phone } = allContact?.[0] || {};

  return (
    <StyledGetRegistrationCode $isDarkMode={isDarkMode.toString()}>
      <HeadingDiv>
        <Logo />

        <LogoMarquee double={true} />
        {/* <Headings type="h3">
          Gain insight of the package we have to purchase your registration code
        </Headings> */}
      </HeadingDiv>

      <PackagesDiv>
        {allPackages?.map((each, i) => (
          <EachPackageDiv key={i} $isDarkMode={isDarkMode.toString()}>
            <div>
              <p>Package Name</p>
              <span>{each.title}</span>
            </div>

            <div>
              <p>Package cost</p>
              <span>{each.cost}</span>
            </div>

            <div>
              <p>Referral gain</p>
              <span>{each.referralBonus}</span>
            </div>

            <div>
              <p>Welome Bonus</p>
              <span>{each.welcomeBonus}</span>
            </div>

            <div>
              <p>Daily Earnings</p>
              <span>{each.dailyEarnings}</span>
            </div>

            <div>
              <p>Earnings per Task</p>
              <span>{each.eachTaskEarns}</span>
            </div>

            <a href={`https://wa.me/${phone}`} rel="noreferrer" target="_blank">
              <Button type="primary">
                <IoLogoWhatsapp />
                Click to buy this
              </Button>
            </a>
          </EachPackageDiv>
        ))}
      </PackagesDiv>
    </StyledGetRegistrationCode>
  );
}

export default GetRegistrationCode;
