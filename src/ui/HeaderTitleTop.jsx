import styled from "styled-components";

const HeaderNavigationContainer = styled.div`
  background-color: var(--color-grey-0);
  padding: 1.5rem 1rem;
  color: var(--color-grey-600);

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  border-bottom-right-radius: 9px;
  border-bottom-left-radius: 9px;
`;

const MainContentContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  & span {
    font-weight: 600;
    font-size: 1.6rem;
  }

  & SVG {
    width: 2.5rem;
    height: 2.5rem;
    color: var(--color-brand-700);
  }
`;

function HeaderTitleTop({ icon, text }) {
  return (
    <HeaderNavigationContainer>
      <MainContentContainer>
        {icon}
        <span>{text}</span>
      </MainContentContainer>
    </HeaderNavigationContainer>
  );
}

export default HeaderTitleTop;
