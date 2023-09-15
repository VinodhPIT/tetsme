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
            <img src="./profile-pic-1.png" alt="profile pic" />
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
                <img src="./bookmark-icon.svg" alt="bookmark icon" />
              </a>
              <a href="/" target="_blank" className={styles.profile_share}>
                <img src="./share-icon.svg" alt="share icon" />
              </a>
            </div>
          </div>          
        </div>
        </div>

    </div>
  )
}











