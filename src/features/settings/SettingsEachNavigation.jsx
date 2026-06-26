import { HiOutlineChevronRight } from "react-icons/hi2";
import styled from "styled-components";
import {
  formatTextCapitalize,
  formatTextCapitalizeFirstLetter,
} from "../../utils/helpers";

const EachIconAndTextNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
`;

const IconAndTextContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  column-gap: 1rem;

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-brand-600);
  }
`;

const TextContainerOnly = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0rem;

  & p {
    font-size: 1.4rem;
    color: var(--color-grey-600);
  }

  & span {
    font-size: 1rem;
    color: var(--color-grey-500);
  }
`;

const IconeNavSVG = styled(HiOutlineChevronRight)`
  width: 2rem;
  height: 2rem;
  color: var(--color-grey-700);
`;

function SettingsEachNavigation({
  title,
  message,
  icon,
  link = "/app/dashboard",
  handleGoToPage,
}) {
  return (
    <EachIconAndTextNavigation onClick={() => handleGoToPage(link)}>
      <IconAndTextContainer>
        {icon ? icon : ""}
        <TextContainerOnly>
          <p>{formatTextCapitalize(title)}</p>
          <span>{formatTextCapitalizeFirstLetter(message)}</span>
        </TextContainerOnly>
      </IconAndTextContainer>

      <IconeNavSVG />
    </EachIconAndTextNavigation>
  );
}

export default SettingsEachNavigation;
