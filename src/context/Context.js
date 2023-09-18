// GlobalState.js
import React, { createContext, useReducer, useContext } from "react";
import { fetchCategoryData, fetchMultiData  ,getStyles} from "@/action/action";
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
  let data, currentTab, totalItems, searchKey, selectedStyle, pageNo;


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
      ({ data, currentTab, pageNo, totalItems, searchKey, selectedStyle } =
        action.payload);

      return {
        ...state,
        categoryCollection: data,
        currentTab,
        totalItems,
        searchKey,
        pageNo: 0,
        serverLoad: false,
        selectedStyle,
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
        loading:false
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
          styleCollection:action.payload

        }
  



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

  const updateTab = async (payload, router, load) => {
    dispatch({ type: "ACTIVE_TAB", payload: payload });

    dispatch({ type: "IS_LOADING", payload: load });



    let url = `/search?term=${state.searchKey || ""}&category=${
      payload
    }`;
    if (state.selectedStyle !== "") {
      url += `&style=${state.selectedStyle}`;
    }
    router.push(url);

    try {
      const requestData = {
        ...Parameters,
        category: payload,
        style: state.selectedStyle,
        search_key:state.searchKey
      };
      console.log(requestData,"requestData")
      let responseData;
      if (payload === "all") {
        responseData = await fetchMultiData(requestData);
      } else {
        responseData = await fetchCategoryData(requestData);
      }
      dispatch({ type: "CHANGE_TAB", payload: responseData });
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

  const searchStyle = async (payload, router) => {
    let url = `/search?term=${state.searchKey}&category=${
      state.currentTab 
    }&style=${payload}`;

    if (state.latitude !== "" && state.longitude !== "") {
      url += `&lon=${state.longitude}&lat=${state.latitude}`;
    }

    router.push(url);

    dispatch({ type: "CURRENT_STYLE", payload });

    try {
      const requestData = {
        ...Parameters,
        category: state.currentTab,
        style: payload,
        search_key :state.searchKey
      };
      let responseData;
      if (state.currentTab === "all") {
        responseData = await fetchMultiData(requestData);
      } else {
        responseData = await fetchCategoryData(requestData);
      }
      dispatch({ type: "SEARCH_STYLE", payload: responseData });
    } catch (error) {}
  };

  const findArtist = async (payload ,router) => {


    let url = `/search?term=${state.searchKey}&category=${
      state.currentTab 
    }&lon=${payload.longitude}&lat=${payload.latitude}`;

    if (state.selectedStyle !== "") {

     url = `style=${state.selectedStyle}`

     
    }

    router.push(url);




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

  const searchData = async (payload,router ,load) => {
    dispatch({ type: "IS_LOADING", payload: load });

    let url = `/search?term=${payload}&category=${
      state.currentTab
    }`;
    if (state.selectedStyle !== "") {
      url += `&style=${state.selectedStyle}`;
    }
    router.push(url)

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

  // const onClearText = async (payload,router ,load) => {
  //   dispatch({ type: "IS_LOADING", payload: load });

  //   let url = `/search?term=${payload}&category=${
  //     state.currentTab
  //   }`;
  //   if (state.selectedStyle !== "") {
  //     url += `&style=${state.selectedStyle}`;
  //   }
  //   router.push(url)

  //   dispatch({ type: "SEARCH_QUERY", payload });
  //   try {
  //     const requestData = {
  //       ...Parameters,
  //       category: state.currentTab,
  //       search_key: payload,

  //     };
   
  //     let responseData;
  //     if (state.currentTab === "all" || state.currentTab == "") {
  //       responseData = await fetchMultiData(requestData);
  //     } else {
  //       responseData = await fetchCategoryData(requestData);
  //     }
  //     dispatch({ type: "SEARCH_DATA", payload: responseData });
  //   } catch (error) {}
  // };





  const styleCollection = async () => {
    
try {
        let  responseData = await getStyles();
  
        console.log(responseData,"dck[dkc")
      
      dispatch({ type: "STYLE_COLLECTION", payload: responseData.rows.hits });


    } catch (error) {}
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
        serverLoad,styleCollection 
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
