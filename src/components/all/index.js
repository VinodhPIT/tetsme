import React from "react";
import Image from "next/image";
import PageLoad from "@/components/pageLoad";
import { useGlobalState } from "@/context/Context";
import styles from "@/components/styles/search.module.css";

import Link from "next/link";

export default function All({ data }) {
  const { state } = useGlobalState();

  return (
    <div className="pageContainer">
      <div className={styles.gridWrapper}>
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
              <div>
                <div className={styles.gridItem }>
                  <Image
                    priority={true}
                    src={item._index==="tattoo" ? item._source.image : item._source.image_url}
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
    </div>
  );
}
