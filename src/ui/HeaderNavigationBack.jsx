import { HiOutlineChevronLeft } from "react-icons/hi2";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const HeaderNavigationContainer = styled.div`
  background-color: var(--color-grey-0);
  padding: 1.5rem 1rem;
  color: var(--color-grey-600);
  z-index: 1000;
  cursor: pointer;

  display: flex;
  justify-content: space-between;
`;

const MainContentContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const RulesSpan = styled.span`
  font-size: 1.2rem;
  color: var(--color-grey-500);
  background-color: var(--color-grey-0);
  padding: 0.21rem 1rem;
  width: fit-content;
  border-radius: 9px;
  align-self: flex-start;
  cursor: pointer;
`;

function HeaderNavigationBack({
  text,
  isNavigattion,
  handleNavigate = () => {},
  setShowRules = () => {},

  modalTitle,
}) {
  const navigate = useNavigate();

  return (
    <HeaderNavigationContainer>
      <MainContentContainer
        onClick={isNavigattion ? handleNavigate : () => navigate(-1)}
      >
        <HiOutlineChevronLeft />
        <span>{text}</span>
      </MainContentContainer>

      {modalTitle && setShowRules ? (
        <RulesSpan onClick={() => setShowRules(true)}>{modalTitle}</RulesSpan>
      ) : (
        ""
      )}
    </HeaderNavigationContainer>
  );
}

export default HeaderNavigationBack;
