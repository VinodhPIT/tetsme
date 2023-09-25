// GlobalState.js
import React, { createContext, useReducer, useContext } from "react";
import { fetchCategoryData, fetchMultiData, getStyles } from "@/action/action";
import { Parameters } from "@/components/parameters/params";

const initialState = {
  categoryCollection: [],
  currentTab: "",
  isTriggered: false,
  pageNo: 0,
  selectedStyle: "",
  styleCollection: [],
  totalItems: "",
  searchKey: "",
  value: "",
  hints: [],
  errorMessage: false,
  loading: false,
  latitude: "",
  longitude: "",
  searchData: [],
  serverLoad: false,
  toggle: false,
};

const reducer = (state, action) => {
  let data, currentTab, totalItems, searchKey, selectedStyle, pageNo, lat, lon;

  switch (action.type) {
    case "ON-LOAD":
      return {
        ...state,
        serverLoad: action.payload,
      };
    case "IS_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "INITIAL_SERVER_DATA":
      ({
        data,
        currentTab,
        pageNo,
        totalItems,
        searchKey,
        selectedStyle,
        lat,
        lon,
      } = action.payload);

      return {
        ...state,
        categoryCollection: data,
        currentTab,
        totalItems,
        searchKey,
        pageNo: 0,
        serverLoad: false,
        selectedStyle,
        latitude: lat,
        longitude: lon,
      };

    case "COUNT":
      const pageNo = action.payload;
      return { ...state, pageNo };

    
    case "LOAD_MORE":
      return {
        ...state,
        categoryCollection:
          state.currentTab === "all"
            ? [...state.categoryCollection, ...action.payload.data]
            : [...state.categoryCollection, ...action.payload.rows.hits],
      };

   

    case "GET_HINTS":
      return {
        ...state,
        hints:
          state.currentTab === "all" || state.currentTab === ""
            ? action.payload.data
            : action.payload.rows.hits,
        errorMessage: state.hints.length === 0 ? true : false,
      };

    case "SEARCH_QUERY":
      return {
        ...state,
        searchKey: action.payload,
        loading: false,
      };

    case "SEARCH_DATA":
      return {
        ...state,
        categoryCollection:
          state.currentTab === "all" || state.currentTab === ""
            ? action.payload.data
            : action.payload.rows.hits,
        totalItems:
          state.currentTab === "all" || state.currentTab === ""
            ? action.payload.data.totalCount
            : action.payload.rows.total.value,
        pageNo: 0,
      };

    case "STYLE_COLLECTION":
      return {
        ...state,
        styleCollection: action.payload,
      };

    default:
      return state;
  }
};

const GlobalStateContext = createContext();

export const useGlobalState = () => useContext(GlobalStateContext);

export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const serverLoad = async (payload) => {
    dispatch({ type: "ON-LOAD", payload });
  };

  const fetchServerlData = async (payload) => {
    try {
      dispatch({ type: "INITIAL_SERVER_DATA", payload: payload });
    } catch (error) {}
  };


  const loadMore = async () => {
    const updatedPageNo = state.pageNo + 1;
    dispatch({ type: "COUNT", payload: updatedPageNo });
    try {
      const requestData = {
        ...Parameters,
        category: state.currentTab,
        page_no: updatedPageNo,
        style: state.selectedStyle,
        search_key: state.searchKey,
      };
      let responseData;
      if (state.currentTab === "all") {
        responseData = await fetchMultiData(requestData);
      } else {
        responseData = await fetchCategoryData(requestData);
      }
      dispatch({ type: "LOAD_MORE", payload: responseData });
    } catch (error) {}
  };

  const getHintsBySearch = async (payload) => {
    try {
      const requestData = {
        ...Parameters,
        category: state.currentTab,
        search_key: payload,
      };
      let responseData;
      if (state.currentTab === "all" || state.currentTab === "") {
        responseData = await fetchMultiData(requestData);
      } else {
        responseData = await fetchCategoryData(requestData);
      }
      dispatch({ type: "GET_HINTS", payload: responseData });
    } catch (error) {}
  };



  const searchData = async (payload, router, load) => {
    dispatch({ type: "IS_LOADING", payload: load });

    let url = `/search?term=${payload}&category=${state.currentTab}`;
    if (state.selectedStyle !== "") {
      url += `&style=${state.selectedStyle}`;
    }
    router.push(url);

    dispatch({ type: "SEARCH_QUERY", payload });
    try {
      const requestData = {
        ...Parameters,
        category: state.currentTab,
        search_key: payload,
      };

      let responseData;
      if (state.currentTab === "all" || state.currentTab == "") {
        responseData = await fetchMultiData(requestData);
      } else {
        responseData = await fetchCategoryData(requestData);
      }
      dispatch({ type: "SEARCH_DATA", payload: responseData });
    } catch (error) {}
  };





  const styleCollection = async () => {
    try {
      let responseData = await getStyles();
      dispatch({ type: "STYLE_COLLECTION", payload: responseData.rows.hits });
    } catch (error) {}
  };

  return (
    <GlobalStateContext.Provider
      value={{
        state,
        fetchServerlData,
        loadMore,
        getHintsBySearch,
        searchData,
        serverLoad,
        styleCollection,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
