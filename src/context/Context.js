// GlobalState.js
import React, { createContext, useReducer, useContext } from "react";
import { fetchCategoryData, fetchMultiData } from "@/action/action";
import { Parameters } from "@/components/parameters/params";
import {addAdsToResults} from '@/helpers/helper'

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
  let data, currentTab, totalItems, searchKey, pageNo;

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
      ({ data, currentTab, totalItems, searchKey, pageNo } = action.payload);
      return {
        ...state,
        categoryCollection:data,
        currentTab,
        totalItems,
        searchKey,
        pageNo,
        serverLoad: false,
      };

    case "ACTIVE_TAB":
      const tab = action.payload;
      return { ...state, currentTab: tab };

    case "CURRENT_STYLE":
      const style = action.payload;
      return { ...state, selectedStyle: style };

    case "COUNT":
      const pageNo = action.payload;
    
      return { ...state, pageNo };

    case "CHANGE_TAB":
      const data = action.payload;
      return {
        ...state,
        categoryCollection:
          state.currentTab === "all" ? data.data : data.rows.hits,
        totalItems:
          state.currentTab === "all" ? data.totalCount : data.rows.total.value,
        pageNo: 0,
        loading: false,
      };
    case "LOAD_MORE":
      return {
        ...state,
        categoryCollection:
          state.currentTab === "all"
            ? [...state.categoryCollection, ...action.payload.data]
            : [...state.categoryCollection, ...action.payload.rows.hits],
      };

    case "SEARCH_STYLE":
      const getStyle = action.payload;

      return {
        ...state,
        categoryCollection:
          state.currentTab === "all" ? getStyle.data : getStyle.rows.hits,
        totalItems:
          state.currentTab === "all"
            ? getStyle.totalCount
            : getStyle.rows.total.value,
        pageNo: 0,
      };

    case "FIND_ARTIST":
      return {
        ...state,
        categoryCollection: action.payload.rows.hits,
        totalItems: action.payload.rows.total.value,
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
      console.log(payload,'cmdpckpsdckopskc')

   

      dispatch({ type: "INITIAL_SERVER_DATA", payload: payload });

     

    
   


    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const updateTab = async (payload, router, load) => {
    // ---------------- Fetching  Data Based On ActiveTab --------- //

    // await router.push(`/search?term=${state.searchKey}&category=${payload}`);

    dispatch({ type: "IS_LOADING", payload: load });

    dispatch({ type: "ACTIVE_TAB", payload: payload });
    try {
      const requestData = {
        ...Parameters,
        category: payload,
      };
      let responseData;
      if (payload === "all") {
        responseData = await fetchMultiData(requestData);


      } else {

        responseData = await fetchCategoryData(requestData);

      }
      dispatch({ type: "CHANGE_TAB", payload: responseData });
    } catch (error) {
      console.error("Error occurs On Updating New Tab Data:", error);
    }
  };

  const loadMore = async () => {
    // ---------------- Load More Data With Previous Data  --------- //
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
    } catch (error) {
      console.error("Error On Load More:", error);
    }
  };

  const searchStyle = async (payload) => {
    // ----------------Fetch Data Based On Styles  --------- //
    dispatch({ type: "CURRENT_STYLE", payload });
    try {
      const requestData = {
        ...Parameters,
        category: state.currentTab,
        style: payload,
      };
      let responseData;
      if (state.currentTab === "all") {
        responseData = await fetchMultiData(requestData);
      } else {
        responseData = await fetchCategoryData(requestData);
      }
      dispatch({ type: "SEARCH_STYLE", payload: responseData });
    } catch (error) {
      console.error("Error Fetching Style:", error);
    }
  };

  const findArtist = async (payload) => {
    // ----------------Fetch Artist Based On Location  --------- //
    try {
      const requestData = {
        ...Parameters,
        category: state.currentTab,
        latitude: payload.latitude,
        longitude: payload.longitude,
      };
      let responseData;

      responseData = await fetchCategoryData(requestData);

      dispatch({ type: "FIND_ARTIST", payload: responseData });
    } catch (error) {
      console.error("Error Fetching  Based on Location:", error);
    }
  };

  const getHintsBySearch = async (payload) => {
    // -----------------  Get Hints Based On keyword--------- //
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
    } catch (error) {
      console.error("Error Fetching Hints:", error);
    }
  };

  const searchData = async (payload) => {
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
    } catch (error) {
      console.error("Error On Search:", error);
    }
  };

  return (
    <GlobalStateContext.Provider
      value={{
        state,
        fetchServerlData,
        updateTab,
        loadMore,
        searchStyle,
        findArtist,
        getHintsBySearch,
        searchData,
        serverLoad,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
