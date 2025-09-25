import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  HiOutlineBanknotes,
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineCurrencyDollar,
  HiOutlineHome,
  HiOutlineLockClosed,
  HiOutlineMegaphone,
  HiOutlineUser,
} from "react-icons/hi2";
import { device } from "../../mediaQuery";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  @media ${device.mobileL} {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;

    width: 100%;
  }
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    font-size: 1.5rem;
    font-weight: 500;
    padding: 1.2rem 1rem;
    transition: all 0.3s;
    color: var(--color-grey-400);

    @media ${device.mobileL} {
      font-size: 1rem;
      gap: 0.52rem;
      padding: 0.2rem 0.51rem;
    }
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);

    & span {
      color: var(--color-brand-800);
    }
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:visited svg {
    color: var(--color-brand-800);
  }

  @media ${device.mobileL} {
    flex-direction: column;
  }
`;

function MainNav() {
  // const { data } = useUser();
  const type = "user";

  return (
    <>
      {type?.isAdmin ? (
        <NavList>
          <li>
            <StyledNavLink to="dashboard">
              <HiOutlineHome />
              <span>Overview</span>
            </StyledNavLink>
          </li>

          <li>
            <StyledNavLink to="actions">
              <HiOutlineCalendarDays />
              <span>Actions</span>
            </StyledNavLink>
          </li>

          <li>
            <StyledNavLink to="all-transactions">
              <HiOutlineCurrencyDollar />
              <span>Transactions</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="all-news">
              <HiOutlineMegaphone />
              <span>News</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="main-settings-and-updates">
              <HiOutlineCog6Tooth />
              <span>Settings</span>
            </StyledNavLink>
          </li>
        </NavList>
      ) : (
        <NavList>
          <li>
            <StyledNavLink to="/app/dashboard">
              <HiOutlineHome />
              <span>Home</span>
            </StyledNavLink>
          </li>

          <li>
            <StyledNavLink to="/app/task">
              <HiOutlineBanknotes />
              <span>Task</span>
            </StyledNavLink>
          </li>

          <li>
            <StyledNavLink to="/app/stock">
              <HiOutlineLockClosed />
              <span>Stocks</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/app/finance">
              <HiOutlineCurrencyDollar />
              <span>Finance</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/app/me">
              <HiOutlineUser />
              <span>me</span>
            </StyledNavLink>
          </li>
        </NavList>
      )}
    </>
  );
}

export default MainNav;
