import styled, { keyframes } from "styled-components";

const shimmer = keyframes` 
  from {
    background-position: -1000px 0;
  }
  to {
    background-position: 1000px 0;
  }
`;

const CenterSections = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding: 2rem;
`;

const UserImageMainContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4rem;
`;

const ColumnFlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const UserImageMainContainerWithImage = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 1rem;
`;

const NoImageHelperDiv = styled.div`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  animation: ${shimmer} 3s;
  animation-iteration-count: infinite;
  background: linear-gradient(to right, #dfdfdf 5%, #cccccc 25%, #dfdfdf 35%);
  background-size: 1000px 100%;
`;

const Title = styled.p`
  background: #777;
  width: 15rem;
  height: 3rem;
  animation: ${shimmer} 3s;
  animation-iteration-count: infinite;
  background: linear-gradient(to right, #dfdfdf 5%, #cccccc 25%, #dfdfdf 35%);
  background-size: 1000px 100%;
  border-radius: 11px;
`;

const TitleLoger = styled.p`
  background: #777;
  width: 25rem;
  height: 3rem;
  animation: ${shimmer} 3s;
  animation-iteration-count: infinite;
  background: linear-gradient(to right, #dfdfdf 5%, #cccccc 25%, #dfdfdf 35%);
  background-size: 1000px 100%;
  border-radius: 11px;
`;

const TitleLongest = styled.p`
  background: #777;
  width: 29rem;
  height: 3.5rem;
  animation: ${shimmer} 3s;
  animation-iteration-count: infinite;
  background: linear-gradient(to right, #dfdfdf 5%, #cccccc 25%, #dfdfdf 35%);
  background-size: 1000px 100%;
  border-radius: 11px;
`;

function TaskLoader() {
  return (
    <CenterSections>
      <UserImageMainContainer>
        {/* <UserImageMainContainerWithImage>
          <NoImageHelperDiv />
        </UserImageMainContainerWithImage> */}

        <ColumnFlexContainer>
          <UserImageMainContainer>
            {/* <Title /> */}
            <Title />
          </UserImageMainContainer>

          <Title />

          <TitleLoger />

          <TitleLoger />
        </ColumnFlexContainer>
      </UserImageMainContainer>

      <TitleLongest />
    </CenterSections>
  );
}

export default TaskLoader;
