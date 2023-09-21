//

import React ,{ useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import styles from "./custom.module.css";
import {
  APP_LINK_APPLE,
  APP_LINK_GOOGLE,
  blurDataURL,
} from "@/constants/constants";
import CarouselKlarna from "@/components/carousel/CarouselKlarna";
import ImageSlider from "@/components/slider/ImageSlider";



export default function Klarna() {
  const [isMobileView, setIsMobileView] = useState(false);


  const [cookieDropdown, setCoookieDropdown] = useState(false);


  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 767.98); // Adjust the breakpoint as needed
      setCoookieDropdown(window.innerWidth <= 699.98);
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
      image: "./paylater_bg.svg",
      text: "Tattoo now and pay up to 30 days later. No interest. No fees, when you pay on time.",
      option1: "Option 1",
      heading: "Pay Later",
    },
    {
      image: "./Group.svg",
      text: "Tattoo now and pay up to 30 days later. No interest. No fees, when you pay on time.",
      option1: "Option 2",
      heading: "Pay Later 2",
    },
    {
      image: "./Group 82677.svg",
      text: "Tattoo now and pay up to 30 days later. No interest. No fees, when you pay on time.",
      option1: "Option 3",
      heading: "Pay Later 3",
    },
    {
      image: "./Group 82674.svg",
      text: "Tattoo now and pay up to 30 days later. No interest. No fees, when you pay on time.",
      option1: "Option 4",
      heading: "Pay Later 4",
    },
    {
      text: "Learn about greek mythology and find the tattoo with the right meaning for you in the app",
      option1: "Wake",
      heading: "Itzscuintli",
    },
  ];
  return (
    <div className="page-wrapper">
      <div className={styles.banner_block}>
        <div className={styles.banner_wrap}>
          <div className={styles.banner_item}>
            <div className={styles.banner}>
              <div className={styles.banner_inner}>
                <img
                  src="./pexels-cottonbro-studio-5320148-14-klarna.png"
                  alt="Boost your business with inckd"
                />
              </div>
            </div>
            <div className={styles.banner_content}>
              <div className={styles.banner_content_wrap_klarna}>
                <div className={styles.banner_caption}>
                  <Image
                    src="/Klarna-logotype(white.svg)-19.svg"
                    alt="klarna-logo"
                    width={186}
                    height={41}
                    priority
                  />

                  <h1 class="color_pink">
                    <span>
                      Tattoo now, <br />
                      Pay later
                    </span>
                  </h1>
                  <p>
                    Grow your tattoo business by fulfilling your customers
                    tattoo vision and offering them flexible payment options.
                  </p>
                </div>
                <ul className={styles.download_app}>
                  <li className={styles.download_app_title}>
                    <h6>Download our app from</h6>
                  </li>
                  <li>
                    <Link href={APP_LINK_APPLE} target="_blank">
                      <img src="./app-store.svg" alt="apple store" />
                    </Link>
                  </li>
                  <li>
                    <Link href={APP_LINK_GOOGLE} target="_blank">
                      <img src="./g-play.svg" alt="google play" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="img_text_banner_box">
        <div className="col_full">
          <div className="img_text_box_wrapper klarna_wrap">
            <div class="text_box_wrap right">
              <div class="img_text_box_inner">
                <div class="text_box_content justify_content_start">
                  <div class="text_box_content_inner max_w_100pc m_pr_0">
                    <h2 class="letter_spacing_03 color_gray_550">How it Works!</h2>
                    <ul class="custom-listing how_work_list">
                      <li>
                        <img
                          src="./download.svg"
                          alt="Download the inckd. App"
                        />
                        <span>Download the inckd. App</span>
                      </li>
                      <li>
                        <img
                          src="./bookmark-square-minimalistic.svg"
                          alt="Accept an offer from your favourite artist."
                        />
                        <span>
                          Accept an offer from your <br />
                          favourite artist.
                        </span>
                      </li>
                      <li>
                        <img
                          src="./klarna-icon-black.svg"
                          alt="Select Klarna as payment option."
                        />
                        <span>Select Klarna as payment option.</span>
                      </li>
                      <li>
                        <img
                          src="./heart-icon-black.svg"
                          alt="Get your tattoo done."
                        />
                        <span>Get your tattoo done.</span>
                      </li>
                      <li>
                        <img
                          src="./money-bag.svg"
                          alt="Pay later or in instalments."
                        />
                        <span>Pay later or in instalments.</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="img_box_wrap block_bg_orange justify_content_center">
                  <div class="bg_overlay_img z_index_1">
                    <img
                      src="./inckd-klarna-works.png"
                      alt="How it Works!"
                      class="svg_h_inherit img_box_shadow"
                    />
                  </div>
                  <div class="bg_overlay_img">
                    <img
                      src="./dragon.svg"
                      alt="How it Works!"
                      class="svg_h_inherit"
                    />
                  </div>

                  <Image
                    src="/pay-klarna.png"
                    alt="How it Works!"
                    width={500}
                    height={500}
                    priority
                    layout="responsive"
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                  />
                </div>
              </div>
            </div>

            <div class="text_box_wrap left ">
              <div class="img_text_box_inner">
                <div class="img_box_wrap block_bg_gradient_1">
                  <div class="klarna_bg">
                    <img src="./klarna-white.svg" alt="" />
                  </div>
                  <div class="box_text_img_over color_pink m_left_0 m_right_0 m_text_center">
                    <h2 class="txt_mob_fs50">
                      You choose <br />
                      how you <br />
                      want to pay!
                    </h2>
                  </div>

                  <Image
                    priority={true}
                    src="/choose-pay.png"
                    alt="Pay all at once? Never again!"
                    width={500}
                    height={711}
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                    layout="responsive"
                  />
                </div>
                <div class="text_box_content justify_content_start">
                  <div class="text_box_content_inner custom_carousel_wrap">
                    <CarouselKlarna items={items}/>
                  </div>
                </div>
              </div>
            </div>

            <div class="text_box_wrap right ">
              <div class="img_text_box_inner m_switcher">
                <div class="text_box_content justify_content_start align_item_start">
                  <div class="text_box_content_inner w_100pc custom_full_block pr_0">
                    <h2 class="letter_spacing_03 m_text_center">Availability</h2>
                    <ul class="custom-listing-grid">
                      <li>
                        <img src="./afghanistan.svg" alt="afghanistan" />
                        <span>afghanistan</span>
                      </li>
                      <li>
                        <img src="./aland islands.svg" alt="aland islands" />
                        <span>aland islands</span>
                      </li>
                      <li>
                        <img src="./albania.svg" alt="albania" />
                        <span>albania</span>
                      </li>
                      <li>
                        <img src="./Algeria.svg" alt="Algeria" />
                        <span>Algeria</span>
                      </li>
                      <li>
                        <img src="./american samoa.svg" alt="american samoa" />
                        <span>american samoa</span>
                      </li>
                      <li>
                        <img src="./angola.svg" alt="angola" />
                        <span>angola</span>
                      </li>
                      <li>
                        <img src="./anguilla.svg" alt="anguilla" />
                        <span>anguilla</span>
                      </li>
                      <li>
                        <img src="./monaco.svg" alt="monaco" />
                        <span>monaco</span>
                      </li>
                      <li>
                        <img src="./mongolia.svg" alt="mongolia" />
                        <span>mongolia</span>
                      </li>
                      <li>
                        <img src="./montenegro.svg" alt="montenegro" />
                        <span>montenegro</span>
                      </li>
                      <li>
                        <img src="./morocco.svg" alt="morocco" />
                        <span>morocco</span>
                      </li>
                      <li>
                        <img src="./mozambique.svg" alt="mozambique" />
                        <span>mozambique</span>
                      </li>
                      <li>
                        <img src="./myanmar.svg" alt="myanmar" />
                        <span>myanmar</span>
                      </li>
                      <li>
                        <img src="./namibia.svg" alt="namibia" />
                        <span>namibia</span>
                      </li>
                      <li>
                        <img src="./nato.svg" alt="nato" />
                        <span>nato</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="img_box_wrap block_bg_gradient_1 justify_content_right img-btm-7pc">
                  <div class="klarna_bg klarna_page_align">
                    <img src="./klarna-white.svg" alt="" />                    
                  </div>
                  <div class="box_text_img_over color_pink txt-right-align">
                    <h2 class="letter_spacing_03 text_right m_text_center txt_mob_fs50">
                      Where i can pay my tattoo with Klarna?
                    </h2>
                  </div>

                  <Image
                    priority={true}
                    src="/tattoo-klarna.png"
                    alt="Where i can pay"
                    width={500}
                    height={711}
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                    layout="responsive"
                  />
                </div>
              </div>
            </div>

            <div class="text_box_wrap right app_download_box_wrap block_bg_pink">
              <div class="img_text_box_inner">
                <div class="text_box_content justify_content_start m_justify_content_center m_pt_45">
                  <div class="text_box_content_inner m_pr_0">
                    <ul class="download_app">
                      <li class="download_app_title">
                        <h6>Download the App & Explore more!</h6>
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
                {!isMobileView ? (
                <div class="img_box_wrap">
                  <ul class="app_download_img_list img_box_img_m20pc justify_content_center">
                    <li>
                      <img
                        src="./mockup-iPhone-download.png"
                        alt="Download the App & Explore more!"
                      />
                    </li>
                    <li>
                      <img
                        src="./mockup-iPhone-download.png"
                        alt="Download the App & Explore more!"
                      />
                    </li>
                  </ul>
                </div>):""}
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
          </div>
        </div>
      </section>
    </div>
  );
}
