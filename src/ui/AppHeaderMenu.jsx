import styled from "styled-components";
import Logout from "../features/authentication/Logout";
// import ButtonIcon from "./ButtonIcon";
// import { HiMiniEnvelope } from "react-icons/hi2";
// import { useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import { device } from "../../mediaQuery";
// import MessageButton from "./MessageButton";

const StyledHeaderMenu = styled.ul`
  display: flex;
  align-items: center;
  gap: 0.4rem;

  @media ${device.mobileL} {
    gap: 0;

    & svg {
      width: 2rem;
      height: 2rem;
    }
  }
`;

function AppHeaderMenu() {
  // const navigate = useNavigate();

  return (
    <StyledHeaderMenu>
      {/* <li>
        <MessageButton />
      </li> */}

      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}

export default AppHeaderMenu;
