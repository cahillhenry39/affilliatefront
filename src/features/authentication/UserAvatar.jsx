import styled from "styled-components";
import useUser from "./useUser";
import { device } from "../../../mediaQuery";
import { Link } from "react-router-dom";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);

  @media ${device.mobileL} {
    gap: 1rem;

    & span {
      font-size: 1.3rem;
    }
  }
`;

const Avatar = styled.img`
  display: block;

  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);

  @media ${device.mobileL} {
    width: 2rem;
  }
`;

function UserAvatar() {
  const { data } = useUser() || {};
  const { user_metadata } = data || {};
  const { personal } = user_metadata || {};
  const { fullName, avatar } = personal || {};

  return (
    <StyledUserAvatar>
      <Link to="/app">
        <Avatar
          src={avatar || "/main/default-user.jpg"}
          alt={`Avatar of ${fullName}`}
        />
      </Link>
      {/* <span>{fullName ? fullName?.split(" ")?.[0] : ""}</span> */}
    </StyledUserAvatar>
  );
}

export default UserAvatar;
