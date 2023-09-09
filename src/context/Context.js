// GlobalState.js
import React, { createContext, useReducer, useContext } from "react";
import { fetchCategoryData, getStyles, fetchMultiData } from "@/action/action";
import { debounce } from "lodash";
import { Parameters, tabs } from "@/components/parameters/params";

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
  isChange: false,
  loading: false,
  latitude: "",
  longitude: "",
  searchData: [],
};

const reducer = (state, action) => {
  let data, currentTab, totalItems, searchKey, pageNo;

  switch (action.type) {
    case "INITIAL_SERVER_DATA":
      ({ data, currentTab, totalItems, searchKey, pageNo } = action.payload);
      return {
        ...state,
        categoryCollection: data,
        currentTab,
        totalItems,
        searchKey,
        pageNo,
      };

    case "ACTIVE_TAB":
      const tab = action.payload;
      return { ...state, currentTab: tab };

    case "CURRENT_STYLE":
      const style = action.payload;
      return { ...state, selectedStyle: style };

    case "COUNT":
      const pageNo = action.payload;
      console.log(pageNo, "pageNo");
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
          hints:  state.currentTab === "all"  ||  state.currentTab === "" ?    action.payload.data :   action.payload.rows.hits,
        };

        case "SEARCH_QUERY":
          return {
            ...state,
            searchKey: action.payload,
          };
  

       
        case "SEARCH_DATA":
          console.log(action.payload ,"dcmdpskcpdskcopdkcosdpc")
          return {
            ...state,
            categoryCollection: state.currentTab === "all" ? action.payload.data : action.payload.rows.hits,
            totalItems:
            state.currentTab === "all" ? action.payload.data.totalCount : action.payload.rows.total.value,
            pageNo:0
  
          };



    default:
      return state;
  }
};

const GlobalStateContext = createContext();

export const useGlobalState = () => useContext(GlobalStateContext);

export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // ---------------- Fetching Server Data on Initial Page Load --------- //
  const fetchServerlData = async (payload) => {
    try {
      dispatch({ type: "INITIAL_SERVER_DATA", payload: payload });
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  // ---------------- Fetching Server Data Initial Page Load --------- //

  // ---------------- Fetching  Data Based On ActiveTab --------- //
  const updateTab = async (payload) => {
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
  // ---------------- Fetching  Data Based On ActiveTab  --------- //

  // ---------------- Load More Data With Previous Data  --------- //
  const loadMore = async () => {
    const updatedPageNo = state.pageNo + 1;
    dispatch({ type: "COUNT", payload: updatedPageNo });
    try {
      const requestData = {
        ...Parameters,
        category: state.currentTab,
        page_no: updatedPageNo,
        style: state.selectedStyle,
        search_key:state.searchKey
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

  // ----------------Load More Data With Previous Data  --------- //

  // ----------------Fetch Data Based On Styles  --------- //
  const searchStyle = async (payload) => {
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
        console.log(responseData,"c[sdplc[slcs")
      }
      dispatch({ type: "SEARCH_STYLE", payload: responseData });
    } catch (error) {
      console.error("Error Fetching Style:", error);
    }
  };
  // ----------------Fetch Data Based On Styles  --------- //

  // ----------------Fetch Artist Based On Location  --------- //
  const findArtist = async (payload) => {
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

  // -----------------   Fetch Artist Based On Location   --------- //






  const getHintsBySearch = async (payload) => {
    try {
      const requestData = {
        ...Parameters,
        category: state.currentTab,
        search_key:payload
      };
      let responseData;
      if (state.currentTab === "all" ||state.currentTab==='') {
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
        search_key:payload
      };
      let responseData;
      if (state.currentTab === "all") {
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
        findArtist,getHintsBySearch ,searchData
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
