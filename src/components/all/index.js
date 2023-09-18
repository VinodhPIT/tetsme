import React from "react";
import Image from "next/image";
import PageLoad from "@/components/pageLoad";
import { useGlobalState } from "@/context/Context";
import styles from "@/components/styles/listing.module.css";
import NoData from '@/components/noDatafound/noData'
import {blurDataURL} from '@/constants/constants'


export default function All({ data }) {
  const { state } = useGlobalState();

  return (
    <div className={styles.pageContainer}>
      {state.loading ? <div className={styles.blockCenter}>  <PageLoad /> </div>  : data.length === 0 ?   <div className={styles.blockCenter}> <NoData/> </div>  :

      <div className={styles.grid_wrapper_tattoo}>


          {data.map((item, idx) => {
            const key = item._index === "ad" ? `ad-${idx}` : item._id;
           
            return item._index === "ad" ? (
              item.add===1 ?  <div className={styles.custom_adv_block_1}><div className={styles.custom_adv_wrap}><div className={styles.custom_adv_content}><h6>Find your<br/>Artist now!</h6><span className={styles.adv_btn_wrap}><a href="#" className={styles.btn_secondary}>View Artists</a></span><img src="./pexels-cottonbro-studio-5320059-3.png" alt="View Artists" /></div></div></div> :
              item.add===2  ?  <div className={styles.custom_adv_block_2}><div className={styles.custom_adv_wrap}><div className={styles.custom_adv_content}><img src="./klarna-b-19.svg" alt="Tattoo now Pay later" className={styles.adv_klarna}/><h6>Tattoo now.<br/>Pay later.</h6>
              <span className={styles.adv_btn_wrap}><img src="./pngwing-39.png" alt="Tattoo now Pay later" className={styles.adv_img_app}/><img src="./pngwing-40.png" alt="Tattoo now Pay later" className={styles.adv_img_app}/></span><img src="./shutterstock_2068639577.png" alt="Tattoo now Pay later" /></div></div></div>  : 
              <div className={styles.custom_adv_block_3}><div className={styles.custom_adv_wrap}><div className={styles.custom_adv_content}><h6>Get exciting offers!</h6><span className={styles.adv_price}>CHF 30</span><p>off on your next tattoo</p><span className={styles.adv_btn_wrap}><a href="#" className={styles.btn_secondary}>Refer and Earn</a></span><img src="./shutterstock_2068639577-1.png" alt="Tattoo now Pay later" /></div></div></div>
            ) : (
              <div className={styles.listing_gridItem } key={key}>
                <Image
                  priority={true}
                  src={ item._index ==="tattoo" ?  item._source.image : item._source.image_url}
                  layout="fill"
                  alt={item._index ==="tattoo" ?  item._source.style._source.name : item._source.slug}
                  objectFit="cover"
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                />
              </div>
            );
          })
        }
     </div>
}
    </div>
  );
}
