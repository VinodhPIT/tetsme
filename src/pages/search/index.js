import React, { useState, useEffect } from "react";
import Header from '@/components/pageHeader/Header'
import Head from "next/head";
import { fetchCategoryData, getStyles, fetchMultiData } from "@/action/action";
import { debounce } from "lodash";
import Autocomplete from "react-google-autocomplete";
import { Parameters } from "@/components/parameters/params";
import renderCategoryComponent from "@/components/categoryComponent/categoryComponent";
import style from "@/pages/search/search.module.css";
import { useRouter } from "next/router";
import { tabs } from "@/components/tabMenu/menu";
import SearchField from "@/components/tattooSearch/index";
import { addAdsToResults } from "@/helpers/helper";



import { useGlobalState } from "@/context/Context";

const Search = ({
    data,
    currentTab,
    pageNo,
    totalItems,
    searchKey,
    selectedStyle,
  }) => {
    const {
      state,
      fetchServerlData,
      updateTab,
      loadMore,
      searchStyle,
      findArtist,
    } = useGlobalState();

   
    useEffect(() => {
        try {
          fetchServerlData({
            data,
            currentTab,
            pageNo,
            totalItems,
            searchKey,
            selectedStyle,
          });
        } catch (error) {
        }
      }, [data]);



  const router = useRouter();


  const handlePlaceSelected = async (place) => {
    const { lat, lng } = place.geometry.location;
    const latitude = lat();
    const longitude = lng();
    findArtist({ latitude, longitude } ,router);
  };


  const collectionLength = state.categoryCollection.filter((e)=>e._index!== 'ad')



  return (

<>

<Header logo={'/tattooSearch.svg'} theme={'white'} isPosition={false} />



    <div className={style.page_search_wrapper}>
      <div className="container">
        <Head>
          <title>Inckd Search Page</title>
          <meta name="description" content="Search Me"></meta>
        </Head>

        <div className={style.filter_container}>
          <div className={style.tattoo_search_wrap}>
            <div className={style.search_form}>
              <div className="search_form_wrap">
                <SearchField />
              </div>
            </div>
          </div>

          <div className={style.main_wrap}>
            {state.currentTab === "artist" && (
              <div className={style.wrapper_block}>
                <img
                  src="/location-small.svg"
                  alt="location"
                  className={style.location_icon}
                />
                <Autocomplete
                  apiKey={process.env.googlePlacesApiKey}
                  onPlaceSelected={handlePlaceSelected}
                />
              </div>
            )}

            <div className={style.wrapper_filter}>
              <img
                src="/setting_tuning.svg"
                alt="location"
                className={style.filter_icon}
              />
              <select
                onChange={(event) => searchStyle(event.target.value ,router)}
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
          </div>
        </div>

        <div>
          <div className={style.tabSection}>
            <ul>
              {tabs.map((tab) => (
                <li
                  key={tab.id}
                  className={
                    state.currentTab === tab.id
                      ? style.activeTab
                      : style.inActivetab
                  }
                  onClick={() => updateTab(tab.id, router, true)}
                >
                  <div className={style.tabBox}>
                    <img
                      src={
                        state.currentTab === tab.id
                          ? tab.activeImage
                          : tab.image
                      }
                    />

                    <p style={{ margin: "0" }}>{tab.label}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {renderCategoryComponent(state.currentTab, state.categoryCollection)}

    


{!state.loading &&

collectionLength.length !== 0 &&
  collectionLength.length !== state.totalItems && (

    <div className={style.grid_more_view}>
              <p>
                See out of {state.categoryCollection.length}/{state.totalItems}
              </p>
              <div className={style.btn_wrapper}>
                <button
                  onClick={() => {
                    loadMore();
                  }}
                  className="btn_primary btn_view_more"
                >
                  Load more
                </button>
              </div>
            </div>
           

 )}






          
      </div>
    </div>
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
          search_key: context.query.term,
          style: context.query.style ?? "",
        });
  
        let addData = await addAdsToResults(results.data);
  
        return {
          props: {
            data: addData,
            currentTab: context.query.category,
            pageNo: 0,
            totalItems: results.totalCount,
            searchKey: context.query.term,
            selectedStyle: context.query.style ?? "",
          },
        };
      } else {
  
       
  
        const data = await fetchCategoryData({
          ...Parameters,
          category: context.query.category,
          style: context.query.style ?? "",
          search_key: context.query.term,
          latitude:context.query.lat ?? "",
          longitude:context.query.lon ?? "",
        });
  
       
        let addData = await addAdsToResults(data.rows.hits);
  
        return {
          props: {
            data: addData,
            currentTab: context.query.category,
            pageNo: 0,
            totalItems: data.rows.total.value,
            searchKey: context.query.term,
            selectedStyle: context.query.style ?? "",
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
  