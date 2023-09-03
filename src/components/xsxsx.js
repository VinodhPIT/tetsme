import React, { useState, useEffect } from "react";
import {
  fetchCategoryData,
  getStyles,
  fetchMultiData,
} from "@/action/action";
import Head from "next/head";
import { debounce } from "lodash";
import Autocomplete from "react-google-autocomplete";
import { Parameters, tabs } from "@/components/parameters/params";
import {useRouter} from 'next/router'

const Tattoo = React.lazy(() => import("@/components/tattoo/index"));
const Artist = React.lazy(() => import("@/components/artist/index"));
const Flash = React.lazy(() => import("@/components/flash/index"));
const All = React.lazy(() => import("@/components/all/page"));

const Search = ({ data, initialTab, page_count  ,totalItems}) => {

  const router= useRouter()
  // console.log(router.query.category,"d c.ds c.s,d")
  // const { dispatch } = InckState();
  // const [selectedValue, setSelectedValue] = useState(""); // Initialize with default value
  // const [category, setCategory] = useState(data);
  // const [tab, setTab] = useState(initialTab);
  // const [load, setload] = useState(false);
  // const [styles, setStyles] = useState([]);
  // const [message, setMessage] = useState(false);
  // const [pageNumber, setPage] = useState(0);
  // const searchInputRef = useRef(null);

  const [state, setState] = useState({
    categoryCollection: data,
    tab: initialTab ,
    changeTab: false,
    count: page_count,
    selectedStyle: "",
    styleCollection: [],
    totalItems
  });

  // const hintsToDisplay = [];

  // const [isDropdownOpen, setDropdownOpen] = useState(false);

  // // State to store the suggestions fetched from the API
  // const [hint, setHints] = useState([]);

  // // State to track the current value of the search input
  // const [value, setValue] = useState("");

  // // State to store the filtered search results based on user input
  // const [searchResults, setSearchResults] = useState([]);

  // const handleFocus = () => {
  //   setDropdownOpen(true);
  //   setHints([]);
  // };

  // const handleClickOutside = (event) => {
  //   if (
  //     searchInputRef.current &&
  //     !searchInputRef.current.contains(event.target)
  //   ) {
  //     setDropdownOpen(false);
  //   }
  //   setSearchResults([]);
  //   setValue("");
  // };

  // const getHints = async () => {
  //   try {
  //     const responseTattoos = await queryDataFetcher(tab, value);
  //     const results = responseTattoos.rows.hits;
  //     setHints(results);
  //   } catch (error) {
  //     console.error("Error fetching hints:", error);
  //   }
  // };

  // useEffect(() => {
  //   getHints(); // Calls getHints() to fetch suggestions based on the current value
  // }, [value]);

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside); // Listen for clicks outside the input
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside); // Remove event listener on unmount
  //   };
  // }, []);

  // Debounced event handler for search input changes
  // const handleChange = debounce((event) => {
  //   setValue(event);

  //   // Filter hints to match the user input and update search results
  //   const filteredResults = hintsToDisplay.filter((item) =>
  //     item.toLowerCase().includes(event.toLowerCase())
  //   );

  //   if (filteredResults.length === 0) {
  //     setMessage(true);
  //   } else {
  //     setMessage(false);
  //   }

  //   setSearchResults(filteredResults);
  // }, 500);

  // hint.forEach((el) => {
  //   if (el._index === "artist") {
  //     const artist = el;
  //     artist._source.artist_name &&
  //     !hintsToDisplay.includes(artist._source.artist_name)
  //       ? hintsToDisplay.push(artist._source.artist_name)
  //       : null;
  //     artist._source.first_name &&
  //     !hintsToDisplay.includes(artist._source.first_name)
  //       ? hintsToDisplay.push(artist._source.first_name)
  //       : null;
  //     artist._source.last_name &&
  //     !hintsToDisplay.includes(artist._source.last_name)
  //       ? hintsToDisplay.push(artist._source.last_name)
  //       : null;
  //   } else if (el._index === "tattoo") {
  //     const tattoo = el;
  //     tattoo._source.name_suggest &&
  //       tattoo._source.name_suggest.forEach((nameSuggest) => {
  //         if (hintsToDisplay.includes(nameSuggest)) {
  //           return;
  //         }
  //         hintsToDisplay.push(nameSuggest);
  //       });
  //   }
  // });

  async function fetchStyles() {
    try {
      const newData = await getStyles();
      setState((prevState) => ({
        ...prevState,
        styleCollection: newData.rows.hits, // Increment the count by 1
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    fetchStyles();
  }, []);

  function renderCategoryComponent(tab) {
    switch (tab) {
      case "all":
        return (
          <React.Suspense
            fallback={<div style={{ color: "red" }}>Loading Tattoo...</div>}
          >
            <All data={state.categoryCollection} />
          </React.Suspense>
        );

      case "tattoo":
        return (
          <React.Suspense
            fallback={<div style={{ color: "red" }}>Loading Tattoo...</div>}
          >
            <Tattoo data={state.categoryCollection} />
          </React.Suspense>
        );
      case "artist":
        return (
          <React.Suspense fallback={<div>Loading Artist...</div>}>
            <Artist data={state.categoryCollection} />
          </React.Suspense>
        );
      case "flash":
        return (
          <React.Suspense
            fallback={
              <div style={{ color: "red", fontSize: "12px" }}>
                Loading Flash...
              </div>
            }
          >
            <Flash data={state.categoryCollection} />
          </React.Suspense>
        );
      default:
        return null;
    }
  }

  function handleTabClick(categoryName) {
    setState((prevState) => ({
      ...prevState,
      tab: categoryName,
      categoryCollection: [],
      changeTab: true,
      count: 0,
    }));
  }

  useEffect(() => {
    if (state.changeTab || state.count > 0) {

 if(state.tab==="all"){
console.log("is all call")

fetchMultiData({
  ...Parameters,
  category: state.tab,
   page_no: state.count,
   style: state.selectedStyle,
}).then((data) => {
  
  setState((prevState) => ({
    ...prevState,
    categoryCollection: [
      ...prevState.categoryCollection,
      ...data.data
    ],
    totalItems:data.totalCount,
    changeTab: false,
  }));
});

 }
else {
  console.log("is multi call")

      fetchCategoryData({
        ...Parameters,
        category: state.tab,
        page_no: state.count,
        style: state.selectedStyle,
      }).then((data) => {
        console.log(data,"dcmd;cmdl;cmd;lcmld;mc;dmc;d")
        setState((prevState) => ({
          ...prevState,
          categoryCollection: [
            ...prevState.categoryCollection,
            ...data.rows.hits,
          ],
          totalItems:data.rows.total.value,
          changeTab: false,
        }));
      });

    }


    }
  }, [state.changeTab, state.count]);




  useEffect(() => {
    if (state.selectedStyle !== "") {

      if(state.tab==="all"){

        fetchMultiData({
          ...Parameters,
          category: state.tab,
          page_no: state.count,
          style: state.selectedStyle,
        }).then((data) => {
          setState((prevState) => ({
            ...prevState,
            categoryCollection: data.data,
            changeTab: false,
            totalItems:data.totalCount,
          }));
        });

      }

      else {

      fetchCategoryData({
        ...Parameters,
        category: state.tab,
        page_no: state.count,
        style: state.selectedStyle,
      }).then((data) => {
        setState((prevState) => ({
          ...prevState,
          categoryCollection: data.rows.hits,
          changeTab: false,
          totalItems:data.rows.total.value
        }));
      });


    }


    }
  }, [state.selectedStyle]);

  // const handleSelectChange = async (event) => {

  //   setSelectedValue(event.target.value);

  //   // if (tab !== "all") {
  //   //   const newData = await fetchCategoryData(tab, 0, event.target.value);
  //   //   setCategory(newData.rows.hits);
  //   // } else {
  //   //   const newData = await fetchMultiData(0,event.target.value);
  //   //   setCategory(newData.data);
  //   // }

  // };

  const handlePlaceSelected = async (place) => {
    // let ui = place.geometry.location.lat();
    // let yu = place.geometry.location.lng();

    // const newData = await fetchCategoryData(tab, selectedValue, ui, yu);

    // setCategory(newData.rows.hits);

    // Call your custom function here
  };

  const handleButtonClick = () => {
    setState((prevState) => ({
      ...prevState,
      count: prevState.count + 1, // Increment the count by 1
    }));
  };

  return (
    <>
      <Head>
        <title>Inckd Search Page</title>
        <meta name="description" content="Search Me"></meta>
      </Head>

      <div className="search-input-container">
        {/* <form onSubmit={handleSubmit}>
          <input
            type="search"
            className="search-input"
            ref={searchInputRef}
            onFocus={handleFocus}
            placeholder="Search..."
            style={{ padding: "14px", borderRadius: "40px", width: "100%" }}
            onChange={(e) => handleChange(e.target.value)}
          />
        </form> */}
        {/* 
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
        )} */}
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
          {tabs.map((tab) => (
            <button
              key={tab.id}
              disabled={state.tab === tab.id}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div class="custom-select" style={{ width: "200px" }}>
          <select
            onChange={(event) =>
              setState((prevState) => ({
                ...prevState,
                selectedStyle: event.target.value,
                count: 0,
              }))
            }
            value={state.selectedStyle}
          >
            <option value="0">Choose Style</option>
            {state.styleCollection.map((el) => (
              <option key={el._id} value={el._id}>
                {el.sort[0]}
              </option>
            ))}
          </select>
        </div>

        {state.tab === "artist" ? (
          <Autocomplete
            apiKey={process.env.googlePlacesApiKey}
            onPlaceSelected={handlePlaceSelected}
          />
        ) : null}
      </div>

      {renderCategoryComponent(state.tab)}


     
    
    <p>See out of {state.categoryCollection.length}/{state.totalItems}</p>
    {state.categoryCollection.length !== 0 && state.categoryCollection.length !== state.totalItems && (

    <div>

    <button
      onClick={handleButtonClick}
      style={{
        padding: "10px",
        margin: "0 auto",
        width: "200px",
        display: "flex",
      }}
    >
      Load more
    </button>
  </div>
)}
      
    </>
  );
};

export default Search;

export async function getServerSideProps(context) {
  try {
    if (context.query.category === "all") {
      console.log("lmcl;dmc;sldcm 000000")
      const results = await fetchMultiData({
        ...Parameters,
        category: context.query.category,
      });

   

      return {
        props: {
          data: results.data,
          initialTab: context.query.category,
          page_count: 0,
          totalItems:results.totalCount
        
        },
      };
    } else {
      const data = await fetchCategoryData({
        ...Parameters,
        category: context.query.category,
      });
     
    

      return {
        props: {
          data: data.rows.hits,
          initialTab: context.query.category,
          page_count: 0,
          totalItems:data.rows.total.value
        },
      };
    }
  } catch (error) {
    console.log(error,"punda")
    return {
      props: {
        data: null,
      },
    };
  }
}