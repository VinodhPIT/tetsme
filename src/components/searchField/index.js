import React, { useState, useEffect, useRef, useMemo } from "react";
import { debounce, round } from "lodash";
import style from "./search.module.css";
import { useRouter } from "next/router";
import { useGlobalState } from "@/context/Context";

function SearchBar({ isHome }) {
  const { state, getHintsBySearch, searchData } = useGlobalState();
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
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
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    // Saving search history to local storage whenever it changes
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

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
    setQuery(e);
    getHintsBySearch(e, router);
  }, 100);

  const handleSubmit = (e) => {
    // router.push(`/search?term=${query}&category=${state.currentTab}`)

    e.preventDefault();
    searchData(query, router);
    setSearchHistory((prevHistory) => [query, ...prevHistory]);
  };

  const handleOutsideClick = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  const handleItemClick = (item) => {
    setSearchHistory((prevHistory) => [item, ...prevHistory]);
    setQuery(item);
    setShowDropdown(false);
    if (isHome !== undefined) {
      router.push(`/search?term=${item}&category=${"all"}`);
    } else {
      searchData(item, router);

      // router.push(`/search?term=${item}&category=${state.currentTab}`);
    }
  };

  const clear = (el) => {
    const updatedHistory = searchHistory.filter((e) => e !== el);
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <div className={style.search_input_container} ref={inputRef}>
          <input
            type="text"
            placeholder="Search Google"
            value={query}
            onChange={(event) => handleChange(event.target.value)}
            onFocus={() => setShowDropdown(true)}
          />
          {showDropdown && (
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

              {state.errorMessage === true ? (
                <div>
                  <p>Results</p>

                  <h5>We couldnt find any results for {query}</h5>
                </div>
              ) : null}

              {/* {searchHistory.length >0  ?   <div> 
  
  <h1> Latest Search</h1 >


<div className={style.listt}>
{searchHistory.map((el)=>{

return  <div key={el} onClick={()=>clear(el)}   style={{"position":"relative","backgroundColor":"#000", "padding":"10px"}} > <div className={style.close}>x </div> <p >{el}</p></div>

})}
</div>




</div>




:null} */}

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
