import { HiOutlineChevronRight } from "react-icons/hi2";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
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
  column-gap: 1rem;

  & svg {
    width: 3rem;
    height: 3rem;
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

const IconeNavSVGContainer = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 5px;
  background-color: var(--color-green-backColor);

  display: flex;
  align-items: center;
  justify-content: center;

  & svg {
    color: var(--color-brand-700);
  }
`;

const IconeNavSVG = styled(HiOutlineChevronRight)`
  width: 2rem;
  height: 2rem;
  color: var(--color-grey-700);
`;

const IconeNavSVGContainerNotDone = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 5px;
  background-color: #ff440026;

  display: flex;
  align-items: center;
  justify-content: center;

  & svg {
    color: orangered;
  }
`;

const SuccessSpan = styled.span`
  background-color: var(--color-brand-100);
  color: var(--color-brand-800);
  width: fit-content;
  border-radius: 5px;
  padding: 0.1rem 1rem;
`;

// const PendingPara = styled.p`
//   color: #a50da5;
// `;

// const PendingSpan = styled.span`
//   background-color: #a50da521;
//   color: #a50da5;
// `;

const FailedSpan = styled.span`
  background-color: #ff440026;
  color: orangered;
  width: fit-content;
  border-radius: 5px;
  padding: 0.1rem 1rem;
`;

function EachTaskHistory({
  title,
  icon,
  link = "/app/dashboard",
  isCompleted,
}) {
  const navigate = useNavigate();
  const message = isCompleted ? "Completed" : "Not Completed";

  return (
    <EachIconAndTextNavigation onClick={() => navigate(link)}>
      <IconAndTextContainer>
        {isCompleted ? (
          <IconeNavSVGContainer>{icon ? icon : ""}</IconeNavSVGContainer>
        ) : (
          <IconeNavSVGContainerNotDone>
            {icon ? icon : ""}
          </IconeNavSVGContainerNotDone>
        )}

        <TextContainerOnly>
          <p>{formatTextCapitalize(title)}</p>

          {isCompleted ? (
            <SuccessSpan>
              {formatTextCapitalizeFirstLetter(message)}
            </SuccessSpan>
          ) : (
            <FailedSpan>{formatTextCapitalizeFirstLetter(message)}</FailedSpan>
          )}
        </TextContainerOnly>
      </IconAndTextContainer>

      <IconeNavSVG />
    </EachIconAndTextNavigation>
  );
}

export default EachTaskHistory;
