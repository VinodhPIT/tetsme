///
import React, { useState, useEffect, useRef} from "react";
import { debounce } from "lodash";
import style from "./tattoosearch.module.css";
import { useRouter } from "next/router";
import { useGlobalState } from "@/context/Context";
import { v4 as uuidv4 } from "uuid";

function SearchBar({ isPage }) {


  
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

  const handleItemClick = (item, e) => {
    e.preventDefault();

    setSearchState((prevSearchState) => ({
      ...prevSearchState,
      query: item,
      showDropdown: false,
    }));
    if (isPage) {
      router.push(`/search?term=${item}&category=${"all"}`);
    } else {
      searchData(item, router);
    }
    addToSearchHistory(item);
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
    <div className={style.search_bar}>
      <form className="position_relative" onSubmit={handleSubmit}>
        <div className="input_group position_relative" ref={inputRef}>
          <input
            placeholder="Search"
            type="text"
            required="required"
            className={style.input_txt}
            onChange={(event) => handleChange(event.target.value)}
            onFocus={() =>
              setSearchState((prevSearchState) => ({
                ...prevSearchState,
                showDropdown: true,
              }))
            }
            value={searchState.query}
            
          />
          <button
            type="submit"
            tabindex="-1"
            className={style.btn_search}
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="ui-svg-inline"
            >
              <g
                id="Outline / Search / Magnifer"
                clip-path="url(#clip0_8807_21230)"
              >
                <path
                  id="Vector"
                  fillrule="evenodd"
                  clip-rule="evenodd"
                  d="M8.63509 1.89648C5.41343 1.89648 2.80176 4.50816 2.80176 7.72982C2.80176 10.9515 5.41343 13.5632 8.63509 13.5632C11.8568 13.5632 14.4684 10.9515 14.4684 7.72982C14.4684 4.50816 11.8568 1.89648 8.63509 1.89648ZM1.80176 7.72982C1.80176 3.95587 4.86115 0.896484 8.63509 0.896484C12.409 0.896484 15.4684 3.95587 15.4684 7.72982C15.4684 9.43683 14.8425 10.9976 13.8077 12.1953L15.9886 14.3763C16.1839 14.5715 16.1839 14.8881 15.9886 15.0834C15.7934 15.2786 15.4768 15.2786 15.2815 15.0834L13.1006 12.9024C11.9029 13.9372 10.3421 14.5632 8.63509 14.5632C4.86115 14.5632 1.80176 11.5038 1.80176 7.72982Z"
                  fill="#B9B9B9"
                />
              </g>
              <defs>
                <clipPath id="clip0_8807_21230">
                  <rect
                    width="16"
                    height="16"
                    fill="white"
                    transform="translate(0.968262 0.0625)"
                  />
                </clipPath>
              </defs>
            </svg>
          </button>

          {searchState.showDropdown && (
            <div className={style.dropdown}>
              {hintsToDisplay.map((result, index) => (
                <li
                  onClick={(e) => handleItemClick(result, e)}                  
                  key={index}
                >
                  {result}
                </li>
              ))}

              {state.errorMessage && (
                <div>
                  <h4 className={style.search_title}>Results</h4>
                  <p>We couldn&apos;t find any results for &lt;&lt;&lt; {searchState.query} &gt;&gt;&gt;</p>


                </div>
              )}
              {searchState.searchHistory.length > 0 && (
                <div>
                  <h4 className={style.search_title}>Latest Search</h4>
                  <div className={style.item_wrapper}>
                    {searchState.searchHistory.map((el) => (
                      <div
                        key={el.id}
                        onClick={() => clear(el)}
                        className={style.searched_items}
                      >
                            <div className={style.search_abel} >
                            <p  className={style.trim}>{el.name}</p>
                            </div>

                        <div className={style.clearhistory} >x </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        {searchState.query &&  <button className={style.close_search}>
          <img src="/search-close.svg" alt="search close" className={style.close_search_icon}/> 
        </button> }
      </form>
    </div>
  );
}

export default SearchBar;
