import React, { useState, useEffect } from "react";
import {
  fetchCategoryData,
  getStyles,
  queryDataFetcher,
  fetchMultiData,
} from "@/action/action";
import Head from "next/head";
import { debounce } from "lodash";
import Autocomplete from "react-google-autocomplete";
import { Parameters, tabs } from "@/components/parameters/params";
import { useRouter } from "next/router";

const Tattoo = React.lazy(() => import("@/components/tattoo/index"));
const Artist = React.lazy(() => import("@/components/artist/index"));
const Flash = React.lazy(() => import("@/components/flash/index"));
const All = React.lazy(() => import("@/components/all/page"));

const Search = ({ data, initialTab, page_count, totalItems }) => {
  const router = useRouter();

  const [state, setState] = useState({
    categoryCollection: data,
    tab: initialTab,
    changeTab: false,
    count: page_count,
    selectedStyle: "",
    styleCollection: [],
    totalItems,
  });

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
      if (state.tab === "all") {
        console.log("is all call");

        fetchMultiData({
          ...Parameters,
          category: state.tab,
          page_no: state.count,
          style: state.selectedStyle,
        }).then((data) => {
          setState((prevState) => ({
            ...prevState,
            categoryCollection: [...prevState.categoryCollection, ...data.data],
            totalItems: data.totalCount,
            changeTab: false,
          }));
        });
      } else {
        console.log("is multi call");

        fetchCategoryData({
          ...Parameters,
          category: state.tab,
          page_no: state.count,
          style: state.selectedStyle,
        }).then((data) => {
          console.log(data, "dcmd;cmdl;cmd;lcmld;mc;dmc;d");
          setState((prevState) => ({
            ...prevState,
            categoryCollection: [
              ...prevState.categoryCollection,
              ...data.rows.hits,
            ],
            totalItems: data.rows.total.value,
            changeTab: false,
          }));
        });
      }
    }
  }, [state.changeTab, state.count]);

  useEffect(() => {
    if (state.selectedStyle !== "") {
      if (state.tab === "all") {
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
            totalItems: data.totalCount,
          }));
        });
      } else {
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
            totalItems: data.rows.total.value,
          }));
        });
      }
    }
  }, [state.selectedStyle]);

  const handlePlaceSelected = (place) => {
    let latitude = place.geometry.location.lat();
    let longitude = place.geometry.location.lng();

    fetchCategoryData({
      ...Parameters,
      latitude,
      longitude,
      category: state.tab,
    })
      .then((e) => {
        setState((prevState) => ({
          ...prevState,
          categoryCollection: e.rows.hits,
          changeTab: false,
          totalItems: e.rows.total.value,
        }));
      })
      .catch((e) => console.log(e));
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

      {state.categoryCollection.length !== 0 &&
        state.categoryCollection.length !== state.totalItems && (
          <div>
            <p>
              See out of {state.categoryCollection.length}/{state.totalItems}
            </p>
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
      console.log("lmcl;dmc;sldcm 000000");
      const results = await fetchMultiData({
        ...Parameters,
        category: context.query.category,
      });

      return {
        props: {
          data: results.data,
          initialTab: context.query.category,
          page_count: 0,
          totalItems: results.totalCount,
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
          totalItems: data.rows.total.value,
        },
      };
    }
  } catch (error) {
    console.log(error, "punda");
    return {
      props: {
        data: null,
      },
    };
  }
}
