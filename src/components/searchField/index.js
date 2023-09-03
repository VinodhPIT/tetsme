import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

const SearchField = (props) => {
  const searchInputRef = useRef(null);
  const [searchState, setSearchState] = useState({
    hints: [],
    value: props.value ,
    isDropdownOpen: false,
  });

  useEffect(() => {
    setSearchState((prevState) => ({
      ...prevState,
      hints: props.hints,
      value:props.value
    }));



  }, [props.hints ,props.value]); // This effect will run whenever getHints changes

  const generateHintsToDisplay = useMemo(() => {
    const hintsToDisplay = [];

    if (searchState.hints !== undefined) {
      searchState.hints.forEach((el) => {
        if (el._index === "artist") {
          const artist = el._source;
          const namesToCheck = [
            artist.artist_name,
            artist.first_name,
            artist.last_name,
          ];
          namesToCheck.forEach((name) => {
            if (name && !hintsToDisplay.includes(name)) {
              hintsToDisplay.push(name);
            }
          });
        } else if (el._index === "tattoo") {
          const nameSuggestions = el._source.name_suggest || [];
          nameSuggestions.forEach((nameSuggest) => {
            if (!hintsToDisplay.includes(nameSuggest)) {
              hintsToDisplay.push(nameSuggest);
            }
          });
        }
      });
    }

    return hintsToDisplay;
  }, [searchState.hints]);

  const handleFocus = () => {
    setSearchState({ ...searchState, isDropdownOpen: true });
  };

  // useEffect(() => {
  //   setSearchState({
  //     ...searchState,
  //     hints: props.hints,
  //     value: props.value,
  //   });
  // }, [props.hints, props.value]);

  // const handleClickOutside = (event) => {
  //   if (
  //     searchInputRef.current &&
  //     !searchInputRef.current.contains(event.target)
  //   ) {
  //     setSearchState({ ...searchState, isDropdownOpen: false });
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
   props.handleSubmits()

  };

  return (
    <>
      <div className="search-input-container">

        <form onSubmit={handleSubmit}  >

          <input
            type="search"
            className="search-input"
            ref={searchInputRef}
            onFocus={handleFocus}
            placeholder="Search..."
            style={{ padding: "14px", borderRadius: "40px", width: "100%" }}
            onChange={(event) => props.handleChange(event.target.value)}
            value={props.value}
          />
        </form>

       

        {searchState.isDropdownOpen && (
          <div className="search">
            {generateHintsToDisplay.map((result, index) => (
              <button
                key={index}
                onClick={() =>[props.onclicks(result), setSearchState({ ...searchState, isDropdownOpen: false })]}
                style={{
                  display: "block",
                  width: "100%",
                  background: "transparent",
                  border: "0",
                  cursor: "pointer",
                }}
              >
                {/* <Link
                href={`/search?term=${result}&category=${"all"}`} */}

                <li
                // onClick={}
                  style={{
                    padding: "10px",
                    background: "#eee",
                    marginBottom: "10px",
                    "list-style": "none",
                    "text-align": "left",
                  }}
                  key={index}
                >
                  {result}
                </li>
              </button>
            ))}

            {/* {generateHintsToDisplay.length===0 ? (
              <h4> We couldnt find any results for --- {searchState.value}</h4>
            ) : null} */}

            {generateHintsToDisplay.length === 0 && (
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
    </>
  );
};

export default SearchField;
