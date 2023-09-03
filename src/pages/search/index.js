import React, { useState, useEffect } from "react";
import Head from "next/head";
import { fetchCategoryData, getStyles, fetchMultiData } from "@/action/action";
import { debounce, stubTrue } from "lodash";
import Autocomplete from "react-google-autocomplete";
import { Parameters, tabs } from "@/components/parameters/params";
import renderCategoryComponent from "@/components/categoryComponent/categoryComponent";
import SearchField from "@/components/searchField/index";
import { useDispatch } from "react-redux";
import { catgeorySearch } from "@/redux/slices/categorySearch";

const Search = ({ data, initialTab, page_no, totalItems, searchKey }) => {
  const [state, setState] = useState({
    categoryCollection: data,
    tab: initialTab,
    changeTab: false,
    count: page_no,
    selectedStyle: "",
    styleCollection: [],
    totalItems,
    searchKey,
    value: "",
    hints: [],
    loader: false,
    errorMessage: false,
    isChange: false,
    loading:false
  });

  const dispatch = useDispatch();

  async function fetchStyles() {
    try {
      const newData = await getStyles();
      setState((prevState) => ({
        ...prevState,
        styleCollection: newData.rows.hits,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    fetchStyles();
  }, []);

  function handleTabClick(categoryName) {
    setState((prevState) => ({
      ...prevState,
      tab: categoryName,
      categoryCollection: [],
      changeTab: true,
      count: 0,
      searchKey: "",
      isChange: false,
    }));
  }

  useEffect(() => {
    const fetchData = async () => {
      try {

        setState((prevState) => ({
          ...prevState,
        loading:true
        }));

        const requestData = {
          ...Parameters,
          category: state.tab,
          page_no: state.count,
          style: state.selectedStyle,
          search_key: state.searchKey,
        };
        let responseData;
        if (state.tab === "all") {
          responseData = await fetchMultiData(requestData);
        } else {
          responseData = await fetchCategoryData(requestData);
        }

        if (state.isChange === true) {
          setState((prevState) => ({
            ...prevState,
            hints:
              state.tab === "all" ? responseData.data : responseData.rows.hits,
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            errorMessage: false,
            categoryCollection:
              state.count === 0
                ? state.tab === "all"
                  ? responseData.data
                  : responseData.rows.hits
                : [
                    ...prevState.categoryCollection,
                    ...(state.tab === "all"
                      ? responseData.data
                      : responseData.rows.hits),
                  ],
            totalItems:
              state.tab === "all"
                ? responseData.totalCount
                : responseData.rows.total.value,
            changeTab: false,

            totalItems:
              state.tab === "all"
                ? responseData.totalCount
                : responseData.rows.total.value,
            changeTab: false,
            loading:false
          }));
        }
      } catch (error) {
        // Handle errors here
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [
    state.changeTab,
    state.count,
    state.selectedStyle,
    state.searchKey,
    state.value,
    state.tab,
  ]);

  const handlePlaceSelected = async (place) => {
    // ------  Search Artist  Based on Location ------ //
    const { lat, lng } = place.geometry.location;
    try {
      const e = await fetchCategoryData({
        ...Parameters,
        latitude: lat(),
        longitude: lng(),
        category: state.tab,
        page_no: state.count,
      });
      setState((prevState) => ({
        ...prevState,
        categoryCollection: e.rows.hits,
        changeTab: false,
        totalItems: e.rows.total.value,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = debounce((event) => {
    setState((prevState) => ({
      ...prevState,
      searchKey: event,
      value: event,
      isChange: true,

      // searchKey:event
    }));
  }, 100);

  const handleSubmits = () => {
    setState((prevState) => ({
      ...prevState,
      value: state.value,
      // searchKey:event
    }));
  };

  const onclicks = (e) => {
    setState((prevState) => ({
      ...prevState,
      searchKey: e,
      count: 0,
      isChange: false,
      value: e,
    }));
  };

  return (
    <>
      <Head>
        <title>Inckd Search Page</title>
        <meta name="description" content="Search Me"></meta>
      </Head>

      <SearchField
        handleChange={handleChange}
        hints={state.hints}
        onclicks={onclicks}
        handleSubmits={handleSubmits}
        value={state.value}
      />

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
                isChange: false,
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

        {state.tab === "artist" && (
          <Autocomplete
            apiKey={process.env.googlePlacesApiKey}
            onPlaceSelected={handlePlaceSelected}
          />
        )}
      </div>

      {renderCategoryComponent(state.tab, state.categoryCollection ,state.loading)}

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
                  count: prevState.count + 1, // Increment the count by 1
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
      });

      return {
        props: {
          data: results.data,
          initialTab: context.query.category,
          page_no: 0,
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
          initialTab: context.query.category,
          page_no: 0,
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
