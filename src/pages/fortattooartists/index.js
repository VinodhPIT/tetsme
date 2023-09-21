import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./custom.module.css";
import { APP_LINK_APPLE, APP_LINK_GOOGLE } from "@/constants/constants";

export default function Tattooartists() {
  return (
    <div className="page-wrapper">
      <div className={styles.banner_block}>
        <div className={styles.banner_wrap}>
          <div className={styles.banner_item}>
            <div className={styles.banner}>
              <div className={styles.banner_inner}>
                <img
                  src="./istockphoto-1367127235-1024x1024-6-tatoo-banner.png"
                  alt="Boost your business with inckd"
                />
              </div>
            </div>
            <div className={styles.banner_content}>
              <div className={styles.banner_content_wrap}>
                <div className={styles.banner_caption}>
                  <h1 class="color_white">
                    <span>
                      Boost your business <br />
                      with inckd.
                    </span>
                  </h1>
                  <p>
                    Grow your tattoo business by fulfilling your customers
                    tattoo vision and offering them flexible payment options.
                  </p>
                </div>
                <ul className={styles.download_app}>
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
                <div className={styles.trend_list_wrap}>
                  <ul className={styles.trend_list}>
                    <li className={styles.list_inline_item}>
                      <img src="./hourglass-icon.svg" alt="Easy setup" />
                      <span>Easy setup</span>
                    </li>
                    <li className={styles.list_inline_item}>
                      <img src="./heart-icon.svg" alt="Free to use" />
                      <span>Free to use</span>
                    </li>
                    <li className={styles.list_inline_item}>
                      <img src="./card-icon.svg" alt="Easy payments" />
                      <span>Easy payments</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="img_text_banner_box">
        <div className="col_full">
          <div className="img_text_box_wrapper fortattoo_artists">
            <div class="text_box_wrap right block_bg_black">
              <div class="img_text_box_inner">
                <div class="text_box_content justify_content_start">
                  <div class="text_box_content_inner m_pr_0">
                    <h2 class="letter_spacing_03">Manage your business</h2>
                    <ul class="custom-listing">
                      <li>
                        <img
                          src="./heart-icon.svg"
                          alt="Free to use & no subscpriptions"
                        />
                        Free to use & no subscpriptions
                      </li>
                      <li>
                        <img
                          src="./hourglass-icon.svg"
                          alt="Easy to set up and manage"
                        />
                        Easy to set up and manage
                      </li>
                      <li>
                        <img src="./shield-check.svg" alt="Verified users" />
                        Verified users
                      </li>
                      <li>
                        <img src="./card-icon.svg" alt="Easy payments" />
                        Easy payments
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="img_box_wrap block_bg_orange justify_content_center">
                  <img
                    src="./mockup-iPhone-business.png"
                    alt="Manage your business"
                    className="w_auto max_w_100pc object_fit_contain object_position img_box_shadow"
                  />
                </div>
              </div>
            </div>

            <div className="text_box_wrap left block_bg_black">
              <div className="img_text_box_inner">
                <div className="img_box_wrap block_bg_yellow justify_content_center">
                  <img
                    src="./mockup-iPhone-artist-profile.png"
                    alt="Your tattoo business ally"
                    className="w_auto max_w_100pc object_fit_contain object_position img_box_shadow"
                  />
                </div>
                <div className="text_box_content justify_content_start">
                  <div className="text_box_content_inner pr_40 m_pr_0">
                    <h2 className="letter_spacing_03">Your tattoo business ally</h2>
                    <p className="custom_fs_20 custom_fs_m_16">
                      Inckd is your ally in creating a thriving, client-focused
                      tattoo business. Display your portfolio proudly to attract
                      clients who appreciate your unique style. Expand your
                      customer base effortlessly through seamless communication
                      and hassle-free payment management, all within one
                      user-friendly platform.
                    </p>
                    <Link
                      href={"/joinartist"}
                      className="btn_default btn_custom_m"
                    >
                      {" "}
                      Get started{" "}
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="text_box_wrap right block_bg_black">
              <div className="img_text_box_inner">
                <div className="text_box_content justify_content_start">
                  <div className="text_box_content_inner m_pr_0">
                    <h2 className="letter_spacing_03">Keep clients in the Loop</h2>
                    <p className="custom_fs_20 custom_fs_m_16">
                      Engage in real-time chats to understand your clients
                      preferences firsthand. Efficiently handle appointments and
                      stay prepared to meet your clients needs. Discuss offers
                      and provide progress updates with Inckd, ensuring their
                      tattoo vision becomes a reality at every stage.
                    </p>
                    <Link
                      href={"/joinartist"}
                      className="btn_default btn_custom_m"
                    >
                      {" "}
                      Get started{" "}
                    </Link>
                  </div>
                </div>
                <div className="img_box_wrap block_bg_pink_200 justify_content_center">
                  <img
                    src="./mockup-iPhone-loop.png"
                    alt="Keep clients in the Loop"
                    className="w_auto max_w_100pc object_fit_contain object_position"
                  />
                </div>
              </div>
            </div>

            <div className="text_box_wrap full-block-wrap">
              <div className="img_text_box_inner">
                <div className="justify_content_start container w_100pc">
                  <div className="text_box_content_inner m_pr_0">
                    <h3>
                      Get inckd. customers tattoing with you now. Are you ready?
                    </h3>
                    <Link
                      href={"/joinartist"}
                      className="btn_secondary btn_custom_m"
                    >
                      {" "}
                      Get started{" "}
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="text_box_wrap left block_bg_black">
              <div className="img_text_box_inner">
                <div className="img_box_wrap block_bg_aero_blue justify_content_center">
                  <img
                    src="./mockup-iPhone-booking.png"
                    alt="Your booking buddy"
                    className="w_auto max_w_100pc object_fit_contain object_position img_box_shadow"
                  />
                </div>
                <div className="text_box_content justify_content_start">
                  <div className="text_box_content_inner pr_40 m_pr_0">
                    <h2 className="letter_spacing_03">Your booking buddy</h2>
                    <p className="custom_fs_20 custom_fs_m_16">
                      inckd. puts you in the drivers seat of your tattoo
                      business schedule, providing a comprehensive overview of
                      all bookings through a real-time dashboard right at your
                      fingertips. Define your availability and make it easier
                      for clients to schedule appointments according to their
                      preferences.
                    </p>
                    <Link
                      href={"/joinartist"}
                      className="btn_default btn_custom_m"
                    >
                      {" "}
                      Get started{" "}
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="text_box_wrap right block_bg_black m_pr_0 pr_0">
              <div className="img_text_box_inner">
                <div className="text_box_content justify_content_start">
                  <div className="text_box_content_inner m_pr_0">
                    <h2 className="letter_spacing_03">Manage Payments</h2>
                    <p className="custom_fs_20 custom_fs_m_16">
                      Get payments quickly and securely, monitor them in
                      real-time, and offer attractive discounts to encourage
                      repeat business. We support widely accepted payment
                      methods, including credit cards, and have partnered with
                      Klarna to provide convenient instalment plans for your
                      larger projects.
                    </p>
                    <Link
                      href={"/joinartist"}
                      className="btn_default btn_custom_m"
                    >
                      {" "}
                      Get started{" "}
                    </Link>
                  </div>
                </div>
                <div className="img_box_wrap block_bg_green_100 justify_content_center">
                  <img
                    src="./mockup-iPhone-payment.png"
                    alt="Manage Payments"
                    className="w_auto max_w_100pc object_fit_contain object_position img_box_shadow img_box_shadow"
                  />
                </div>
              </div>
            </div>

            <div className="text_box_wrap left block_bg_black">
              <div className="img_text_box_inner">
                <div className="img_box_wrap block_bg_aero_blue_lite justify_content_center">
                  <img
                    src="./mockup-iPhone-studio-features.png"
                    alt="Manage your Studios"
                    className="w_auto max_w_100pc object_fit_contain object_position img_box_shadow"
                  />
                </div>
                <div className="text_box_content justify_content_start">
                  <div className="text_box_content_inner pr_40 m_pr_0">
                    <h2 className="letter_spacing_03">Manage your Studios</h2>
                    <p className="custom_fs_20 custom_fs_m_16">
                      Lorem ipsum inckd. puts you in the drivers seat of your
                      tattoo business schedule, providing a overview of all
                      bookings through a real-time dashboard right at your
                      fingertips. Define your availability and make it easier
                      for clients to schedule appointments according to their
                      preferences.
                    </p>
                    <Link
                      href={"/joinartist"}
                      className="btn_default btn_custom_m"
                    >
                      {" "}
                      Get started{" "}
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="text_box_wrap full-block-wrap block_bg_gray_150">
              <div className="img_text_box_inner">
                <div className="justify_content_start container w_100pc ">
                  <div className="text_box_content_inner m_pr_0 pb_0">
                    <h3 className="mb_0">
                      Explore more <br />
                      Features in the App
                    </h3>
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
