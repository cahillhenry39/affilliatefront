import styled from "styled-components";
import Button from "./Button";

import {
  HiCheckCircle,
  HiXCircle,
  HiExclamationTriangle,
  HiInformationCircle,
} from "react-icons/hi2";
import { useAlert } from "../hooks/AlertContext";
import { useNavigate } from "react-router-dom";

const statusColors = {
  success: {
    bg: "#dcfce7",
    color: "#16a34a",
  },
  error: {
    bg: "var(--color-grey-10)",
    color: "#dc2626",
  },
  warning: {
    bg: "#fef3c7",
    color: "#d97706",
  },
  info: {
    bg: "#dbeafe",
    color: "#2563eb",
  },
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
  overflow-y: scroll;
`;

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -80%);
  background-color: var(--color-grey-10);
  border: 1px solid var(--color-grey-50);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 0;
  transition: all 0.5s;

  z-index: 1001;
  width: 90%;
`;

const IconWrapper = styled.div`
  width: 7rem;
  height: 7rem;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  background: ${({ $bg }) => $bg};

  svg {
    width: 4.5rem;
    height: 4.5rem;
    color: ${({ $color }) => $color};
  }
`;

const Title = styled.h2`
  font-size: 2.3rem;
  font-weight: 700;
  margin: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 1rem;
`;

const StyledModalAlert = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  gap: 2rem;
  padding: 3rem;
`;

const Message = styled.p`
  font-size: 1.6rem;
  line-height: 1.7;
  color: var(--color-grey-700);
`;

function ModalAlert({
  isOpen = true,
  status = "success",
  buttonMessage = "Close",
  text = "Oops... Something went wrong.",
  link = "",
  title = "",
}) {
  const { closeAlert } = useAlert();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const config = statusColors[status] || statusColors.info;

  const titles = {
    success: "Success",
    error: "Something went wrong",
    warning: "Pending",
    info: "Information",
  };

  const icons = {
    success: <HiCheckCircle />,
    error: <HiXCircle />,
    warning: <HiExclamationTriangle />,
    info: <HiInformationCircle />,
  };

  return (
    <>
      <Overlay />
      <StyledModal>
        <StyledModalAlert>
          <IconWrapper $bg={config.bg} $color={config.color}>
            {icons[status]}
          </IconWrapper>

          <Title>{title || titles[status]}</Title>

          <Message>{text}</Message>

          <ButtonContainer>
            <Button
              type={
                status === "success"
                  ? "primary"
                  : status === "error"
                    ? "cancel"
                    : status === "warning"
                      ? "secondary"
                      : "icon"
              }
              onClick={
                link
                  ? () => {
                      closeAlert();
                      navigate(link);
                    }
                  : closeAlert
              }
            >
              {buttonMessage}
            </Button>
          </ButtonContainer>
        </StyledModalAlert>
      </StyledModal>
    </>
  );
}

export default ModalAlert;
