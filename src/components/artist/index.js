import React from "react";
import Image from "next/image";
import PageLoad from "@/components/pageLoad";
import { useGlobalState } from "@/context/Context";
import styles from "@/components/styles/listing.module.css";
import NoData from '@/components/noDatafound/noData'
import Link from "next/link";
import {blurDataURL} from  '@/constants/constants'

export default function Artist({ data }) {
  const { state } = useGlobalState();

  return (
    <div className={styles.pageContainer}>

{state.loading ? <div className={styles.blockCenter}>  <PageLoad /> </div>  : data.length === 0 ?   <div className={styles.blockCenter}> <NoData/> </div>  :

      <div className={styles.grid_wrapper}>
        
    {
          data.map((item, idx) => {
            const key = item._index === "ad" ? `ad-${idx}` : item._id;
            return item._index === "ad" ? (
             null
            ) : (
                <Link href={`/artist/${item._source.slug}`} className={styles.listing_gridItem } key={key}>                   
                    <div className={styles.grid_item_block}>
                      <div className={styles.grid_img_wrap}>
                        <div className={styles.grid_img_bg}>
                          <div className={styles.grid_img_col}>
                            <Image
                              priority={true}
                              src={item._source.tattoos[0].image}
                              layout="fill"
                              alt={item._source.slug}
                              objectFit="cover"
                              placeholder="blur"
                              blurDataURL={blurDataURL}
                            />
                            </div>
                          </div>
                        </div>
                        <div className={styles.grid_content_wrap}>
                          <div className={styles.grid_img_profile}>
                          <Image
                              priority={true}
                              src={item._source.image_url}
                              layout="fill"
                              alt={item._source.name}
                              objectFit="cover"
                              placeholder="blur"
                              blurDataURL={blurDataURL}
                            />
                          </div>
                          <div className={styles.grid_profile_details}>
                            <h6 className={styles.grid_profile_title}>{item._source.name}</h6>
                            <span className={styles.grid_profile_address}>{item._source.locations[0].city} {item._source.locations[0].country} </span>
                            <div className={styles.grid_profile_link}>
                            <Link href={`/artist/${item._source.slug}`} >
                                <span>Check profile</span>
                              </Link>
                            </div>
                          </div>
                        </div>
                    </div> 
                </Link>
            );
          })
        }
      </div>
}
      </div>
  );
}
