import React from "react";
import Image from "next/image";
import PageLoad from "@/components/pageLoad";
import { useGlobalState } from "@/context/Context";
import styles from "@/components/styles/listing.module.css";

import Link from "next/link";

export default function Artist({ data }) {
  const { state } = useGlobalState();

  return (
      <div className={styles.grid_wrapper}>
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
              <div className={styles.spanTwo}></div>
            ) : (
                <div className={styles.listing_gridItem }>                   
                    <div className={styles.grid_item_block}>
                      <div className={styles.grid_img_wrap}>
                        <div className={styles.grid_img_bg}>
                          <div className={styles.grid_img_col}>
                            <Image
                              priority={true}
                              src={item._source.image_url}
                              layout="fill"
                              alt={item.artist_name}
                              objectFit="cover"
                              placeholder="blur"
                              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcLPW/CQAFZAJAYAMfpQAAAABJRU5ErkJggg=="
                            />
                            </div>
                          </div>
                        </div>
                        <div className={styles.grid_content_wrap}>
                          <div className={styles.grid_img_profile}>
                            <Image
                              priority={true}
                              src={item._source.image}
                              layout="fill"
                              alt={item.artist_name}
                              objectFit="cover"
                              placeholder="blur"
                              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcLPW/CQAFZAJAYAMfpQAAAABJRU5ErkJggg=="
                            />
                          </div>
                          <div className={styles.grid_profile_details}>
                            <h6 className={styles.grid_profile_title}>Paul samuel</h6>
                            <span className={styles.grid_profile_address}>Zurich, Switzerland</span>
                            <div className={styles.grid_profile_link}>
                              <a href="#">
                                <span>Check profile</span>
                              </a>
                            </div>
                          </div>
                        </div>
                    </div> 
                </div>
            );
          })
        )}
      </div>
  );
}
