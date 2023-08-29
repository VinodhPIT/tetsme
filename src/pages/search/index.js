import React, { useState, useEffect, Suspense, useRef } from "react";
import {
  fetchCategoryData,
  getStyles,
  queryDataFetcher,
  fetchMultiData,
} from "@/pages/action/action";
import Head from "next/head";
import Image from "next/image";
import { debounce } from "lodash";

import Autocomplete from "react-google-autocomplete";

const Tattoo = React.lazy(() => import("@/pages/tattoo/index"));
const Artist = React.lazy(() => import("@/pages/artist/index"));
const Flash = React.lazy(() => import("@/pages/flash/index"));
const All = React.lazy(() => import("@/pages/all/page"));

const Search = ({ data, initialTab, pageNo }) => {
  // const { dispatch } = InckState();
  const [selectedValue, setSelectedValue] = useState(""); // Initialize with default value
  const [category, setCategory] = useState(data);
  const [tab, setTab] = useState(initialTab);
  const [load, setload] = useState(false);
  const [styles, setStyles] = useState([]);
  const [message, setMessage] = useState(false);
  const [pageNumber, setPage] = useState(0);
  const searchInputRef = useRef(null);


  const hintsToDisplay = [];

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // State to store the suggestions fetched from the API
  const [hint, setHints] = useState([]);

  // State to track the current value of the search input
  const [value, setValue] = useState("");

  // State to store the filtered search results based on user input
  const [searchResults, setSearchResults] = useState([]);

  const handleFocus = () => {
    setDropdownOpen(true);
    setHints([]);
  };

  const handleClickOutside = (event) => {
    if (
      searchInputRef.current &&
      !searchInputRef.current.contains(event.target)
    ) {
      setDropdownOpen(false);
    }
    setSearchResults([]);
    setValue("");
  };

  const getHints = async () => {
    try {
      const responseTattoos = await queryDataFetcher(tab, value);
      const results = responseTattoos.rows.hits;
      setHints(results);
    } catch (error) {
      console.error("Error fetching hints:", error);
    }
  };

  // useEffect(() => {
  //   getHints(); // Calls getHints() to fetch suggestions based on the current value
  // }, [value]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside); // Listen for clicks outside the input
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Remove event listener on unmount
    };
  }, []);

  // Debounced event handler for search input changes
  const handleChange = debounce((event) => {
    setValue(event);

    // Filter hints to match the user input and update search results
    const filteredResults = hintsToDisplay.filter((item) =>
      item.toLowerCase().includes(event.toLowerCase())
    );

    if (filteredResults.length === 0) {
      setMessage(true);
    } else {
      setMessage(false);
    }

    setSearchResults(filteredResults);
  }, 500);

  hint.forEach((el) => {
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

  async function fetchStyles() {
    try {
      const newData = await getStyles();
      setStyles(newData.rows.hits);
      console.log(newData.rows.hits,"dccl, ,cl ")
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchStyles();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    router.push(`/search?term=${value}&category=${"all"}`);
  }

  function renderCategoryComponent(tab) {
    switch (tab) {
      case "all":
        return (
          <React.Suspense
            fallback={<div style={{ color: "red" }}>Loading Tattoo...</div>}
          >
            <All data={category} />
          </React.Suspense>
        );

      case "tattoo":
        return (
          <React.Suspense
            fallback={<div style={{ color: "red" }}>Loading Tattoo...</div>}
          >
            <Tattoo data={category} />
          </React.Suspense>
        );
      case "artist":
        return (
          <React.Suspense fallback={<div>Loading Artist...</div>}>
            <Artist data={category} />
          </React.Suspense>
        );
      case "flash":
        return (
          <React.Suspense
            fallback={
              <div style={{ color: "red", fontSize: "1122px" }}>
                Loading Flash...
              </div>
            }
          >
            <Flash data={category} />
          </React.Suspense>
        );
      default:
        return null;
    }
  }

  async function handleTabClick(category) {
    setCategory([]);
    setTab(category);

    if (category !== "all") {
      const newData = await fetchCategoryData(
        category,
        0,
        selectedValue
      );
      setCategory(newData.rows.hits);
    } else {
      const newData = await fetchMultiData(0, selectedValue);
      setCategory(newData.data);
    }
    setPage(0);
  }

  const handleSelectChange = async (event) => {
   
    setSelectedValue(event.target.value);
    if (tab !== "all") {
      const newData = await fetchCategoryData(tab, 0, event.target.value);
      setCategory(newData.rows.hits);
    } else {
      const newData = await fetchMultiData(0,event.target.value);
      setCategory(newData.data);
    }
    setPage(0)
  };

  const handlePlaceSelected = async (place) => {
    let ui = place.geometry.location.lat();
    let yu = place.geometry.location.lng();

    const newData = await fetchCategoryData(tab, selectedValue, ui, yu);

    setCategory(newData.rows.hits);

    // Call your custom function here
  };


  const handleButtonClick = async () => {
     // Increment the page number first
    try {
      const newData = await fetchCategoryData(tab, pageNumber + 1); // Use the updated page number
      setCategory(prevData => [...prevData, ...newData.rows.hits]); // Merge new data with the previous state
      setPage(pageNumber + 1);

    } catch (error) {
      console.error('Error loading more data:', error);
    }
  };

  return (
    <>
      <Head>
        <title>My title</title>
        <meta name="description" content="hi vijodh"></meta>
      </Head>

      <div className="search-input-container">
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            className="search-input"
            ref={searchInputRef}
            onFocus={handleFocus}
            placeholder="Search..."
            style={{ padding: "14px", borderRadius: "40px", width: "100%" }}
            onChange={(e) => handleChange(e.target.value)}
          />
        </form>

        {isDropdownOpen && (
          <div className="search">
            {searchResults.length === 0 && null}
            {searchResults.map((result, index) => (
              <li key={index}>{result}</li>
            ))}

            {message ? (
              <h4> We couldnt find any results for --- {value}</h4>
            ) : (
              " "
            )}

            {searchResults.length === 0 ? (
              <div>
                <p>Get inspired by styles</p>
                <div className="styleTattoo"></div>
              </div>
            ) : (
              " "
            )}
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          "justify-content": "space-between",
          padding: "10px",
          margin: "30px 0px 30px 0px",
        }}
      >
        <div
          style={{
            width: " 400px",
            /* justify-content: space-between; */
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <button
            disabled={tab === "all" ? true : false}
            onClick={() => handleTabClick("all")}
          >
            All
          </button>
          <button
            disabled={tab === "tattoo" ? true : false}
            onClick={() => handleTabClick("tattoo")}
          >
            Tattoo
          </button>
          <button
            disabled={tab === "flash" ? true : false}
            onClick={() => handleTabClick("flash")}
          >
            Flash
          </button>
          <button
            disabled={tab === "artist" ? true : false}
            onClick={() => handleTabClick("artist")}
          >
            Artist
          </button>
        </div>
        <div class="custom-select" style={{ width: "200px" }}>
          <select onChange={handleSelectChange}>
            {selectedValue == "" ? <option value="0">Choose Style</option> : ""}
            {styles.map((e) => {
              return (
                <option key={e._id} value={e._id}>
                  {e.sort[0]}
                </option>
              );
            })}
          </select>
        </div>

        {tab === "artist" ? (
          <Autocomplete
            apiKey={process.env.googlePlacesApiKey}
            onPlaceSelected={handlePlaceSelected}
          />
        ) : null}
      </div>

      {renderCategoryComponent(tab)}
      <p>{pageNumber}</p>

      <button onClick={handleButtonClick} style={{
    'background': '#000',
    'border-radius':'30px',
    'padding': '10px',
    'color': '#fff',
    'margin': '0 auto',
    'width': '200px',
    'display': 'flex',
      }}>Load more</button>

    
    </>
  );
};

export default Search;

export async function getServerSideProps(context) {
  try {
    if (context.query.category === "all") {
      const results = await fetchMultiData();

      return {
        props: {
          data: results.data,
          initialTab: context.query.category,
        },
      };
    } else {
      const data = await fetchCategoryData(context.query.category);

      return {
        props: {
          data: data.rows.hits,
          initialTab: context.query.category,
        },
      };
    }
  } catch (error) {
    return {
      props: {
        data: null,
      },
    };
  }
}
