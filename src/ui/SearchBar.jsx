import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import styled from "styled-components";

const SearchBarDiv = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  position: relative;
  width: 100%;

  & svg {
    width: 2rem;
    height: 2rem;
    color: inherit;

    position: absolute;
    left: 1rem;
  }

  & input {
    border: none;
    height: 4rem;
    width: inherit;

    background-color: var(--color-grey-10);
    border-radius: 11px;
    padding: 0.4rem 1rem 0.4rem 4rem;
    font-size: 1.4rem;
  }
`;

function SearchBar({
  text,
  searchLists = [],
  searchByData = "",
  onSearchFunction,
}) {
  const [inputValue, setInputValue] = useState("");

  // const handleChange = (e) => {
  //   const value = e.target.value;
  //   setInputValue(value);

  //   // Filter the list based on input value
  //   if (value) {
  //     const filteredSuggestions = searchLists.filter((item) =>
  //       item?.[searchByData]?.toLowerCase().includes(value.toLowerCase())
  //     );
  //     onSearchFunction(filteredSuggestions);
  //   } else {
  //     onSearchFunction(searchLists);
  //   }
  // };

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Filter the list based on input value
    if (value) {
      onSearchFunction(value);
    } else {
      onSearchFunction("");
    }
  };
  return (
    <SearchBarDiv>
      <IoIosSearch />
      <input
        placeholder={text ? text : "Search here..."}
        type="text"
        value={inputValue}
        onChange={handleChange}
        // onFocus={handleFocus}
      />
    </SearchBarDiv>
  );
}

export default SearchBar;
