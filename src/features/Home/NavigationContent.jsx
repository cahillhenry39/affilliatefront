import { NavLink, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import useUser from "../authentication/useUser";

const StyledModalAddProduct = styled.div`
  ${(props) =>
    props.$isShowing === "true"
      ? css`
          background-color: #000000a0;
          height: 90vh;
          width: 100%;

          position: absolute;
          right: 0;
          top: 10%;
          bottom: 0;
          left: 0;
          z-index: 10;
          overflow-y: hidden;
        `
      : css`
          display: none;
          position: unset;
        `}
`;

const ModalReferralRules = styled.div`
  background-color: var(--color-grey-10);
  height: fit-content;
  width: 100%;
  padding: 2rem 1.5rem 1rem;

  position: absolute;
  top: 8%;
  right: 50%;

  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 5px 5px #00000040;

  opacity: 1;

  transition: all 0.61s;
  z-index: 10;

  overflow-y: hidden;
  &::-webkit-scrollbar {
    width: 0;
  }

  ${(props) =>
    props.$isShowing === "true"
      ? css`
          transform: translate(50%, 0%);

          opacity: 1;
        `
      : css`
          transform: translate(50%, -150%);

          opacity: 0;
        `}
`;

const StyledHelperContainer = styled.div`
  background-color: var(--color-grey-0);
  padding: 4rem 2rem 1rem;

  width: 100%;
`;

const StyledFirstContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 3rem;

  & h3 {
    font-size: 1.1rem;
    font-weight: 500;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    letter-spacing: 0.51rem;
  }

  & button {
    margin-top: 2rem;
    border: none;
    border-radius: 11px;
    padding: 1rem;
    font-size: 1.3rem;
    background-color: var(--color-brand-700);
    color: var(--color-grey-0);
  }
`;

const ParaContentUl = styled.ul`
  font-size: 1.3rem;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-left: 1rem;
  padding-bottom: 2rem;
  margin-top: 2rem;
  border-bottom: 1px solid var(--color-grey-100);

  & li {
    list-style: circle;
  }
`;

const StyledNavLink = styled(NavLink)`
  font-weight: 500;

  &:link,
  &:visited {
    transition: all 0.3s;
    color: var(--color-grey-600);
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-brand-700);
    font-weight: 600;
  }
`;

function NavigationContent({ showMini, setShowMini }) {
  const { isAuthenticated } = useUser();

  const navigate = useNavigate();

  function handleClose() {
    setShowMini(false);
  }

  return (
    <>
      <StyledModalAddProduct
        $isShowing={showMini?.toString()}
      ></StyledModalAddProduct>

      <ModalReferralRules $isShowing={showMini?.toString()}>
        <StyledHelperContainer>
          <StyledFirstContent>
            <h3>NAVIGATION</h3>

            <ParaContentUl>
              <li>
                <StyledNavLink to={"/"} onClick={handleClose}>
                  Home{" "}
                </StyledNavLink>
              </li>

              <li>
                <StyledNavLink to="/how-it-works" onClick={handleClose}>
                  How it Works{" "}
                </StyledNavLink>
              </li>

              <li>
                <StyledNavLink to={"/recent-activities"} onClick={handleClose}>
                  Recent Activities
                </StyledNavLink>
              </li>

              {/* <li>
                <StyledNavLink to={"/testimonials"} onClick={handleClose}>
                  Testimonials{" "}
                </StyledNavLink>
              </li> */}

              <li>
                <StyledNavLink to={"/faq"} onClick={handleClose}>
                  FAQ{" "}
                </StyledNavLink>
              </li>

              <li>
                <StyledNavLink to={"/about-us"} onClick={handleClose}>
                  About Us{" "}
                </StyledNavLink>
              </li>
            </ParaContentUl>

            {isAuthenticated ? (
              <button onClick={() => navigate("/app")}>Dashboard</button>
            ) : (
              <button onClick={() => navigate("/member/auth")}>
                Get Started
              </button>
            )}
          </StyledFirstContent>
        </StyledHelperContainer>
      </ModalReferralRules>
    </>
  );
}

export default NavigationContent;
