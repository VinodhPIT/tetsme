import React, { useState, useEffect } from "react";
import Header from '@/components/pageHeader/Header'

import Head from "next/head";
import { fetchCategoryData, getStyles, fetchMultiData } from "@/action/action";
import { debounce } from "lodash";
import Autocomplete from "react-google-autocomplete";
import { Parameters} from "@/components/parameters/params";
import { tabs} from "@/components/tabMenu/menu";
import renderCategoryComponent from "@/components/categoryComponent/categoryComponent";
import style from "@/pages/search/search.module.css";
import { useRouter } from "next/router";
import SearchField from "@/components/searchField/index";

import { addAdsToResults } from "@/helpers/helper";
import styles from "./search.module.css";

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

  const [stylsse, setStyle] = useState([]);

  const router = useRouter();

  async function fetchStyles() {
    try {
      const newData = await getStyles();
      setStyle(newData.rows.hits);
    } catch (error) {
    }
  }
  useEffect(() => {
    fetchStyles();
  }, []);

  const handlePlaceSelected = async (place ,router) => {
    const { lat, lng } = place.geometry.location;
    const latitude = lat();
    const longitude = lng();
    findArtist({ latitude, longitude ,router });


  };

const collectionLength = state.categoryCollection.filter((e)=>e._index!== 'ad')





  return (

<>




<Head>
          <title>Inckd Search Page</title>
          <meta name="description" content="Search Me"></meta>
        </Head>

<Header logo={'/tattooSearch.svg'} theme={'white'} isPosition={false} />

    <div className={style.page_search_wrapper}>
      <div className="container">
        <div className={style.filter_container}>
          <div className={style.wrapper1}>
            <div className="search_form">
              <div className="search_form_wrap">
                <SearchField />
              </div>
            </div>
          </div>

          {state.currentTab === "artist" && (
            <div className={style.wrapper2}>
              <Autocomplete
                apiKey={process.env.googlePlacesApiKey}
                onPlaceSelected={handlePlaceSelected}
              />
            </div>
          )}

          <div className={style.wrapper3}>
            <select
              onChange={(event) => searchStyle(event.target.value, router)}
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
            <div className={styles.grid_more_view}>
              <p>
                See out of {collectionLength.length}/{state.totalItems}
              </p>
              <div className={styles.btn_wrapper}>
                <button
                  onClick={() => {
                    loadMore();
                  }}
                  className="btn_secondary btn_view_more"
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
