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
              item.add===1 ?  <div className={styles.spanTwo}><p>Add 1 </p></div> :
              item.add===2  ?  <div className={styles.spanTwo}><p>Add 2 </p></div>  : <div className={styles.spanTwo}><p>Add 3 </p></div>
            ) : (
              <div>
                <div className={styles.listing_gridItem }>
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
              </div>
            );
          })
        )}
      </div>
      <Link
        href={'/tattoodetail'}                         

                          >

                                                     Flash

                          </Link>
    </div>
  );
}
