import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./artistdetail.module.css";
import Header from "@/components/pageHeader/Header";
import Link from "next/link";
import { useRouter } from "next/router";
import Link from "next/link";
import { fetchArtistDetail, artistGallery } from "@/action/action";
import { blurDataURL } from "@/constants/constants";
import SearchField from "@/components/tattooSearch/index";
import Autocomplete from "react-google-autocomplete";
import style from "@/pages/search/search.module.css";
import { useGlobalState } from "@/context/Context";
import { artistTab } from "@/components/tabMenu/menu";
import { renderArtistGallery } from "@/components/customTabs/tab";
import TattooSearchModalPopup from "@/components/modalPopup/TattooSearchModalPopup";

export default function Detail({ data }) {


  const { state, findArtist } = useGlobalState();

  const router = useRouter();

  const [currenState, setCurrentTab] = useState("all");
  const [getAll, setAll] = useState([]);
  const [tattooList, setTattooList] = useState([]);
  const [flashList, setFlashList] = useState([]);
  const [artistProfile, setProfile] = useState();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const changeTab = (tab) => {
    setCurrentTab(tab);
  };
  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  useEffect(() => {
    if (!data) {
      return null;
    } else {
      const fetchData = async () => {
        setProfile(data);
        try {
          const res = await artistGallery(data.profile_uid);
          setAll(res.data);
          setTattooList(res.data.filter((e) => e.tattoo_type === "normal"));
          setFlashList(res.data.filter((e) => e.tattoo_type === "flash"));
        } catch (error) {



        }
      };
      fetchData();
    }
  }, [data]);

  const handlePlaceSelected = async (place) => {
    const { lat, lng } = place.geometry.location;
    const latitude = lat();
    const longitude = lng();

    router.push(`/search?term=${""}&category=${'artist'}&lat=${latitude}&lon=${longitude}`)



  };

  const searchStyle =(searchStyle)=>{
    router.push(`/search?term=${""}&category=${'artist'}&style=${searchStyle}`)
  }
  



  return (
    <>
      <Header logo={"/tattooSearch.svg"} theme={"white"} isPosition={false} />

      <div className="page_wrapper">
        <div className="container">

     
        <Link  href={`/search?term=${""}&category=${"artist"}`} className="back_arrow" >
          <Image
          src={'/back-arrow.svg'}
          alt="backArrow"
          width={40} 
          height={40}
          priority
          />
        </Link>


          <div className={style.filter_container}>
            <div className={style.tattoo_search_wrap}>
              <div className={style.search_form}>
                <div className="search_form_wrap">
                  <SearchField   currentTab={'artist'}  />
                </div>
              </div>
            </div>

            <div className={style.main_wrap}>
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

              <div className={style.wrapper_filter}>
                <img
                  src="/setting_tuning.svg"
                  alt="location"
                  className={style.filter_icon}
                />
                <select
                  onChange={(event) => searchStyle(event.target.value)}
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

          <div className={styles.search_profile_block}>
            <div className={styles.search_profile_pic}>
              <Image
                alt={data.slug}
                priority
                src={data.image}
                width={100}
                height={100}
                placeholder="blur"
                blurDataURL={blurDataURL}
              />
            </div>

            <div className={styles.search_profile}>
              <div className={styles.search_profile_content}>
                <div className={styles.search_profile_name}>
                  {data.first_name} {data.last_name}
                </div>

               <div className={styles.search_profile_details}>

                {data.studio[0].city},{data.studio[0].country}
              </div> 
              </div>
              <div className={styles.search_profile_link}>
                <a
                  onClick={openPopup}
                  target="_blank"
                  className={styles.profile_getin}
                >
                  Get in Touch
                </a>
                <a
                  onClick={openPopup}
                  target="_blank"
                  className={styles.profile_bookmark}
                >
                  <img src="/bookmark-icon.svg" alt="bookmark icon" />
                </a>
                <a
                  onClick={openPopup}
                  target="_blank"
                  className={styles.profile_share}
                >
                  <img src="/share-icon.svg" alt="share icon" />
                </a>
              </div>
            </div>
          </div>

          <div className={style.tabSection}>
            <ul>
              {artistTab.map((tab) => (
                <li
                  key={tab.id}
                  className={
                    currenState === tab.id ? style.activeTab : style.inActivetab
                  }
                  onClick={() => changeTab(tab.id)}
                >
                  <div className={style.tabBox}>
                    <img
                      src={currenState === tab.id ? tab.activeImage : tab.image}
                    />

                    <p style={{ margin: "0" }}>{tab.label}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

         {renderArtistGallery(
            currenState,
            getAll,
            tattooList,
            flashList,
            artistProfile
          )} 
        </div>

        
        <TattooSearchModalPopup
          className="custom-modal"
          isOpen={isPopupOpen}
          closeModal={closePopup}
        />



      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const data = await fetchArtistDetail(context.query.detail);

    
    if (!data.data) {
      return {
        notFound: true,
      };
    }


    return {
      props: {
        data: data.data,
        status: true,
      },
    };
  } catch (error) {
   
    return {
      props: {
        data: null,
        notFound: true,
      },
    };
  }
}
