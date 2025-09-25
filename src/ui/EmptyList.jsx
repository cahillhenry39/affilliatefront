import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  height: 60vh;

  & img {
    width: 25rem;
  }

  & p {
    font-size: 1.4rem;
    font-weight: 500;
  }
`;

function EmptyList({ imageLink, message }) {
  return (
    <StyledContainer>
      <img src={imageLink ? `/app/${imageLink}` : "/app/folder.svg"} />
      <p>{message || `Nothing was found`}</p>
    </StyledContainer>
  );
}

export default EmptyList;
