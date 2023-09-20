import React from "react";
import styles from "@/pages/tattoo/tattoodetail.module.css";
import Link from "next/link";
import Image from "next/image";
import { blurDataURL } from "@/constants/constants";
import NoData from '@/components/noDatafound/noData'
import style from "@/components/styles/listing.module.css";


const Tattoo = ({ data }) => {
  return (
    <div>
      {data.length == 0 ? <div className={style.blockCenter}>   <NoData/>  </div>:
      
        <div className={styles.grid_wrapper_tattoo}>
          {data.map((item) => (
            <Link
              href={`/tattoo/${item.tattoo_uid}`}
              className={styles.listing_gridItem}
              key={item.tattoo_uid}
            >
              <Image
                alt={item.tattoo_type}
                priority
                src={item.image}
                layout="fill"
                objectFit="cover"
                placeholder="blur"
                blurDataURL={blurDataURL}
              />
            </Link>
          ))}
        </div>
}
    </div>
  );
};

export default Tattoo;
