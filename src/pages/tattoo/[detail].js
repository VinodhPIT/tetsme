import React from 'react'
import { useRouter } from 'next/router';
import Image from "next/image";
import styles from "./tattoodetail.module.css";
import {fetchTattooDetail} from '@/action/action'
import PageLoad from '@/components/pageLoad'
import {blurDataURL} from '@/constants/constants'
import { useGlobalState } from "@/context/Context";
export default function Deatil({param}) {
    const { state } = useGlobalState();
    const router = useRouter();
    console.log( router.query.detail) // Access the dynamic parameter from the URL

    

  return (
    <div className="page_wrapper">
      <div className="container">

        <div className={styles.product_detail_wrap}>
          <div className={styles.product_media}>
            <img src="/277661704_360257239356994_7406911752208065568_n-560.png" alt="Image tattoo style"/> 
          </div>

          <div className={styles.product_info_col}>

            <div className={styles.search_profile_block}>
              <div className={styles.search_profile_pic}>
                <img src="/profile-pic-1.png" alt="profile pic" />
              </div> 
              <div className={styles.search_profile}>            
                <div className={styles.search_profile_content}>
                  <div className={styles.search_profile_name}>
                    John doe Sebastian
                  </div>
                  <div className={styles.search_profile_details}>
                  Switzerland, Germany
                </div>                 
                </div>
                <div className={styles.search_profile_link}>
                  <a href="/" target="_blank" className={styles.profile_getin}>
                    Get in Touch
                  </a>            
                  <a href="/" target="_blank" className={styles.profile_bookmark}>              
                    <img src="/bookmark-icon.svg" alt="bookmark icon" />
                  </a>
                  <a href="/" target="_blank" className={styles.profile_share}>
                    <img src="/share-icon.svg" alt="share icon" />
                  </a>
                </div>
              </div>          
            </div>

            <div className={styles.product_style}>            
              <span className={styles.product_style_label}>Image tattoo style</span>
              <ul className={styles.product_style_list}>
                <li>Abstract Realism</li>
              </ul>         
            </div>

            <div className={styles.product_detail_location}>
              <span className={styles.product_location_label}>Locations</span>
              <div className={styles.product_location_list}>
                <span className={styles.product_loc_title}>
                <img src="/location-small.svg" alt="Berlin, Germany" />Berlin, Germany</span>
              </div>
              <div className={styles.product_location_list}>
                <span className={styles.product_loc_title}>
                <img src="/location-small.svg" alt="Zurich, Switzerland" />Zurich, Switzerland</span>
              </div>
              <div className={styles.product_location_list}>
                <span className={styles.product_loc_title}>
                <img src="/location-small.svg" alt="Paris, France" />Paris, France</span>
              </div>  
            </div>

            <div className={styles.product_price_block}>
              <div className={styles.product_price_wrap}>
                <span className={styles.product_price_label}>Fixed price</span>                
                <span className={styles.product_price_value}>CHF 200</span>
                <span className={styles.product_price_to}>to</span>
                <span className={styles.product_price_value}>CHF 400</span>
              </div>
            </div>
            <ul className={styles.download_app}>
              <li className={styles.download_app_title}>
                <h6>Download our app from</h6>
              </li>
              <li>
                <a target="_blank" href="https://apps.apple.com/us/app/inckd/id1526690381">
                  <img src="/app-store.svg" alt="app store" />
                </a>
              </li>
              <li>
                <a target="_blank" href="https://play.google.com/store/apps/details?id=com.inckd.tattoo">
                  <img src="/g-play.svg" alt="g play" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.product_related_artist}>
          <span>Related images updated by this artist</span>
        </div>
        
        <div className={styles.grid_wrapper_tattoo}>       
          <div className={styles.listing_gridItem }>
            <Image
              priority={true}
              src="/277661704_360257239356994_7406911752208065568_n-560.png"
              layout="fill"              
              objectFit="cover"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcLPW/CQAFZAJAYAMfpQAAAABJRU5ErkJggg=="              
            />
          </div>
          <div className={styles.listing_gridItem }>
            <Image
              priority={true}
              src="/277661704_360257239356994_7406911752208065568_n-560.png"
              layout="fill"              
              objectFit="cover"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcLPW/CQAFZAJAYAMfpQAAAABJRU5ErkJggg=="              
            />
          </div>   
          <div className={styles.listing_gridItem }>
            <Image
              priority={true}
              src="/277661704_360257239356994_7406911752208065568_n-560.png"
              layout="fill"              
              objectFit="cover"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcLPW/CQAFZAJAYAMfpQAAAABJRU5ErkJggg=="              
            />
          </div>   
          <div className={styles.listing_gridItem }>
            <Image
              priority={true}
              src="/277661704_360257239356994_7406911752208065568_n-560.png"
              layout="fill"              
              objectFit="cover"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcLPW/CQAFZAJAYAMfpQAAAABJRU5ErkJggg=="              
            />
          </div>   
          <div className={styles.listing_gridItem }>
            <Image
              priority={true}
              src="/277661704_360257239356994_7406911752208065568_n-560.png"
              layout="fill"              
              objectFit="cover"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcLPW/CQAFZAJAYAMfpQAAAABJRU5ErkJggg=="              
            />
          </div>   
          <div className={styles.listing_gridItem }>
            <Image
              priority={true}
              src="/277661704_360257239356994_7406911752208065568_n-560.png"
              layout="fill"              
              objectFit="cover"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcLPW/CQAFZAJAYAMfpQAAAABJRU5ErkJggg=="              
            />
          </div>   
      </div>


        





        
      </div>
    </div>
  )
}






export async function getServerSideProps(context) {
  try {
      const data = await fetchTattooDetail(context.query.detail);
      console.log(data,"clmd;mcld")
      return {
        props: {
          data,
        },
      };
    
  } catch (error) {
    console.log(error,"error")
    return {
      props: {
        data: null,
      },
    };
  }
}