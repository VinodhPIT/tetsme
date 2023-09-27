import React from 'react'
import styles from "@/pages/artist/artistdetail.module.css";


const ArtistInfo = ({data}) => {
  return (
    <div className={styles.galleryWrapper} >
      <div className={styles.product_info_col}>
            <div className={styles.product_style}>
             {data.style.length > 0 &&  <span className={styles.product_style_label}>Styles</span>}
                <ul className={styles.product_style_list}>
                {data.style.length > 0 &&
                  data.style.map((e) => {
                    return (
                      <li key={e.id}>
                        <a href="#" disabled>
                          {e.name}
                          <img
                            src="/arrow-right-gray.svg"
                            alt="Abstract Realism"
                          />
                        </a>
                      </li>
                    );
                  })}
              </ul>
            </div>

            <div className={styles.product_info_wrap}>
              <div className={styles.product_detail_location}>
              {data.studio.length > 0 && <span className={styles.product_location_label}>Locations</span>}

                {data.studio.length > 0 &&
                  data.studio.map((e) => {
                    return (
                      <div className={styles.product_location_list} key={e.id} >
                        <span className={styles.product_loc_title}>
                          <img
                            src="/location-small.svg"
                            alt="Berlin, Germany"
                          />
                          {e.city}, {e.country}
                        </span>
                      </div>
                    );
                  })}
              </div>
              <div className={styles.product_style}>
              {data.language.length > 0 &&  <span className={styles.product_style_label}>Languages</span>}
                <ul className={styles.product_style_list}>
                {data.language.length > 0 &&
                  data.language.map((e) => {
                    return <li key={e.id}>{e.name}</li>;
                  })}

                </ul>
              </div>
            </div>

            
          
          </div>
    </div>
  )
}

export default ArtistInfo
