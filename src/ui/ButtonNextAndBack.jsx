import styled, { css } from "styled-components";
import Button from "./Button";
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
} from "react-icons/hi2";

const StyledButton = styled.div`
  display: grid;
  grid-template-columns: 0.2fr 1fr;
  column-gap: 1rem;

  ${(props) =>
    props.$isRemoveBack === "true" &&
    css`
      grid-template-columns: 1fr;
    `}

  ${(props) =>
    props.$isRemoveNext === "true" &&
    css`
      grid-template-columns: 1fr;
    `}
`;

function ButtonNextAndBack({
  backFunction,
  nextFunction,
  disableBack,
  disableNext,
  removeBack,
  removeNext,
}) {
  return (
    <StyledButton
      $isRemoveBack={removeBack?.toString()}
      $isRemoveNext={removeNext?.toString()}
    >
      {removeBack ? (
        <Button type="primary" onClick={nextFunction} disabled={disableNext}>
          next <HiOutlineChevronDoubleRight />
        </Button>
      ) : removeNext ? (
        <Button type="secondary" onClick={backFunction} disabled={disableBack}>
          <HiOutlineChevronDoubleLeft />
          back
        </Button>
      ) : (
        <>
          <Button
            type="secondary"
            onClick={backFunction}
            disabled={disableBack}
          >
            <HiOutlineChevronDoubleLeft />
            back
          </Button>
          <Button type="primary" onClick={nextFunction} disabled={disableNext}>
            next <HiOutlineChevronDoubleRight />
          </Button>
        </>
      )}
    </StyledButton>
  );
}

export default ButtonNextAndBack;
