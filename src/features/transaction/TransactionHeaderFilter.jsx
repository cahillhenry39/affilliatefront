import { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import styled from "styled-components";
import { formatTextCapitalize } from "../../utils/helpers";

const NavigationHeadContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 3rem;
  background-color: var(--color-grey-0);
  padding: 2rem 1rem 1.3rem;
  margin-top: -2rem;

  z-index: 1000;
`;

const EachNavigationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.81rem 1rem;
  border-radius: 5px;
  background-color: ${(props) =>
    props.$isActive === "true"
      ? "var(--color-brand-100)"
      : "var(--color-grey-10)"};

  color: ${({ $isActive }) =>
    $isActive === "true" ? "var(--color-brand-800)" : "var(--color-grey-500)"};
  transition: all o.3s;
  cursor: pointer;

  & p {
    font-size: 1.3rem;
  }

  & svg {
    width: 2rem;
    height: 2rem;
  }
`;

const OptionChoosingContainerMain = styled.div`
  background-color: #0000007b;
  height: 100vh;
  z-index: 100;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: ${({ $isActive }) => ($isActive === "true" ? "block" : "none")};
`;

const OptionChoosingContainer = styled.ul`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 1rem 1rem 2rem;
  background-color: var(--color-grey-0);
  margin-top: -2rem;
  border-bottom-right-radius: 9px;
  border-bottom-left-radius: 9px;
  z-index: 1000;

  height: fit-content;
  position: fixed;
  top: 13rem;
  right: 0;
  left: 0;
`;

const EachMiniOptionPara = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-10);
  font-size: 1.1rem;
  padding: 0.41rem 1rem;
  cursor: pointer;
`;

const categoryFilterOptions = [
  "all category",
  "deposit",
  "withdrawal",
  "credit",
  "debit",
];

const statusFilterOptions = ["all status", "success", "pending", "failed"];

function TransactionHeaderFilter({ filterOption, setFilterOption }) {
  const [isActive, setIsActive] = useState("");

  function handleSetFilterOptioers(type) {
    setFilterOption((val) => {
      return {
        ...val,
        [isActive]: type,
      };
    });
    setIsActive("");
  }

  return (
    <>
      <NavigationHeadContainer>
        <EachNavigationContainer
          onClick={() =>
            setIsActive((val) => (val === "category" ? "" : "category"))
          }
          $isActive={(isActive === "category")?.toString()}
        >
          <p>{formatTextCapitalize(filterOption?.category)}</p>

          {isActive === "category" ? (
            <IoMdArrowDropup />
          ) : (
            <IoMdArrowDropdown />
          )}
        </EachNavigationContainer>

        <EachNavigationContainer
          onClick={() =>
            setIsActive((val) => (val === "status" ? "" : "status"))
          }
          $isActive={(isActive === "status")?.toString()}
        >
          <p>{formatTextCapitalize(filterOption?.status)}</p>

          {isActive === "status" ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
        </EachNavigationContainer>
      </NavigationHeadContainer>

      {isActive === "category" ? (
        <OptionChoosingContainer>
          {categoryFilterOptions?.map((each, i) => {
            return (
              <EachMiniOptionPara
                key={i}
                onClick={() => handleSetFilterOptioers(each)}
              >
                {formatTextCapitalize(each)}
              </EachMiniOptionPara>
            );
          })}
        </OptionChoosingContainer>
      ) : (
        ""
      )}

      {isActive === "status" ? (
        <OptionChoosingContainer>
          {statusFilterOptions?.map((each, i) => {
            return (
              <EachMiniOptionPara
                key={i}
                onClick={() => handleSetFilterOptioers(each)}
              >
                {formatTextCapitalize(each)}
              </EachMiniOptionPara>
            );
          })}
        </OptionChoosingContainer>
      ) : (
        ""
      )}

      <OptionChoosingContainerMain
        $isActive={(isActive ? true : false)?.toString()}
        onClick={() => setIsActive("")}
      />
    </>
  );
}

export default TransactionHeaderFilter;
