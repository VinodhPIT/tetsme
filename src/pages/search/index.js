import React, { useState, useEffect } from "react";
import Head from "next/head";
import { fetchCategoryData, getStyles, fetchMultiData } from "@/action/action";
import { debounce } from "lodash";
import Autocomplete from "react-google-autocomplete";
import { Parameters, tabs } from "@/components/parameters/params";
import renderCategoryComponent from "@/components/categoryComponent/categoryComponent";
import { useInckd } from "@/context/Context";
import { useRouter } from "next/router";
import SearchField from "@/components/searchField/index";

const Search = ({ data, currentTab, pageNo, totalItems, searchKey }) => {
  const { state, setState, updateApiData } = useInckd();

  const router = useRouter();

  useEffect(() => {
    try {
      updateApiData(data, currentTab, pageNo, totalItems, searchKey); // Update the context state
    } catch (error) {
      console.error("Log Error:", error);
    }
  }, [data , currentTab, pageNo, totalItems, searchKey]);

  const [stylsse, setStyle] = useState([]);

  async function fetchStyles() {
    try {
      const newData = await getStyles();
      setStyle(newData.rows.hits);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    fetchStyles();
  }, []);

  function handleTabClick(categoryName) {
    // router.push(`search?term=${""}&category=${categoryName}`);
    setState((prevState) => ({
      ...prevState,
      currentTab: categoryName,
      isTriggered: true,
      categoryCollection: [],
      pageNo: 0,
      latitude: "",
      longitude: "",
      value:""
    }));
  }

  const handlePlaceSelected = async (place) => {
    // ------  Search Artist  Based on Location ------ //
    const { lat, lng } = place.geometry.location;

    setState((prevState) => ({
      ...prevState,
      currentTab: "artist",
      isTriggered: true,
      categoryCollection: [],
      pageNo: 0,
      latitude: lat(),
      longitude: lng(),
      value:""
    }));
  };

  return (
    <>
      <Head>
        <title>Inckd Search Page</title>
        <meta name="description" content="Search Me"></meta>
      </Head>

      <SearchField />

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
              disabled={state.currentTab === tab.id}
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
                pageNo: 0,
                isTriggered: true,
                categoryCollection: [],
                latitude: "",
                longitude: "",
              }))
            }
            value={state.selectedStyle}
          >
            <option value="0">Choose Style</option>
            {stylsse.map((el) => (
              <option key={el._id} value={el._id}>
                {el.sort[0]}
              </option>
            ))}
          </select>
        </div>

        {state.currentTab === "artist" && (
          <Autocomplete
            apiKey={process.env.googlePlacesApiKey}
            onPlaceSelected={handlePlaceSelected}
          />
        )}
      </div>

      {renderCategoryComponent(
        state.currentTab,
        state.categoryCollection,
        state.loading
      )}

      {state.categoryCollection.length !== 0 &&
        state.categoryCollection.length !== state.totalItems && (
          <div>
            <p>
              See out of {state.categoryCollection.length}/{state.totalItems}
            </p>
            <button
              onClick={() => {
                setState((prevState) => ({
                  ...prevState,
                  pageNo: prevState.pageNo + 1, // Increment the count by 1
                  isTriggered: true,
                  value:""
                }));
              }}
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
      const results = await fetchMultiData({
        ...Parameters,
        category: context.query.category,
        search_key:context.query.term,

      });

      return {
        props: {
          data: results.data,
          currentTab: context.query.category,
          pageNo: 0,
          totalItems: results.totalCount,
          searchKey: context.query.term,
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
          currentTab: context.query.category,
          pageNo: 0,
          totalItems: data.rows.total.value,
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
