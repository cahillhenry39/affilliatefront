import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled.button`
  display: flex;
  align-items: center;
  border-radius: var(--border-radius-sm);
  border: none;
  color: var(--color-brand-600);
  background-color: var(--color-brand-50);

  font-size: 1.4rem;
  padding: 0.8rem 1rem;

  gap: 0.5rem;

  &:hover {
    background-color: var(--color-brand-100);
    border: none;
  }
`;

function BackButton() {
  const navigate = useNavigate();

  function handleGoBack(e) {
    e.preventDefault();
    navigate(-1);
  }

  return (
    <StyledLink onClick={(e) => handleGoBack(e)}>
      <IoIosArrowBack />

      <span>Go Back</span>
    </StyledLink>
  );
}

export default BackButton;
