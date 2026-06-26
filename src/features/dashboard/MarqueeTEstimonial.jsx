import styled, { css, keyframes } from "styled-components";
import { useGetAllActivities } from "../activities/useActivities";
import EachActivity from "../activities/EachActivity";
import Spinner from "../../ui/Spinner";
import Headings from "../../ui/Headings";
import { HiMiniSparkles } from "react-icons/hi2";

const scrolling = keyframes`
  from {
    /* -moz-transform: translateY(100%);
    -webkit-transform: translateY(100%); */
    transform: translatey(0%);
  }
  to {
    /* -moz-transform: translateY(-100%);
    -webkit-transform: translateY(-100%); */
    transform: translatey(calc(-100% - 1rem));
  }

`;

const coloringAndExpand = keyframes`
0% {    color: red; transform: scale(1);}
  25% { color: orange; transform: scale(1.2); }
  50% { color: #9ee69e; transform: scale(1.07); }
  75% { color: #9ed199; transform: scale(1.3);}
  100% { color: red; transform: scale(1.1);} 

`;

const coloring = keyframes`
0% {    color: red;}
  25% { color: orange; }
  50% { color: #9ee69e; }
  75% { color: #9ed199; }
  100% { color: red; }

`;

const HeadingLocal = styled.h3`
  animation: ${coloring} 5s infinite linear;

  letter-spacing: 1.7px;
  font-size: 1.6rem;
  text-transform: capitalize;

  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;

  margin-top: 1rem;

  & svg {
    width: 3rem;
    height: 3rem;
    transition: all 1s;
    animation: ${coloringAndExpand} 3s infinite linear;
  }
`;

const MembersActivityDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 1rem;
  position: relative;
  height: 14rem;

  overflow: hidden;
`;

const MArqueeDiv = styled.ul`
  /* height: 15rem;
  width: 15rem; */

  display: flex;
  flex-direction: column;
  row-gap: 2rem;

  /* overflow: hidden; */
  /* position: absolute; */
  top: 14rem;

  ${(props) =>
    css`
      animation: ${scrolling} ${3 * props.$num}s infinite linear;
    `}
`;

function MarqueeTEstimonial() {
  const { allActivities, isLoading } = useGetAllActivities();

  if (isLoading) return <Spinner />;

  if (!allActivities?.length)
    return (
      <Headings $color type="h3">
        No activies from members yet
      </Headings>
    );
  return (
    <>
      <HeadingLocal>
        <HiMiniSparkles />
        Members activities
        <HiMiniSparkles />
      </HeadingLocal>
      <MembersActivityDiv>
        <MArqueeDiv $num={allActivities?.length}>
          {allActivities?.map((each, i) => (
            <EachActivity key={i} activity={each} />
          ))}
        </MArqueeDiv>
      </MembersActivityDiv>
    </>
  );
}

export default MarqueeTEstimonial;
