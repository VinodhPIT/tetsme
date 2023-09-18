import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/pages/tattoo/tattoodetail.module.css";
import { fetchTattooDetail } from "@/action/action";
import PageLoad from "@/components/pageLoad";
import {
  APP_LINK_APPLE,
  APP_LINK_GOOGLE,
  blurDataURL,
} from "@/constants/constants";
import { fetchArtistDetail } from "@/action/action";
import Link from "next/link";

export default function Flash({ data, status }) {
 
  const [loading, setLoading] = useState(false);
  const [tattoo, setTattoo] = useState([]);
  const [getStyle, setStyle] = useState([]);
  const [location, setLocation] = useState([]);

  useEffect(() => {
    if (!data) {
      return null;
    } else {
      const fetchData = async () => {
        setLoading(true);
        try {
          const res = await fetchArtistDetail(data.artist.slug);
          setTattoo(res.data.tattoo);
          setStyle(res.data.style);
          setLocation(res.data.studio);
        } catch (error) {}
        setLoading(false);
      };
      fetchData();
    }
  }, []);

  if (!data) {
    return null;
  }

  return (
    <div className="page_wrapper">
      <div className="container">
        <div className={styles.product_detail_wrap}>
          <div className={styles.product_media}>
            <Image
             alt={data.style.name}
              priority
              src={data.tattoo.image}
              layout="fill"
              objectFit="cover"
              placeholder="blur"
              blurDataURL={blurDataURL}
            />
          </div>

          <div className={styles.product_info_col}>
            <div className={styles.search_profile_block}>
              <div className={styles.search_profile_pic}>
                <Image
                  alt={"data.tattoo.image"}
                  priority
                  src={data.artist.profile_image}
                  width={100}
                  height={100}
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                />
              </div>
              <div className={styles.search_profile}>
                <div className={styles.search_profile_content}>
                  <div className={styles.search_profile_name}>
                    {data.artist.artist_name}
                  </div>
                  {/* <div className={styles.search_profile_details}>
                   dd Switzerland, Germany
                  </div> */}
                </div>
                <div className={styles.search_profile_link}>
                  <Link href="/contactus" className={styles.profile_getin}>
                    Get in Touch
                  </Link>
                  <a
                    href="/"
                    target="_blank"
                    className={styles.profile_bookmark}
                  >
                    <img src="/bookmark-icon.svg" alt="bookmark icon" />
                  </a>
                  <a href="/" target="_blank" className={styles.profile_share}>
                    <img src="/share-icon.svg" alt="share icon" />
                  </a>
                </div>
              </div>
            </div>

            <div className={styles.product_style}>
              <span className={styles.product_style_label}>
                Image tattoo style
              </span>

              {getStyle.length > 0 && (
                <ul className={styles.product_style_list}>
                  {getStyle.map((e) => {
                    return <li key={e.id}>{e.name}</li>;
                  })}
                </ul>
              )}
            </div>

            <div className={styles.product_detail_location}>
              <span className={styles.product_location_label}>Locations</span>
              <div className={styles.product_location_list}>
                {location.length > 0 &&
                  location.map((el) => {
                 return   <span className={styles.product_loc_title} key={el.studio_uid}>
                      <img src="/location-small.svg" alt="Berlin, Germany" />
                    {el.city} {el.country}
                    </span>;
                  })}
              </div>
            </div>

            <div className={styles.product_price_block}>
              <div className={styles.product_price_wrap}>



              {data.tattoo.max_price !== null && data.tattoo.min_price !== null ? (
  <div>
    <span className={styles.product_price_label}>Fixed price</span>
    <span className={styles.product_price_value}>{data.tattoo.max_price}</span>
    <span className={styles.product_price_to}>to</span>
    <span className={styles.product_price_value}>{data.tattoo.min_price}</span>
  </div>
) : (
  <div>
    <span className={styles.product_price_label}>This Flash doesn&apos;t have a price</span>
  </div>
)}

             


              </div>
            </div>
            <ul className={styles.download_app}>
              <li className={styles.download_app_title}>
                <h6>Download our app from</h6>
              </li>
              <li>
                <Link target="_blank" href={APP_LINK_APPLE}>
                  <img src="/app-store.svg" alt="app store" />
                </Link>
              </li>
              <li>
                <Link target="_blank" href={APP_LINK_GOOGLE}>
                  <img src="/g-play.svg" alt="g play" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {loading === true ? null : tattoo && tattoo.length > 0 ? (
          <div className={styles.grid_wrapper_tattoo}>
            {tattoo.map((item) => (
              <div className={styles.listing_gridItem} key={item.tattoo_uid}>
                <Image
                  alt={item.style_name}
                  priority
                  src={item.tattoo_image}
                  layout="fill"
                  objectFit="cover"
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const data = await fetchTattooDetail(context.query.detail);

    if (!data.data) {
      return {
        props: {
          data: null,
        },
      };
    }

    return {
      props: {
        data: data.data,
        status: true,
      },
    };
  } catch (error) {
    console.log(error, "error");
    return {
      props: {
        data: null,
      },
    };
  }
}
