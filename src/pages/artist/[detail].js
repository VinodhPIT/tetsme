import React,{useState ,useEffect} from "react";
import Image from "next/image";
import styles from "./artistdetail.module.css";

import { useRouter } from "next/router";
import { fetchArtistDetail } from "@/action/action";
import { blurDataURL } from "@/constants/constants";

export default function ArtistDetail({ data }) {


 const [loading, setLoading] = useState(false);
  const [tattoo, setTattoo] = useState([]);


  useEffect(() => {
    if (!data) {
      return null;
    } else {
      const fetchData = async () => {
        setLoading(true);
        try {
          const res = await fetchArtistDetail(data.slug);
          setTattoo(res.data.tattoo);
        } catch (error) {}
        setLoading(false);
      };
      fetchData();
    }
  }, []);











  return (
    <div className="page_wrapper">
      <div className="container">
        <div className={styles.search_profile_block}>
          <div className={styles.search_profile_pic}>
            <Image
              alt={data.slug}
              priority
              src={data.image}
              width={100}
              height={100}
              placeholder="blur"
              blurDataURL={blurDataURL}
            />
          </div>

          <div className={styles.search_profile}>
            <div className={styles.search_profile_content}>
              <div className={styles.search_profile_name}>
                {data.first_name} {data.last_name}
              </div>
              {/* <div className={styles.search_profile_details}>
                
              </div> */}
            </div>
            <div className={styles.search_profile_link}>
              <a href="/" target="_blank" className={styles.profile_getin}>
                Get in Touch
              </a>
              <a href="/" target="_blank" className={styles.profile_bookmark}>
                <img src="/bookmark-icon.svg" alt="bookmark icon" />
              </a>
              <a href="/" target="_blank" className={styles.profile_share}>
                <img src="/share-icon.svg" alt="share icon" />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.product_info_col}>
          <div className={styles.product_style}>
            <span className={styles.product_style_label}>Styles</span>

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
              <span className={styles.product_location_label}>Locations</span>

              {data.studio.length > 0 &&
                data.studio.map((e) => {
                  return (
                    <div className={styles.product_location_list} key={e.id}>
                      <span className={styles.product_loc_title}>
                        <img src="/location-small.svg" alt="Berlin, Germany" />
                        {e.city} {e.country}
                      </span>
                    </div>
                  );
                })}
            </div>
            <div className={styles.product_style}>
              <span className={styles.product_style_label}>Languages</span>
              <ul className={styles.product_style_list}>
                {data.language.map((e) => {
                  return <li key={e.id}>{e.name}</li>;
                })}
              </ul>
            </div>
          </div>

          {/* {loading === true ? null : tattoo && tattoo.length > 0 ? (
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
        ) : null} */}


        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const data = await fetchArtistDetail(context.query.detail);

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
