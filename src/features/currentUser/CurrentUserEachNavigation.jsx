import { HiOutlineChevronRight } from "react-icons/hi2";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  formatTextCapitalize,
  formatTextCapitalizeFirstLetter,
} from "../../utils/helpers";
import SpinnerMini from "../../ui/SpinnerMini";

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
  column-gap: 1rem;

  & svg {
    width: 3rem;
    height: 3rem;
    color: var(--color-brand-700);
  }
`;

const TextContainerOnly = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0rem;

  & p {
    font-size: 1.4rem;
    color: var(--color-grey-800);
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

function CurrentUserEachNavigation({
  title,
  message,
  icon,
  link = "/app/dashboard",
  isLogoutIcon,
  isWorking = false,
  handleLogout = () => {},
  // type = "link",
}) {
  const navigate = useNavigate();

  return (
    <EachIconAndTextNavigation
      onClick={() => {
        if (isLogoutIcon) {
          handleLogout();
          return;
        }
        navigate(link);
      }}
    >
      <IconAndTextContainer>
        {isWorking && isLogoutIcon ? <SpinnerMini /> : icon ? icon : ""}
        <TextContainerOnly>
          {isWorking && isLogoutIcon ? (
            <p>Signing Out...</p>
          ) : (
            <p>{formatTextCapitalize(title)}</p>
          )}
          <span>{formatTextCapitalizeFirstLetter(message)}</span>
        </TextContainerOnly>
      </IconAndTextContainer>

      <IconeNavSVG />
    </EachIconAndTextNavigation>
  );
}

export default CurrentUserEachNavigation;
