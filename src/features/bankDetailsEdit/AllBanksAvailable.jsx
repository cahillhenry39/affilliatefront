import styled from "styled-components";
import HeaderNavigationBack from "../../ui/HeaderNavigationBack";
import { formatTextCapitalize } from "../../utils/helpers";
import SearchBar from "../../ui/SearchBar";

const StyledBContainer = styled.div`
  background-color: var(--color-grey-0);
  margin-top: -2.4rem;
  height: 100vh;

  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SearchBarContainer = styled.div`
  display: flex;

  padding: 2rem 1rem 0rem;
`;

const StyledEachGroupedBankContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & h3 {
    background-color: var(--color-grey-10);
    padding: 1rem 2rem;
    font-size: 1.2rem;
    color: var(--color-grey-300);
    font-weight: 500;
  }

  & li {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    column-gap: 1rem;
    padding: 0.1rem 1rem 1rem 0rem;
    margin: 0rem 1rem;
    border-bottom: 1px solid var(--color-grey-10);
    font-size: 1.5rem;
    color: var(--color-grey-800);
    cursor: pointer;
  }
`;

const EachBankLists = styled.li``;

const ImageContainer = styled.div`
  width: 4rem;
  height: 4rem;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: var(--color-grey-100);
  font-size: 0.51rem;
  color: var(--color-grey-500);

  & img {
    width: 4rem;
  }
`;

const StyledBankLists = styled.div`
  width: 90vh;
  overflow-y: scroll;
  padding-bottom: 10rem;
`;

function AllBanksAvailable({
  allAvailableBank,
  handleNavigateToBank,
  handleSetSelectedBank,
}) {
  return (
    <>
      <HeaderNavigationBack
        text={"All Available Banks"}
        isNavigattion
        handleNavigate={() => handleNavigateToBank("main")}
      />

      <StyledBContainer>
        <SearchBarContainer>
          <SearchBar text="Search bank name" />
        </SearchBarContainer>

        <StyledBankLists>
          {allAvailableBank?.map((grouped, index) => {
            return (
              <StyledEachGroupedBankContainer key={index}>
                <h3>{formatTextCapitalize(grouped?.alpha)}</h3>
                <ul>
                  {grouped?.banks?.map((each, i) => {
                    return (
                      <EachBankLists
                        key={i}
                        onClick={() => handleSetSelectedBank(each)}
                      >
                        <ImageContainer>
                          {each?.logo ? <img src={each?.logo} /> : "bank image"}
                        </ImageContainer>
                        <p>{each?.name}</p>
                      </EachBankLists>
                    );
                  })}
                </ul>
              </StyledEachGroupedBankContainer>
            );
          })}
        </StyledBankLists>
      </StyledBContainer>
    </>
  );
}

export default AllBanksAvailable;
