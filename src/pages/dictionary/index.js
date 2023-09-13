import React from 'react'
import Head from "next/head";
import Image from "next/image";

import Link from "next/link";
// import CarouselComponent from "@/components/carousel/Carousel";

export default   function Dictionary() {

  const items = [
    {
      image: "./Group 82721.png",
      text: "Learn about greek mythology and find the tattoo with the right meaning for you in the app",
      button1: "Wake",
      button2: "Trust",
      heading: "Itzscuintli",
    },
    {
      image: "./Group.svg",
      text: "Learn about greek mythology and find the tattoo with the right meaning for you in the app",
      button1: "Wake",
      button2: "Trust",
      heading: "Cancer",
    },
    {
      image: "./Group 82677.svg",
      text: "Learn about greek mythology and find the tattoo with the right meaning for you in the app",
      button1: "Wake",
      button2: "Trust",
      heading: "Itzscuintli",
    },
    {
      image: "./Group 82674.svg",
      text: "Learn about greek mythology and find the tattoo with the right meaning for you in the app",
      button1: "Wake",
      button2: "Trust",
      heading: "Itzscuintli",
    },
    {
      text: "Learn about greek mythology and find the tattoo with the right meaning for you in the app",
      button1: "Wake",
      button2: "Trust",
      heading: "Itzscuintli",
    },
  ];



  // const data = await getData()

  return (
    <div className="page_wrapper">
      <section className="img_text_banner_box">        
          <div className="col_full">
            <div className="img_text_box_wrapper">             

              <div class="text_box_wrap right block_bg_black full_banner_custom_slider">
                <div class="container">
                  <div class="img_text_box_inner">
                    <div class="text_box_content justify_content_start pl_0 pr_2_pc">
                      <div class="text_box_content_inner">
                        <h2 class="letter_spacing_05">Tattoo Dictonary</h2>
                        <p>
                          We hand-pick every tattoo artist to ensure your tattoo
                          experience is handled with care, quality and
                          inclusivity.
                        </p>
                        <a href="#" class="btn btn_default btn_xxl btn_sm_m">
                          Find artists
                          <img src="./alt-arrow-right-black.svg" alt="" class="ml-8 mt-2"/>
                        </a>
                      </div>
                    </div>
                    <div class="img_box_wrap">
                      <img src="./pitched_please.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>

              <div class="text_box_wrap full-block-wrap block_bg_yellow">
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
                              <a target="_blank" href="https://apps.apple.com/us/app/inckd/id1526690381">
                                <img src="./app-store.svg" alt="apple store" />
                              </a>
                            </li>
                            <li>
                              <a target="_blank" href="https://play.google.com/store/apps/details?id=com.inckd.tattoo">
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
                    <div class="box_text_img_over custom_spc_left_d_590 color_white">
                      <h2 class="txt_mob_fs50 custom_spc_left_d_430 list_inline_item">
                        Zodiac <span>Signs</span>
                      </h2>
                      <p class="custom_fs_22 custom_fs_m_16 md_max_75 max_m_w_100pc list_inline_item">Learn more about greek mythology and find the tattoo with the right meaning for you in the app</p>
                    </div>
                    <img src="./mythology.png" alt="" />
                  </div>
                  <div class="text_box_content justify_content_start p_0">                    
                    <div class="text_box_content_inner max_w_100pc w_100pc">
{/* 
                       <CarouselComponent items={items} />            */}
                    </div>
                  </div>
                </div>
              </div>


              <div class="text_box_wrap right">
                <div class="img_text_box_inner">
                    <div class="text_box_content justify_content_start p_0">                    
                      <div class="text_box_content_inner max_w_100pc w_100pc">
                        {/* <img src="./slider-dummy-2.png" alt="Zodiac Signs" class="w_100pc"/>                      */}
                      </div>
                  </div>
                  <div class="img_box_wrap block_bg_gradient_2 justify_content_right">                    
                    <div class="box_text_img_over color_white text_right justify_content_right">
                      <h2 class="txt_mob_fs50 custom_spc_right_d_430 list_inline_item">
                      Greek <span>Mythology</span>
                      </h2>
                      <p class="custom_fs_22 custom_fs_m_16 md_max_75 max_m_w_100pc list_inline_item">Learn more about greek mythology and find the tattoo with the right meaning for you in the app</p>
                    </div>
                    <img src="./mythology.png" alt="Greek Mythology" />
                  </div>                  
                </div>
              </div>

              <div class="text_box_wrap full-block-wrap block_bg_yellow">
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
                              <a target="_blank" href="https://apps.apple.com/us/app/inckd/id1526690381">
                                <img src="./app-store.svg" alt="apple store" />
                              </a>
                            </li>
                            <li>
                              <a target="_blank" href="https://play.google.com/store/apps/details?id=com.inckd.tattoo">
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
                      <p class="custom_fs_22 custom_fs_m_16 md_max_75 max_m_w_100pc list_inline_item">Learn more about greek mythology and find the tattoo with the right meaning for you in the app</p>
                    </div>
                    <img src="./aztec-symbols.png" alt="" />
                  </div>
                  <div class="text_box_content justify_content_start p_0">                    
                    <div class="text_box_content_inner max_w_100pc w_100pc">
                      {/* <img src="./slider-dummy-2.png" alt="Aztec Symbols" class="w_100pc"/>                      */}
                    </div>
                  </div>
                </div>
              </div>


            </div>          
        </div>
      </section>
    </div>
  )
}

