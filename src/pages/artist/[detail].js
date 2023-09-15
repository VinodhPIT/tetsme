import React from 'react'
import Image from "next/image";
import styles from "./artistdetail.module.css";
import { useRouter } from 'next/router';


export default function ArtistDetail({param}) {

    const router = useRouter();
    console.log( router.query.detail) // Access the dynamic parameter from the URL


  return (
    <div className="page_wrapper">
      <div className="container">
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


        <div className={styles.product_info_col}>   
          <div className={styles.product_style}>            
            <span className={styles.product_style_label}>Styles</span>
            <ul className={styles.product_style_list}>
              <li><a href="#">Abstract Realism <img src="/arrow-right-gray.svg" alt="Abstract Realism" /></a></li>
              <li><a href="#">Fineline <img src="/arrow-right-gray.svg" alt="Fineline" /></a></li>
              <li><a href="#">Geometric <img src="/arrow-right-gray.svg" alt="Geometric" /></a></li>
              <li><a href="#">Black work <img src="/arrow-right-gray.svg" alt="Black work" /></a></li>
            </ul>         
          </div>

          <div className={styles.product_info_wrap}>
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
            <div className={styles.product_style}>            
              <span className={styles.product_style_label}>Languages</span>
              <ul className={styles.product_style_list}>
                <li><a href="#">French</a></li>
                <li><a href="#">German</a></li>
                <li><a href="#">English</a></li>
              </ul>         
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}











