import React, { useState, useEffect, useRef, useMemo } from "react";
import { debounce, round } from "lodash";
import style from "./search.module.css";
import { useRouter } from "next/router";
import { useGlobalState } from "@/context/Context";
import { v4 as uuidv4 } from "uuid";

function SearchBar({ isHome }) {
  const { state, getHintsBySearch, searchData } = useGlobalState();
  const [searchState, setSearchState] = useState({
    query: "",
    showDropdown: false,
    searchHistory: [],
  });

  const inputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const storedHistory = localStorage.getItem("searchHistory");
    if (storedHistory) {
      setSearchState((prevSearchState) => ({
        ...prevSearchState,
        searchHistory: JSON.parse(storedHistory),
      }));
    }
  }, []);

  useEffect(() => {
    // Saving search history to local storage whenever it changes
    localStorage.setItem(
      "searchHistory",
      JSON.stringify(searchState.searchHistory)
    );
  }, [searchState.searchHistory]);

  const hintsToDisplay = [];

  if (state.hints !== undefined) {
    state.hints.forEach((el) => {
      if (el._index === "artist") {
        const artist = el;
        artist._source.artist_name &&
        !hintsToDisplay.includes(artist._source.artist_name)
          ? hintsToDisplay.push(artist._source.artist_name)
          : null;
        artist._source.first_name &&
        !hintsToDisplay.includes(artist._source.first_name)
          ? hintsToDisplay.push(artist._source.first_name)
          : null;
        artist._source.last_name &&
        !hintsToDisplay.includes(artist._source.last_name)
          ? hintsToDisplay.push(artist._source.last_name)
          : null;
      } else if (el._index === "tattoo") {
        const tattoo = el;
        tattoo._source.name_suggest &&
          tattoo._source.name_suggest.forEach((nameSuggest) => {
            if (hintsToDisplay.includes(nameSuggest)) {
              return;
            }
            hintsToDisplay.push(nameSuggest);
          });
      }
    });
  }

  const handleChange = debounce((e) => {
    setSearchState((prevSearchState) => ({
      ...prevSearchState,
      query: e,
    }));
    getHintsBySearch(e, router);
  }, 100);

  const handleSubmit = (e) => {
    e.preventDefault();
    searchData(searchState.query, router);

    addToSearchHistory(searchState.query);
  };


  const handleOutsideClick = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setSearchState((prevSearchState) => ({
        ...prevSearchState,
        showDropdown: false,
      }));
    }
  };

  const handleItemClick = (item) => {
router.push(`/search?term=${item}&category=${state.currentTab}`).then(()=>{
  setSearchState((prevSearchState) => ({
    ...prevSearchState,
    query: item,
    showDropdown: false,
  }));
  if (isHome) {
    router.push(`/search?term=${item}&category=${'all'}`);
  } else {
    searchData(item, router);
  }
  addToSearchHistory(item);

}).catch((e)=> console.log(e))

  };

  const addToSearchHistory = (name) => {
    const newItem = { id: uuidv4(), name };
    setSearchState((prevSearchState) => ({
      ...prevSearchState,
      searchHistory: [newItem, ...prevSearchState.searchHistory],
    }));
  };

  const clear = (el) => {
    const updatedHistory = searchState.searchHistory.filter(
      (item) => item.id !== el.id
    );
    setSearchState((prevSearchState) => ({
      ...prevSearchState,
      searchHistory: updatedHistory,
    }));
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <div className={style.search_input_container} ref={inputRef}>
          <input
            type="text"
            placeholder="Search Google"
            value={searchState.query}
            onChange={(event) => handleChange(event.target.value)}
            onFocus={() =>
              setSearchState((prevSearchState) => ({
                ...prevSearchState,
                showDropdown: true,
              }))
            }
          />
          {searchState.showDropdown && (
            <div className={style.dropdown}>
              {hintsToDisplay.map((result, index) => (
                <li
                  onClick={() => handleItemClick(result)}
                  style={{
                    display: "block",
                    width: "100%",
                    background: "transparent",
                    border: "0",
                    cursor: "pointer",
                    padding: "10px",
                    backgroundColor: "#fff",
                    marginBottom: "10px",
                  }}
                  key={index}
                >
                  {result}
                </li>
              ))}

              {state.errorMessage && (
                <div>
                  <p>Results</p>
                  <h5>We couldnt find any results for {searchState.query}</h5>
                </div>
              )}
              {searchState.searchHistory.length > 0 && (
                <div>
                  <h1>Latest Search</h1>
                  <div className={style.listt}>
                    {searchState.searchHistory.map((el) => (
                      <div
                        key={el.id}
                        onClick={() => clear(el)}
                        style={{
                          position: "relative",
                          backgroundColor: "#000",
                          padding: "10px",
                        }}
                      >
                        <div className={style.close}>x </div>
                        <p>{el.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {hintsToDisplay.length === 0 && (
                <div>
                  <p>Get inspired by styles</p>
                  <div className="styleTattoo">
                    <h4>Fetch List Styles API</h4>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchBar;
