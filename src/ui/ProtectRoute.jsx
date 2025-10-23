import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import useUser from "../features/authentication/useUser";
import { useDarkMode } from "../context/DarkModeContext";
import LoadingDots from "./LoadingDots";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageComponent = styled.div`
  margin-top: -8rem;
  text-align: center;
`;

const Image = styled.img`
  width: 26.4rem;
`;

const mainLogoDark = "/main/logomaindark.png";
const mainLogoLight = "/main/logomainlight.png";

function ProtectedRoute({ children }) {
  const { isDarkMode } = useDarkMode();

  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useUser();
  const src = isDarkMode ? mainLogoDark : mainLogoLight;

  useEffect(
    function () {
      if (!isLoading && !isAuthenticated) {
        navigate("/member/auth", { replace: true });
      }
    },
    [isAuthenticated, isLoading, navigate]
  );

  if (isLoading)
    return (
      <FullPage>
        <ImageComponent to="/">
          <Image src={src} alt="Taskiit services Logo" />
          <LoadingDots text="Loading" maxDots={4} />
        </ImageComponent>
      </FullPage>
    );

  if (isAuthenticated && !isLoading) return children;
}

export default ProtectedRoute;
