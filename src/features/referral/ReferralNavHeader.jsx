import { HiOutlineChevronLeft } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

const NavigationTopBar = styled.div`
  display: flex;
  justify-content: space-between;

  align-items: center;
  font-size: 1.3rem;
  padding: 0rem 1rem;
  padding: 1rem 1rem;
  z-index: 1000;
  position: fixed;
  width: 100%;

  ${(props) =>
    props?.$isDarkMode === "true"
      ? css`
          background-color: var(--color-green-backColor);
        `
      : css`
          background-color: var(--color-green-backColors);
        `}
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

const IconeNavSVG = styled(HiOutlineChevronLeft)`
  width: 2rem;
  height: 2rem;
`;

function ReferralNavHeader({ setShowRules, isDarkMode }) {
  const navigate = useNavigate();

  return (
    <NavigationTopBar $isDarkMode={isDarkMode?.toString()}>
      <IconeNavSVG onClick={() => navigate(-1)} />
      <RulesSpan onClick={() => setShowRules(true)}>Rules</RulesSpan>
    </NavigationTopBar>
  );
}

export default ReferralNavHeader;
