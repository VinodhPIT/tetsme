import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { useInckd } from "@/context/Context";
import { debounce, round } from "lodash";
import style from "./search.module.css";
import { useRouter } from "next/router";
import { useGlobalState } from "@/context/Context";

function SearchBar({ isHome }) {
  const { state, getHintsBySearch, searchData } = useGlobalState();

  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

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

  // const generateHintsToDisplay = useMemo(() => {
  //   const hintsToDisplay = [];
  //   if (state.hints !== undefined) {
  //     state.hints.forEach((el) => {
  //       if (el._index === "artist") {
  //         const artist = el._source;
  //         const namesToCheck = [
  //           artist.artist_name,
  //           artist.first_name,
  //           artist.last_name,
  //         ];
  //         namesToCheck.forEach((name) => {
  //           if (name && !hintsToDisplay.includes(name)) {
  //             hintsToDisplay.push(name);
  //           }
  //         });
  //       } else if (el._index === "tattoo") {
  //         const nameSuggestions = el._source.name_suggest || [];
  //         nameSuggestions.forEach((nameSuggest) => {
  //           if (!hintsToDisplay.includes(nameSuggest)) {
  //             hintsToDisplay.push(nameSuggest);
  //           }
  //         });
  //       }
  //     });
  //   }

  //   return hintsToDisplay;
  // }, [state.hints]);

  const handleChange = debounce((e) => {
    setQuery(e);
    getHintsBySearch(e);
  }, 100);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(query, "dcdcds");
    searchData(query);
  };

  const handleOutsideClick = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  const handleItemClick = (item) => {
    setQuery(item); // Set the selected item in the input field
    setShowDropdown(false);
    if (isHome !== undefined) {
      router.push(`/search?term=${item}&category=${"all"}`);
    } else {
      searchData(item);
    }
  };

  // };

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

// import React, { useState, useEffect, useRef } from 'react';

// function SearchBar() {
//   const [query, setQuery] = useState('');
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [selectedItem, setSelectedItem] = useState('');
//   const inputRef = useRef(null);

//   useEffect(() => {
//     document.addEventListener('mousedown', handleOutsideClick);
//     return () => {
//       document.removeEventListener('mousedown', handleOutsideClick);
//     };
//   }, []);

//   const handleInputChange = (e) => {
//     setQuery(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle your search logic here.
//     console.log('Search query:', query);
//   };

//   const handleOutsideClick = (e) => {
//     if (inputRef.current && !inputRef.current.contains(e.target)) {
//       setShowDropdown(false);
//     }
//   };

//   const handleItemClick = (item) => {
//     setQuery(item); // Set the selected item in the input field
//     setSelectedItem(item);
//     setShowDropdown(false);
//   };

//   return (
//     <div className="search-bar">
//       <form onSubmit={handleSubmit}>
//         <div className="search-input-container" ref={inputRef}>
//           <input
//             type="text"
//             placeholder="Search Google"
//             value={query}
//             onChange={handleInputChange}
//             onFocus={() => setShowDropdown(true)}
//           />
//           {showDropdown && (
//             <div className="dropdown">
//               <ul>
//                 <li onClick={() => handleItemClick('Item 1')}>Item 1</li>
//                 <li onClick={() => handleItemClick('Item 2')}>Item 2</li>
//                 <li onClick={() => handleItemClick('Item 3')}>Item 3</li>
//                 {/* Add more items as needed */}
//               </ul>
//             </div>
//           )}
//         </div>
//         <button type="submit">Search</button>
//       </form>
//       {selectedItem && <p>Selected Item: {selectedItem}</p>}
//     </div>
//   );
// }

// export default SearchBar;
