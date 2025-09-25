import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

import { device } from "../../../mediaQuery";
import useUser from "../../features/authentication/useUser";

import ScrollToTopApp from "../../ui/ScrollToTopApp";

import { useDarkMode } from "../../context/DarkModeContext";
import useUserRealtime from "../../services/useUserRealtime";
import { useGetCompanyDetails } from "../../services/useCompanyDetails";
import Logo from "../../ui/Logo";

const StyledAppLayout = styled.div`
  /* display: grid;
  grid-template-columns: 22rem 1fr;
  grid-template-rows: auto 1fr; */
  display: none;

  @media ${device.mobileL} {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    position: relative;
    height: 100vh;
  }

  ${(props) =>
    props.$isDarkMode === "true"
      ? css`
          background-color: var(--color-grey-50);
        `
      : css`
          background-color: var(--color-grey-0);
        `}
`;

const Main = styled.main`
  overflow-y: hidden;

  &::-webkit-scrollbar {
    width: 0rem;
  }
`;

const OtherContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 5rem;
  padding-right: 5rem;
  gap: 3rem;
  height: 100vh;

  background: linear-gradient(#000000cf, #000000c3),
    url("/main/hero-image.jpeg");

  & h2 {
    color: #ffff;
    text-align: center;
  }

  @media ${device.mobileL} {
    display: none;
  }
`;

const Container = styled.div`
  display: none;

  @media ${device.mobileL} {
    max-width: 120rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    padding: 0rem;
    margin: 0;
    overflow-y: hidden;
  }
`;

function AppLayout() {
  const { data } = useUser();
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();

  useEffect(
    function () {
      if (data?.user_metadata?.type?.isAdmin)
        navigate("/uuid/admin", { replace: true });

      if (data?.user_metadata?.type?.isAgent)
        navigate("/agent/dashboard", { replace: true });
    },
    [
      data?.user_metadata?.type?.isAdmin,
      data?.user_metadata?.type?.isAgent,
      navigate,
    ]
  );

  useUserRealtime();
  useGetCompanyDetails();

  return (
    <>
      <OtherContainer>
        <Logo isDarkBackround />

        <h2>
          We do not provide any view fo this device. Please use mobile device or
          mobile mode only
        </h2>
      </OtherContainer>

      <StyledAppLayout $isDarkMode={isDarkMode?.toString()}>
        <ScrollToTopApp>
          <Main id="main" $isDarkMode={isDarkMode?.toString()}>
            <Container>
              <Outlet />
            </Container>
          </Main>
        </ScrollToTopApp>
      </StyledAppLayout>
    </>
  );
}

export default AppLayout;
