import React from "react";
import Image from "next/image";
import PageLoad from "@/components/pageLoad";
import { useGlobalState } from "@/context/Context";
import styles from "@/components/styles/listing.module.css";

import Link from "next/link";

export default function Flash({ data }) {
  const { state } = useGlobalState();

  return (
    <div className="pageContainer">
      <div className={styles.grid_wrapper_tattoo}>
        {state.loading ? (
          <PageLoad />
        ) : data.length === 0 ? (
          <h4>No Data Found</h4>
        ) : (
          data.map((item, idx) => {
            const key = item._index === "ad" ? `ad-${idx}` : item._id;

            // const gridItemClass =
            //   item._index === "ad" ? styles.gridItem : styles.spanTwo;

            return item._index === "ad" ? (
              item.add===1 ?  <div className={styles.custom_adv_block_1}><div className={styles.custom_adv_wrap}><div className={styles.custom_adv_content}><h6>Find your<br/>Artist now!</h6><span className={styles.adv_btn_wrap}><a href="#" className={styles.btn_secondary}>View Artists</a></span><img src="./pexels-cottonbro-studio-5320059-3.png" alt="View Artists" /></div></div></div> :
              item.add===2  ?  <div className={styles.custom_adv_block_2}><div className={styles.custom_adv_wrap}><div className={styles.custom_adv_content}><img src="./klarna-b-19.svg" alt="Tattoo now Pay later" className={styles.adv_klarna}/><h6>Tattoo now.<br/>Pay later.</h6>
              <span className={styles.adv_btn_wrap}><img src="./pngwing-39.png" alt="Tattoo now Pay later" className={styles.adv_img_app}/><img src="./pngwing-40.png" alt="Tattoo now Pay later" className={styles.adv_img_app}/></span><img src="./shutterstock_2068639577.png" alt="Tattoo now Pay later" /></div></div></div>  : 
              <div className={styles.custom_adv_block_3}><div className={styles.custom_adv_wrap}><div className={styles.custom_adv_content}><h6>Get exciting offers!</h6><span className={styles.adv_price}>CHF 30</span><p>off on your next tattoo</p><span className={styles.adv_btn_wrap}><a href="#" className={styles.btn_secondary}>Refer and Earn</a></span><img src="./shutterstock_2068639577-1.png" alt="Tattoo now Pay later" /></div></div></div>
            ) : (
              <div className={styles.listing_gridItem }>
                <Image
                  priority={true}
                  src={item._source.image}
                  layout="fill"
                  alt={item._source.tags}
                  objectFit="cover"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcLPW/CQAFZAJAYAMfpQAAAABJRU5ErkJggg=="
                />
              </div>
            );
          })
        )}
      </div>
      
    </div>
  );
}
