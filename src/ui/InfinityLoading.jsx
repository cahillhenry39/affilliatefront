import styled, { keyframes } from "styled-components";

const loader__width = "150";
const loader_dot__size = "20";

const loader = keyframes`
 
  15% { transform: translateX(0); }
  45% { transform: translateX( ${
    Number(loader__width) - Number(loader_dot__size)
  }px) ; }
    65% { transform: translateX( ${
      Number(loader__width) - Number(loader_dot__size)
    }px) ; }
  95% { transform: translateX(0); }

`;

const StyledInfinityLoader = styled.div`
  /* height: 100vh;
  width: 100vw; */
  font-family: Helvetica;
`;

const StyledLoader = styled.div`
  height: 2rem;
  width: 15rem;
  margin: 0 auto;
  /* position: absolute; */
  /* top: 0; */
  /* bottom: 0; */
  /* left: 0;
  right: 0;
  margin: auto; */

  & div {
    animation: ${loader} ease-in-out 3s infinite;
    height: 2rem;
    width: 2rem;
    border-radius: 100%;
    background-color: black;
    position: absolute;
    border: 2px solid white;

    &:first-child() {
      background-color: #8cc759;
      animation-delay: 0.5s;
    }

    &:nth-child(2) {
      background-color: #8c6daf;
      animation-delay: 0.4s;
    }

    &:nth-child(3) {
      background-color: #ef5d74;
      animation-delay: 0.3s;
    }

    &:nth-child(4) {
      background-color: #f9a74b;
      animation-delay: 0.2s;
    }

    &:nth-child(5) {
      background-color: #60beeb;
      animation-delay: 0.1s;
    }

    &:nth-child(6) {
      background-color: #fbef5a;
      animation-delay: 0s;
    }
  }

  & p {
    position: absolute;
    top: 200%;
    left: 0;
    right: 0;
    width: 4rem;
    margin: auto;

    &:after {
      content: "Loading";
      font-weight: bold;
      animation: loading-text 3 infinite;
    }
  }
`;

const StyledDot = styled.div``;

function InfinityLoading() {
  return (
    <StyledInfinityLoader>
      <StyledLoader>
        <StyledDot></StyledDot>
        <StyledDot></StyledDot>
        <StyledDot></StyledDot>
        <StyledDot></StyledDot>
        <StyledDot></StyledDot>
        <StyledDot></StyledDot>
      </StyledLoader>
    </StyledInfinityLoader>
  );
}

export default InfinityLoading;

// @keyframes loading-text
//   0%
//     content: "Loading"

//   25%
//     content: "Loading."

//   50%
//     content: "Loading.."

//   75%
//     content: "Loading..."
