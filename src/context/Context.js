import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchCategoryData, getStyles, fetchMultiData } from "@/action/action";
import { debounce } from "lodash";
import { Parameters, tabs } from "@/components/parameters/params";
import { useRouter } from "next/router";

const InckdContext = createContext();

export function InckdProvider({ children }) {
  const [state, setState] = useState({
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
  });

  const updateApiData = (data, currentTab, pageNo, totalItems, searchKey) => {
    setState((prevState) => ({
      ...prevState,
      categoryCollection: data,
      currentTab,
      pageNo,
      totalItems,
      searchKey,
    }));
  };

  useEffect(() => {
    const selectTab = async () => {
  
      if (state.isTriggered === true) {
        console.log("cjocsjdcop0000")
        try {
          const requestData = {
            ...Parameters,
            category:state.currentTab ==='' ? "all":state.currentTab,
            page_no: state.pageNo,
            style: state.selectedStyle,
            latitude: state.latitude,
            longitude: state.longitude,
            search_key: state.value === "" ? state.searchKey : state.value,
          };

          console.log(state.currentTab ,"cms;cmsl;csc")


          let responseData;
          if (state.currentTab === "all"||state.currentTab==='') {

            console.log('c;smcsmcld;mc;slmcsc')

            responseData = await fetchMultiData(requestData);
          } else {
            responseData = await fetchCategoryData(requestData);
          }

          if (state.value !== "") {
            console.log(responseData,"mcsld;mc;slmcs;c")
            setState((prevState) => ({
              ...prevState,
              searchData:
                state.currentTab === "all" ||state.currentTab===''
                  ? responseData.data
                  : responseData.rows.hits,
                  errorMessage: state.searchData.length === 0 ? true : false,
            }));
          } else {
            setState((prevState) => ({
              ...prevState,
              errorMessage: false,
              categoryCollection:
                state.pageNo === 0
                  ? state.currentTab === "all" ||state.currentTab===''
                    ? responseData.data
                    : responseData.rows.hits
                  : [
                      ...prevState.categoryCollection,
                      ...(state.currentTab === "all" ||state.currentTab===''
                        ? responseData.data
                        : responseData.rows.hits),
                    ],
              totalItems:
                state.currentTab === "all" ||state.currentTab===''
                  ? responseData.totalCount
                  : responseData.rows.total.value,
            }));
          }
        } catch (error) {
          // Handle errors here
          console.error("Error fetching data:", error);
        }
      }
    };

    selectTab();
  }, [
    state.currentTab,
    state.isTriggered,
    state.pageNo,
    state.selectedStyle,
    state.latitude,
    state.value,
    state.longitude,
    state.searchKey,
  ]);

  return (
    <InckdContext.Provider value={{ state, setState, updateApiData }}>
      {children}
    </InckdContext.Provider>
  );
}

export function useInckd() {
  return useContext(InckdContext);
}
