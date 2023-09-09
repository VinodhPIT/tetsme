


import React, { useState, useEffect, useRef  ,useMemo} from 'react';
import Link from "next/link";
import { useInckd } from "@/context/Context";
import { debounce, round } from "lodash";
import style from  './search.module.css'
import {useRouter} from 'next/router'



function SearchBar({isHome}) {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);
  const { state, setState } = useInckd();
  const router = useRouter()

 
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);



  const generateHintsToDisplay = useMemo(() => {
    const hintsToDisplay = [];
    if (state.searchData !== undefined) {
      state.searchData.forEach((el) => {
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
   }, [state.searchData]);


  const handleChange = debounce((e) => {
    setQuery(e);
    setState((prevState) => ({
      ...prevState,
      value: e,

      isTriggered: true,
    }));
  }, 100);



  const handleSubmit = (e) => {
       e.preventDefault();
   console.log(e ,"kcskcpks[pcsd")
    // e.preventDefault();
    // setShowDropdown(false);
    // setState((prevState) => ({
    //   ...prevState,
    //   value: " ",
    //   searchKey: e,
    //   isTriggered: true,
    //   pageNo: 0,
    // }));



  };

  const handleOutsideClick = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setShowDropdown(false);
      // hintsToDisplay=[]


    }
  };

  const handleItemClick = (item) => {
    setQuery(item); // Set the selected item in the input field
    setShowDropdown(false);

if(isHome!==undefined){

  router.push(`/search?term=${item}&category=${"all"}`)


}


else{    

    setState((prevState) => ({
      ...prevState,
      value: "",
      searchKey: item,
      isTriggered: true,
      pageNo: 0,
    }));
  }


  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <div className={style.search_input_container}ref={inputRef}>
          <input
            type="text"
            placeholder="Search Google"
            value={query}
            onChange={(event) => handleChange(event.target.value)}
            onFocus={() => setShowDropdown(true)}
          />
          {showDropdown && (
            <div className={style.dropdown}>
               {generateHintsToDisplay.map((result, index) => (
              <button
                key={index}
                onClick={() => handleItemClick(result)}
                style={{
                  display: "block",
                  width: "100%",
                  background: "transparent",
                  border: "0",
                  cursor: "pointer",
                }}
              >
                <li
                  
                  key={index}
                >
                  {result}
                </li>
              </button>
            ))}

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
        <button type="submit">Search</button>
      </form>
    
    </div>
  );
}

export default SearchBar;

