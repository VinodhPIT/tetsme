import React from "react";
import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import CarouselComponent from "@/components/carousel/Carousel";
import ImageSwiper from "@/components/slider/ImageSwiper";
import ImageSlider from "@/components/slider/ImageSlider";
import {
  APP_LINK_APPLE,
  APP_LINK_GOOGLE,
  blurDataURL,
} from "@/constants/constants";

export default function Dictionary() {
  const [isMobileView, setIsMobileView] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 767.98); // Adjust the breakpoint as needed
      //setCoookieDropdown(window.innerWidth <= 699.98);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const items = [
    {
      image: "./Group 82721.png",
      text: "Learn about greek mythology and find the tattoo with the right meaning for you in the app",
      button1: "Remembrance",
      button2: "Trust",
      heading: "Cancer",
    },
    {
      image: "./Group.svg",
      text: "Learn about greek mythology and find the tattoo with the right meaning for you in the app",
      button1: "Remembrance",
      button2: "Trust",
      heading: "Itzscuintli",
    },
    {
      image: "./Group 82677.svg",
      text: "Learn about greek mythology and find the tattoo with the right meaning for you in the app",
      button1: "Remembrance",
      button2: "Trust",
      heading: "Cancer",
    },
    {
      image: "./Group 82674.svg",
      text: "Learn about greek mythology and find the tattoo with the right meaning for you in the app",
      button1: "Remembrance",
      button2: "Trust",
      heading: "Itzscuintli",
    },
    {
      text: "Learn about greek mythology and find the tattoo with the right meaning for you in the app",
      button1: "Remembrance",
      button2: "Trust",
      heading: "Cancer",
    },
  ];

  // const data = await getData()

  return (
    <div className="page_wrapper">
      <section className="img_text_banner_box">
        <div className="col_full">
          <div className="img_text_box_wrapper">
            <div className="text_box_wrap right block_bg_black full_banner_custom_slider">
              <div className="container">
                <div className="img_text_box_inner">
                  <div className="text_box_content justify_content_start pl_0 pr_2_pc m_text_center m_pb_0">
                    <div className="text_box_content_inner m_pr_0">
                      <h2 className="letter_spacing_05">Tattoo Dictonary</h2>
                      <p>
                        We hand-pick every tattoo artist to ensure your tattoo
                        experience is handled with care, quality and
                        inclusivity.
                      </p>
                      <a href="#" className="btn btn_default btn_xxl btn_sm_m">
                        Find artists
                        <img
                          src="./alt-arrow-right-black.svg"
                          alt=""
                          className="ml-8 mt-2"
                        />
                      </a>
                    </div>
                  </div>
                  <div className="img_box_wrap custom_slick_slider_one">
                    <ImageSwiper
                    imgHeight="450px" imgWidth="400px"
                    ></ImageSwiper>
                  </div>
                </div>
              </div>
            </div>

            <div className="text_box_wrap full-block-wrap block_bg_yellow_500">
              <div className="img_text_box_inner">
                <div className="justify_content_start container w_100pc">
                  <div className="text_box_find_tattoo">
                    <div className="keywords_wrap">
                      <ul className="keywords_list">
                        <li>Remembrance</li>
                        <li>Trust</li>
                        <li>Remembrance</li>
                        <li>Explore 500+ more emotions...</li>
                      </ul>
                    </div>
                    <div className="find_tattoo_wrap">
                      <div className="find_tattoo_left">
                        <h3>Find your Tattoo based on Emotions</h3>
                      </div>
                      <div className="find_tattoo_right">
                        <ul className="download_app">
                          <li>
                            <a
                              target="_blank"
                              href="https://apps.apple.com/us/app/inckd/id1526690381"
                            >
                              <img src="./app-store.svg" alt="apple store" />
                            </a>
                          </li>
                          <li>
                            <a
                              target="_blank"
                              href="https://play.google.com/store/apps/details?id=com.inckd.tattoo"
                            >
                              <img src="./g-play.svg" alt="google play" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text_box_wrap left">
              <div className="img_text_box_inner">
                <div className="img_box_wrap block_bg_gradient_1">
                  <div className="box_text_img_over custom_spc_left_d_590 color_white">
                    <h2 className="txt_mob_fs50 custom_spc_left_d_430 list_inline_item">
                      Zodiac <span>Signs</span>
                    </h2>
                    <p className="custom_fs_22 custom_fs_m_16 md_max_75 max_m_w_100pc list_inline_item">
                      Learn more about greek mythology and find the tattoo with
                      the right meaning for you in the app
                    </p>
                  </div>
                  <img src="./mythology.png" alt="" />
                </div>
                <div className="text_box_content justify_content_start">
                  <div className="text_box_content_inner custom_carousel_wrap">
                    {/* 
                       <CarouselComponent items={items} />            */}
                    <CarouselComponent items={items} itemStyle="d_flex justify_content_end" />
                  </div>
                </div>
              </div>
            </div>

            <div className="text_box_wrap left app_download_box_wrap mb_0 block_bg_yellow_500 dictionary_app">
              <div className="img_text_box_inner">
                {!isMobileView ? (
                  <div className="img_box_wrap">
                    <ul className="app_download_img_list mt_mb_6pc after_none justify_content_right text_center mr_0">
                      <li>
                        <Image
                          priority={true}
                          src="/iPhone-192.png"
                          width={215}
                          height={443}
                          alt="Picture of the author"
                          placeholder="blur"
                          blurDataURL={blurDataURL}
                          layout="responsive"
                          className="image_shadow_bg"
                        />
                      </li>
                      <li>
                        <Image
                          priority={true}
                          src="/iPhone-192.png"
                          width={215}
                          height={443}
                          alt="Picture of the author"
                          placeholder="blur"
                          blurDataURL={blurDataURL}
                          className="image_shadow_bg"
                          layout="responsive"
                        />
                      </li>
                    </ul>
                  </div>
                ) : (
                  ""
                )}
               

                <div class="text_box_content justify_content_start">
                  <div class="text_box_content_inner w_100pc pr_0 dictionary_explore">
                    <ul class="download_app ml_0 w_100pc max_w_100pc m_pb_50 text_left">
                      <li class="download_app_title">
                        <h6>Explore more in the App</h6>
                        <p>
                          Learn more about greek mythology and find the tattoo
                          with the right meaning for you in the app...
                        </p>
                      </li>
                      <li>
                        <Link href={APP_LINK_APPLE} target="_blank">
                          <img src="./app-store.svg" alt="" />
                        </Link>
                      </li>
                      <li>
                        <Link href={APP_LINK_GOOGLE} target="_blank">
                          <img src="./g-play.svg" alt="" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="img_box_wrap">
                {isMobileView ? (
                  <ImageSlider
                    imgPath="/iPhone-192.png"
                    imgAlt="Picture of the author"
                    imgblurDataURL={blurDataURL}
                    imgWidth={215}
                    imgHeight={443}
                  ></ImageSlider>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div class="text_box_wrap right">
              <div class="img_text_box_inner m_switcher">
                <div class="text_box_content justify_content_start">
                  <div class="text_box_content_inner custom_carousel_wrap">
                    {/* <img src="./slider-dummy-2.png" alt="Zodiac Signs" class="w_100pc"/>                      */}

                    <CarouselComponent items={items} itemStyle="d_flex justify_content_start m_justify_content_right" />
                  </div>
                </div>
                <div class="img_box_wrap block_bg_gradient_2 justify_content_right">
                  <div class="box_text_img_over color_white text_right justify_content_right m_justify_content_left m_text_left">
                    <h2 class="txt_mob_fs50 custom_spc_right_d_430 list_inline_item">
                      Greek <span>Mythology</span>
                    </h2>
                    <p class="custom_fs_22 custom_fs_m_16 md_max_75 max_m_w_100pc list_inline_item">
                      Learn more about greek mythology and find the tattoo with
                      the right meaning for you in the app
                    </p>
                  </div>
                  <img src="./mythology.png" alt="Greek Mythology" />
                </div>
              </div>
            </div>

            <div class="text_box_wrap full-block-wrap block_bg_yellow_500">
              <div class="img_text_box_inner">
                <div class="justify_content_start container w_100pc">
                  <div class="text_box_find_tattoo">
                    <div class="keywords_wrap">
                      <ul class="keywords_list">
                        <li>Remembrance</li>
                        <li>Trust</li>
                        <li>Remembrance</li>
                        <li>Explore 500+ more emotions...</li>
                      </ul>
                    </div>
                    <div class="find_tattoo_wrap">
                      <div class="find_tattoo_left">
                        <h3>Find your Tattoo based on Emotions</h3>
                      </div>
                      <div class="find_tattoo_right">
                        <ul class="download_app">
                          <li>
                            <a
                              target="_blank"
                              href="https://apps.apple.com/us/app/inckd/id1526690381"
                            >
                              <img src="./app-store.svg" alt="apple store" />
                            </a>
                          </li>
                          <li>
                            <a
                              target="_blank"
                              href="https://play.google.com/store/apps/details?id=com.inckd.tattoo"
                            >
                              <img src="./g-play.svg" alt="google play" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="text_box_wrap left">
              <div class="img_text_box_inner">
                <div class="img_box_wrap block_bg_gradient_1">
                  <div class="box_text_img_over color_white">
                    <h2 class="txt_mob_fs50 custom_spc_left_d_430 list_inline_item">
                      Aztec <span>Symbols</span>
                    </h2>
                    <p class="custom_fs_22 custom_fs_m_16 md_max_75 max_m_w_100pc list_inline_item">
                      Learn more about greek mythology and find the tattoo with
                      the right meaning for you in the app
                    </p>
                  </div>
                  <img src="./aztec-symbols.png" alt="" />
                </div>
                <div class="text_box_content justify_content_start">
                  <div class="text_box_content_inner custom_carousel_wrap">
                    <CarouselComponent items={items} itemStyle="d_flex justify_content_end" />
                    {/* <img src="./slider-dummy-2.png" alt="Aztec Symbols" class="w_100pc"/>                      */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    
  );
}
