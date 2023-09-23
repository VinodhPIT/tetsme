import React from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import { useGlobalState } from "@/context/Context";
import HomLoading from "@/components/homeLoading";
import SearchField from "@/components/searchField";
import Header from "@/components/header/header";
import ImageSlider from "@/components/slider/ImageSlider";
import ImageSwiper from "@/components/slider/ImageSwiper";
import {
  APP_LINK_APPLE,
  APP_LINK_GOOGLE,
  blurDataURL,
} from "@/constants/constants";
export default function Home() {
  const { state, serverLoad, styleCollection } = useGlobalState();



  const imagePaths = [
    "./s-1.svg",
    "./s-2.svg",
    "./s-3.svg",
    "./s-4.svg",
    "./s-5.svg",
    "./s-6.svg",
    "./s-7.svg",
    "./s-8.svg",
    "./s-9.svg",
    "./s-10.svg",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobileView, setIsMobileView] = useState(false);
  const [cookieDropdown, setCoookieDropdown] = useState(false);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    styleCollection();

    const timer = setInterval(changeImage, 2000);
    return () => clearInterval(timer);

  }, []);

  const changeImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imagePaths.length);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 767.98); // Adjust the breakpoint as needed
      setCoookieDropdown(window.innerWidth <= 767.98);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className="page_wrapper tete">
      <div className="header_cookies">
        <div className="header_cookie_img">
          <img src="./logo-cookies.svg" alt="" />
        </div>
        <div className="header_cookie_txt">
          <p>
            <span>Get tattoo now, pay later.</span>
            <span className="header_cookie_desktop">
              That&apos;s right, there&apos;s a new way to get tattooed smoooth!{" "}
              <Link href="/klarna">Learn more</Link>
            </span>

            {toggle && (
              <span className="header_cookie_mob">
                That&apos;s right, there&apos;s a new way to get tattooed
                smoooth! <Link href="/klarna">Learn more</Link>
              </span>
            )}
          </p>
        </div>
        {cookieDropdown && (
          <Image
            onClick={() => onToggle()}
            src={"/arrowDown.svg"}
            alt="arrowDown"
            width={16}
            height={16}
            className="header_cookie_close"
          />
        )}
      </div>
      <Header />

      <div className={styles.home_banner_block}>
        <div className={styles.home_banner_wrap}>
          <div className={styles.home_banner_item}>
            <div className={styles.home_banner}>
              <div className={styles.home_banner_inner}>
                <video loop autoPlay muted className="mob_hidden">
                  <source src="./home-video.mp4" type="video/mp4" />
                </video>
                <img src="./istockphoto-1386481647-640_adpp_is1-mob.png" alt="" className={`${styles.desk_hidden} ${styles.home_banner_img}`} />
              </div>
            </div>
            <div className={styles.home_banner_content}>
              <div className={styles.home_banner_content_wrap}>
                <div className={styles.home_banner_caption}>
                  <h1 class="color_aero_blue">
                    <span>
                      Book your dream{" "}
                      <span className={styles.highlight_border}>tattoo</span>{" "}
                      now!
                    </span>
                  </h1>
                </div>

                <div className="search_form">
                  <div className="search_form_wrap">
                    <SearchField isPage={"all"} />

                    {/* <form className="position_relative">
                      <div className="input_group position_relative">
                        <input
                          placeholder="Search"
                          type="text"
                          required="required"
                          className="form_control input_txt"
                        />
                        <button
                          type="submit"
                          tabindex="-1"
                          className="btn_lg btn_icon btn_search"
                        >
                          <img src="./search-magnifer.svg" alt="" />
                        </button>
                      </div>
                    </form> */}
                    <div className="trend_list_wrap">
                      <span className="trend_list_label">
                        <p>Search by </p>
                        <h6>Categories</h6>
                      </span>
                      <ul className="trend_list">
                        <li className="list_inline_item">
                          <Link
                            href={`/search?term=${""}&category=${"tattoo"}`}
                            onClick={() => serverLoad(true)}
                          >
                            <img src="./Flame.svg" alt="" />
                            Tattoos
                          </Link>
                        </li>
                        <li className="list_inline_item">
                          <Link
                            href={`/search?term=${""}&category=${"flash"}`}
                            onClick={() => serverLoad(true)}
                          >
                            <img src="./Bolt.svg" alt="" />
                            Flash
                          </Link>
                        </li>
                        <li className="list_inline_item">
                          <Link
                            href={`/search?term=${""}&category=${"artist"}`}
                            onClick={() => serverLoad(true)}
                          >
                            <img src="./colour-palette.svg" alt="" />
                            Artists
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <ul className="download_app">
                  <li className="download_app_title">
                    <h6>Download our app from</h6>
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
        </div>
      </div>

      <section className="img_text_banner_box">
        <div className="col_full">
          <div className="img_text_box_wrapper">
            <div class="text_box_wrap right">
              <div class="img_text_box_inner">
                <div class="text_box_content justify_content_start">
                  <div class="text_box_content_inner m_pr_0">
                    <h2 class="letter_spacing_03">
                      Find the right Artist for your next Tattoo!
                    </h2>
                    <p>
                      We hand-pick every tattoo artist to ensure your tattoo
                      experience is handled with care, quality and inclusivity.
                    </p>
                    < Link href={`/search?term=${""}&category=${"artist"}`} class="btn btn_secondary btn_xxl btn_sm_m btn_img">
                      Find artists
                      <img
                        src="./alt-arrow-right-white.svg"
                        alt=""
                        class="ml-8 mt-2"
                      />
                    </Link>
                  </div>
                </div>
                <div class="img_box_wrap">
                  <div class="bg_overlay_img bg_slider_img">
                    {imagePaths.map((imagePath, index) => (
                      <img
                        key={index}
                        style={{
                          height: "400px",
                          width: "400px",
                          zIndex: "2",
                          position: "absolute",
                        }}
                        id={`image${index}`}
                        className={`imageFader ${
                          index === currentIndex ? "active" : ""
                        }`}
                        src={imagePath}
                        alt={`Image ${index + 1}`}
                      />
                    ))}
                  </div>

                  <Image
                    priority
                    src="/pexels-djordje-petrovic-1433270-3.png"
                    alt="Picture of the author"
                    width={500}
                    height={800}
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                    layout="responsive"
                  />
                  {/* <img src="./pexels-djordje-petrovic-1433270-3.png" alt="" />  */}
                </div>
              </div>
            </div>

            <div class="text_box_wrap left block_bg_pink">
              <div class="img_text_box_inner">
                <div class="img_box_wrap block_bg_gradient_1">
                  <div class="klarna_bg">
                    <img src="./klarna-white.svg" alt="" />
                  </div>
                  <div class="box_text_img_over color_pink">
                    <h2 class="letter_spacing_04 txt_mob_fs50">
                      Pay all at once? <br /> Never again!
                    </h2>
                  </div>
                  <img src="./pexels-cottonbro-studio-5320148-6.png" alt="" />
                </div>
                <div class="text_box_content justify_content_start">
                  <div class="klarna_bg">
                    <img src="./klarna.svg" alt="" />
                  </div>
                  <div class="text_box_content_inner m_pr_0 pr_0">
                    <h2 class="letter_spacing_02">Tattoo now, <br />Pay later</h2>
                    <p>
                      Get tattoo now, pay later. That&apos;s right, there&apos;s
                      a new way to get tattooed smoooth!
                    </p>
                    <Link href="/klarna" class="btn btn_secondary btn_xxl btn_sm_m btn_img">
                      Learn more
                      <img
                        src="./alt-arrow-right-white.svg"
                        alt=""
                        class="ml-8 mt-2"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div class="text_box_wrap right block_bg_black">
              <div class="img_text_box_inner">
                <div class="text_box_content justify_content_start">
                  <div class="text_box_content_inner m_pr_0 m_pb_0">
                    <h2 class="letter_spacing_05">Tattoo Dictonary</h2>
                    <p>
                      We hand-pick every tattoo artist to ensure your tattoo
                      experience is handled with care, quality and inclusivity.
                    </p>
                    <Link href={`/search?term=${""}&category=${"artist"}`}  class="btn btn_default btn_xxl btn_sm_m btn_img">
                      Find artists
                      <img
                        src="./alt-arrow-right-black.svg"
                        alt=""
                        class="ml-8 mt-2"
                      />
                    </Link>
                  </div>
                </div>
                <div class="img_box_wrap custom_slick_slider_one">
                  <ImageSwiper imgHeight="450px" imgWidth="400px"></ImageSwiper>
                </div>
              </div>
            </div>

            <div class="text_box_wrap left block_bg_yellow">
              <div class="img_text_box_inner">
                <div class="img_box_wrap block_bg_gradient_1">
                  <div class="box_text_img_over color_yellow md_max_75">
                    <h2 class="letter_spacing_025 color_yellow">
                      <span class="small">My Style is </span>Lettering
                    </h2>
                  </div>

                  <Image
                    priority={true}
                    src="/pexels-ademola.png"
                    alt="pexels-ademola"
                    width={600}
                    height={730}
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                    layout="responsive"
                  />

                  {/* <img src="./pexels-ademola.png" alt="" />  */}
                </div>
                <div class="text_box_content">
                  <div class="bg_overlay_img">
                    <svg
                      width="704"
                      height="472"
                      viewBox="0 0 704 472"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M677.071 169.496C667.264 158.069 656.655 149.666 635.718 147.356C635.718 146.691 635.718 145.699 635.718 144.53C634.295 144.921 632.756 145.752 631.126 146.958C629.104 146.83 627.003 146.746 624.796 146.722C602.948 146.722 587.543 138.036 579.502 121.458C573.592 109.272 571.934 94.112 574.954 79.8639C578.239 64.3666 592.81 15.7285 644.173 34.3999C666.159 42.394 686.518 83.3193 686.73 120.794C686.835 139.226 683.456 155.753 677.071 169.496ZM638.808 205.818C631.408 208.683 624.239 209.946 617.256 210.194C617.332 209.009 617.406 207.835 617.478 206.629C620.229 160.738 631.744 150.586 634.908 148.643C654.275 150.832 667.06 159.031 676.712 170.274C668.482 187.553 655.641 199.306 638.808 205.818ZM589.808 304.209C566.202 359.143 536.142 360.831 524.475 358.744C527.711 338.965 524.738 319.508 516.28 305.618C506.915 290.244 495.309 283.276 482.82 281.912C483.046 272.529 484.187 263.866 486.237 255.958C495.337 247.55 508.092 227.492 518.642 211.452C520.144 210.593 521.668 209.801 523.207 209.069C520.006 216.976 516.618 226.659 514.653 234.556C510.097 252.863 517.1 257.169 519.582 257.904C523.718 259.13 530.24 252.226 533.18 248.726C540.289 240.262 547.126 230.508 552.928 221.573C550.401 227.341 548.143 232.966 546.217 238.46C540.872 253.701 545.841 262.91 549.926 264.29C556.583 266.538 573.359 237.706 590.697 208.137C597.941 209.854 605.317 211.345 612.913 211.727C610.863 235.189 606.643 265.039 589.808 304.209ZM509.89 387.806C494.518 418.011 464.432 439.768 432.157 433.306C442.733 419 450.669 401.499 453.361 381.218C463.927 375.662 471.271 367.882 472.103 360.62C473.672 346.923 465.136 336.396 451.318 338.714C450.029 332.809 448.328 326.755 446.133 320.545C443.314 312.568 440.087 306.011 436.614 300.591C450.204 292.076 466.546 285.391 482.227 288.724C482.296 292.69 482.503 296.767 482.893 300.989C486.263 337.518 504.204 352.546 518.77 358.704C517.397 368.808 514.44 378.869 509.89 387.806ZM388.854 460.132C374.047 459 362.339 450.534 348.36 436.822C357.162 428.895 366.137 420.036 374.673 411.245C385.405 419.769 394.906 426.213 401.82 428.877C410.581 432.252 419.143 435.036 427.768 436.518C416.821 450.312 402.819 461.201 388.854 460.132ZM336.896 444.53C317.728 458.619 299.796 468.637 277.949 468.637C264.993 468.637 250.661 455.534 244.795 436.642C251.332 437.075 258.125 436.723 264.996 435.299C285.574 431.036 302.767 422.284 316.422 412.947C317.86 414.556 319.26 416.113 320.614 417.606C327.305 424.974 334.662 432.877 342.437 440.04C340.419 441.79 338.555 443.312 336.896 444.53ZM175.513 375.126C168.534 326.067 207.12 303.813 239.271 331.449C265.746 354.206 294.25 388.028 314.973 411.316C299.362 422.291 282.559 430.523 264.631 433.325C257.613 434.424 250.745 434.727 244.135 434.305C240.801 421.809 241.15 407.034 247.857 391.931C247.393 391.305 247.033 391.226 247.033 391.226C247.033 391.226 236.54 410.24 242.785 434.189C207.802 431.416 180.227 408.27 175.513 375.126ZM346.634 387.089C355.678 395.342 364.642 403.176 372.932 409.852C363.497 419.774 354.599 428.881 347.237 435.721C340.268 428.808 332.717 420.643 323.911 411.42C323.182 410.658 322.47 409.904 321.752 409.146C332.748 400.988 341.079 392.79 346.634 387.089ZM372.892 359.163C374.742 362.167 376.885 365.217 379.354 368.311C384.844 375.187 391.156 380.08 397.85 383.367C391.306 390.331 384.609 397.5 378.069 404.428C369.404 397.857 360.46 390.408 351.322 382.251C356.271 377.223 364.264 368.51 372.892 359.163ZM364.246 331.305C362.338 314.293 369.444 294.753 382.001 289.494C397.8 282.878 416.029 285.906 430 300.664C421.512 306.658 413.482 313.482 406.354 320.23C396.67 329.402 385.426 342.615 372.738 356.814C368.437 349.641 365.35 341.147 364.246 331.305ZM427.789 352.48C419.749 360.244 410.01 370.444 399.809 381.283C390.214 376.707 380.573 369.078 373.682 358.308C386.396 344.539 400.32 329.604 407.848 323.127C412.166 319.414 421.095 311.023 432.381 303.357C436.928 308.804 440.948 315.595 444.175 323.832C446.18 328.95 447.765 334.091 448.975 339.216C442.729 340.853 435.539 344.997 427.789 352.48ZM450.992 382.401C450.101 389.05 448.708 395.437 446.898 401.426C444.111 410.651 438.221 422.391 430.499 432.947C428.623 432.516 426.739 432.008 424.852 431.381C411.289 426.872 396.103 417.93 379.899 405.815C387.173 398.202 394.001 390.827 399.979 384.348C417.22 391.863 436.637 389.193 450.992 382.401ZM452.055 342.278C458.911 340.989 464.878 343.216 468.754 351.307C473.993 362.244 466.004 372.079 453.701 378.558C454.925 367.278 454.516 355.159 452.055 342.278ZM451.324 379.749C440.709 384.76 427.519 387.367 416.814 386.295C412.227 385.835 407.113 384.48 401.922 382.243C407.979 375.681 413.062 370.182 416.659 366.569C426.653 356.539 439.071 345.936 449.746 342.84C452.311 355.513 452.637 368.019 451.324 379.749ZM518.944 357.278C504.537 351.287 486.838 336.984 483.506 300.856C483.126 296.741 482.912 292.752 482.824 288.86C492.18 291.006 501.283 296.752 509.408 307.863C518.03 319.657 521.226 338.453 518.944 357.278ZM495.342 234.116C501.102 224.764 508.397 217.806 516.39 212.801C505.059 229.73 494.37 245.889 486.935 253.454C488.987 246.371 491.779 239.907 495.342 234.116ZM529.574 195.533C528.306 197.494 526.425 201.394 524.384 206.226C523.278 206.702 522.177 207.207 521.083 207.757C524.226 203.028 527.119 198.791 529.574 195.533ZM577.803 161.751C580.384 162.831 579.894 167.157 577.955 172.68C572.354 182.704 567.166 192.257 562.519 201.407C554.138 200.564 544.886 200.592 535.671 202.623C551.713 172.835 570.48 158.685 577.803 161.751ZM560.75 204.925C552.805 217.657 541.281 235.362 532.15 246.287C522.052 258.371 514.527 259.973 519.371 243.157C523.603 228.466 528.855 215.683 534.493 204.849C543.951 202.193 553.515 201.544 562.065 202.307C561.623 203.182 561.182 204.057 560.75 204.925ZM585.064 206.77C586.424 207.107 587.791 207.438 589.159 207.768C571.498 238.404 555.343 267.464 550.185 261.786C544.283 255.289 555.979 229.761 570.792 203.567C575.475 204.441 580.179 205.57 585.064 206.77ZM623.507 156.741C615.025 170.206 615.004 187.06 613.044 210.216C605.578 210.059 598.317 208.849 591.207 207.266C602.695 187.681 614.385 167.901 623.507 156.741ZM344.18 247.383C337.585 259.437 325.148 259.958 323.466 249.106C322.452 242.57 322.733 226.573 353.57 206.495C355.29 205.376 356.963 204.254 358.614 203.132C356.019 218.914 351.61 233.802 344.18 247.383ZM280.769 147.702C279.212 144.337 277.651 139.407 277.923 134.331C278.327 126.813 282.569 125.539 284.261 128.284C286.404 131.756 286.948 138.791 282.173 150.649C281.678 149.63 281.198 148.632 280.769 147.702ZM256.101 85.7223C268.675 64.7442 287.16 20.9827 293.82 29.9917C296.963 34.2416 289.566 52.7076 275.682 75.7027C259.235 102.942 235.585 135.573 224.092 151.132C237.836 121.211 250.352 95.3141 256.101 85.7223ZM20.4688 185.601C-2.8275 167.521 -4.37912 127.173 20.7264 98.5599C48.5937 66.7954 87.1484 56.6293 120.557 65.8147C109.748 83.7203 99.5135 104.693 90.8028 127.99C82.1654 151.09 76.5292 171.642 73.3013 189.527C49.8553 197.123 31.0161 193.783 20.4688 185.601ZM158.819 27.486C198.804 -12.5913 208.841 10.2145 210.964 24.668C213.489 41.8678 208.21 84.5598 185.116 125.91C182.571 117.728 178.598 108.958 172.555 100.179C184.674 76.7583 188.15 56.4699 181.49 49.402C173.075 40.4711 157.955 53.4883 144.711 73.6462C140.322 70.9705 135.706 68.6401 130.901 66.7023C140.685 49.7517 150.432 35.8918 158.819 27.486ZM170.567 148.34C144.106 183.627 123.283 187.155 120.331 163.898C137.084 149.896 151.952 133.119 162.425 117.345C165.788 112.282 168.781 107.253 171.412 102.344C177.447 111.099 181.366 119.907 183.862 128.094C179.933 134.931 175.529 141.724 170.567 148.34ZM148.558 76.1177C162.273 56.0582 176.31 46.4439 180.46 51.5954C184.518 56.6314 183.406 73.3446 170.98 97.9396C169.451 95.8456 167.815 93.7517 166.033 91.6706C160.95 85.7341 155.047 80.528 148.558 76.1177ZM164.589 93.5495C166.492 95.7258 168.242 97.9236 169.855 100.127C166.652 106.256 162.767 112.845 158.097 119.848C149.048 133.42 135.915 148.899 120.167 162.203C119.5 154.449 120.628 144.06 123.987 131.12C129.515 109.822 138.22 91.7711 147.208 78.1453C153.494 82.4306 159.35 87.5532 164.589 93.5495ZM90.8028 182.155C88.0093 183.601 85.2637 184.888 82.5653 186.042C91.7187 147.064 110.654 102.286 129.663 68.8519C134.402 70.7202 138.995 73.0024 143.4 75.6899C133.508 91.2491 124.842 110.581 121.101 127.363C118.144 140.627 116.958 153.677 118.274 163.769C109.769 170.765 100.55 177.113 90.8028 182.155ZM694.551 197.55C689.595 187.651 684.343 178.132 677.57 170.08C684.026 156.177 687.455 139.449 687.349 120.786C687.131 82.9268 666.687 41.0871 644.447 33.0032C592.58 14.1522 577.692 63.8832 574.365 79.5762C571.283 94.1152 572.443 109.399 578.473 121.831C586.775 138.946 602.766 148.391 622.584 148.051C625.008 148.017 627.316 148.087 629.571 148.206C618.502 157.654 603.635 182.673 589.653 206.911C588.15 206.566 586.651 206.211 585.161 205.844C580.411 204.677 575.833 203.58 571.276 202.715C581.695 184.363 593.567 165.783 601.918 153.284C592.699 159.935 586.151 158.149 586.151 158.149C584.737 160.639 583.35 163.086 581.977 165.519C581.985 156.348 576.513 145.273 555.853 161.751C545.594 169.932 532.036 189.487 519.04 208.843C510.045 213.844 501.672 221.647 494.891 233.474C491.298 239.745 488.436 246.597 486.333 254.055C482.695 257.61 479.888 258.959 478.253 257.089C475.952 254.456 478.598 246.871 483.559 237.303C487.99 228.751 506.428 199.141 510.88 192.051C519.681 178.032 521.201 168.903 520.104 161.651C519.01 154.405 514.176 150.746 506.489 157.367C497.497 165.111 485.712 183.512 476.855 198.638C481.229 188.776 484.751 180.466 486.291 175.996C490.929 162.534 488.455 152.045 483.199 152.671C478.926 153.179 463.888 167.559 447.945 192.775C449.628 189.392 450.917 186.76 451.595 185.286C461.385 163.997 455.855 154.659 453.163 153.119C449.572 151.066 444.102 155.046 439.813 162.611C434.678 171.673 399.553 229.276 394.091 236.949C388.628 244.619 376.9 259.907 374.201 257.143C371.482 254.356 372.965 244.461 379.148 230.997C383.193 222.19 408.319 173.585 430.985 130.067C446.011 131.003 459.437 130.877 470.956 129.719C494.362 127.363 498.588 106.543 498.588 106.543C498.588 106.543 498.588 106.543 498.382 106.386C492.062 120.788 485.158 123.083 470.97 124.78C463.231 125.704 449.253 125.563 433.839 124.589C444.74 103.67 454.827 84.3983 461.385 71.9447C450.049 83.8433 445.514 79.773 445.514 79.773C444.896 84.6251 443.247 87.6003 437.889 99.0283C436.457 102.08 431.767 111.512 425.537 123.992C415.349 123.177 404.917 122.03 395.534 120.611C361.02 115.393 360.631 135.191 360.631 135.191C360.631 135.191 360.631 135.191 361.216 135.191C364.463 127.52 366.533 122.029 395.43 126.268C405.005 127.673 414.143 128.732 422.804 129.465C420.326 134.426 417.668 139.742 414.917 145.249C399.741 168.401 379.252 185.545 364.391 196.049C364.664 188.904 365.079 181.384 366.336 173.335C371.18 142.34 384.165 140.147 384.165 140.147V137.716C373.785 141.105 368.279 149.499 365.086 160.061C360.05 167.57 348.226 185.476 340.297 199.689C329.991 218.161 307.113 257.612 299.384 259.335C291.655 261.055 295.881 245.4 301.136 234.443C306.392 223.483 334.01 167.595 346.789 151.786C340.915 155.385 338.855 158.046 331.847 155.542C318.862 177.616 297.22 209.238 288.563 220.509C279.907 231.781 255.277 268.884 251.876 254.95C248.476 241.019 274.549 212.056 283.617 197.027C292.686 181.999 295.622 176.011 288.563 163.057C287.259 160.66 285.31 156.953 283.471 153.281C287.326 143.267 289.684 131.402 284.373 125.789C283.383 124.741 277.743 121.493 276.196 133.871C275.647 138.252 276.536 143.886 279.392 149.749C280.001 151 280.546 152.166 281.056 153.287C278.839 158.294 275.74 164.075 271.508 170.728C265.709 179.84 248.286 209.603 236.269 228.104C232.129 234.479 210.758 264.971 206.121 257.495C200.81 248.935 215.947 227.013 229.744 209.194C234.932 202.494 243.268 189.494 246.724 177.616C249.705 167.365 248.373 145.053 229.41 164.153C219.766 173.864 207.702 192.371 199.052 207.083C205.622 192.002 212.716 176.088 219.654 160.841C240.383 132.701 259.7 106.243 265.376 97.6198C275.27 82.591 305.155 40.9481 295.263 27.1737C285.369 13.3961 249.643 82.6209 241.468 97.9332C231.546 116.516 213.449 153.398 196.87 188.192C162.679 234.579 118.567 289.212 89.5666 265.441C74.3348 252.955 74.1757 223.114 82.0429 188.337C84.7829 187.189 87.4574 185.937 90.0298 184.582C99.7929 179.437 109.408 172.826 118.513 165.386C121.608 184.358 134.324 191.577 162.116 166.814C170.975 158.92 179.042 148.556 186.092 136.884C189.626 154.284 187.184 167.087 187.184 167.087L188.189 167.675C188.189 167.675 191.355 153.694 187.407 134.722C213.551 90.0332 224.73 27.3823 207.048 7.13348C189.631 -12.8094 153.496 12.2432 121.91 63.5913C88.4684 53.8177 48.6732 61.8503 20.2365 95.8199C-8.41883 130.05 -3.50595 169.906 19.5409 187.869C32.4671 197.943 53.5168 197.725 72.9444 191.654C64.0127 243.679 75.7618 272.52 93.276 274.833C116.978 277.963 148.101 257.612 176.131 219.726C180.917 213.259 186.389 205.867 192.209 198.003C179.233 225.401 167.816 250.223 162.941 261.995C169.536 251.977 177.574 253.542 179.223 254.169C182.949 244.836 187.622 233.633 192.826 221.486C197.107 214.654 204.753 202.52 211.755 191.733C229.089 165.029 239.164 156.788 241.788 160.044C247.162 166.717 216.323 211.352 209.212 225.519C202.972 237.953 199.549 251.573 203.133 257.705C208.98 267.71 221.784 251.955 231.472 238.67C239.918 227.086 246.147 217.94 252.965 207.247C257.458 200.197 269.838 177.722 277.095 166.293C278.678 163.801 280.569 160.216 282.301 156.161C287.374 168.499 285.291 173.549 276.919 189.512C267.231 207.985 244.147 241.331 249.609 255.889C255.071 270.449 276.3 240.861 290.007 222.388C303.713 203.916 321.85 176.049 321.85 176.049C321.85 176.049 295.056 225.361 291.965 238.827C288.873 252.291 290.316 264.343 299.487 262.152C308.659 259.96 338.029 206.264 341.224 200.784C344.17 195.732 358.591 171.518 364.212 163.239C362.337 170.676 361.407 178.981 360.631 187.267C360.239 191.445 359.753 195.572 359.154 199.643C356.992 201.083 355.005 202.352 353.259 203.433C338.59 212.516 331.959 217.109 324.445 231.827C321.139 238.304 320.215 245.855 321.611 250.671C324.682 261.267 335.256 268.438 349.241 251.543C363.211 234.666 363.605 218.216 364.275 199.192C384.718 184.608 399.29 170.337 407.315 160.472C392.906 189.354 378.205 219.016 374.82 226.929C368.121 242.583 367.605 254.325 371.934 258.865C376.262 263.404 383.35 254.478 394.607 238.043C411.474 213.412 420.57 197.718 440.432 164.489C443.183 159.888 448.915 153.82 451.183 156.325C453.45 158.83 447.988 172.136 443.764 181.684C439.587 191.124 423.432 224.416 405.545 259.196C408.637 253.992 415.418 252.878 418.103 254.48C420.704 247.542 429.676 229.335 437.754 213.158C437.771 213.127 470.939 157.365 482.46 155.959C492.076 154.782 451.046 235.328 435.794 263.509C435.794 263.509 441.566 254.428 449.089 258.654C455.036 246.173 465.436 224.044 473.86 205.334C490.734 176.282 508.397 152.151 514.94 156.271C517.894 158.131 514.322 169.578 499.379 194.782C484.436 219.986 466.796 249.738 477.016 259.123C479.008 260.952 482.035 259.698 485.687 256.462C483.699 264.257 482.53 272.703 482.256 281.859C466.821 280.385 450.074 287.364 434.557 297.555C413.877 268.739 385.602 278.163 377.911 286.73C369.498 296.103 351.985 323.597 371.985 357.657C365.089 365.358 357.763 373.33 350.034 381.095C331.781 364.709 312.789 345.597 293.768 325.241C261.303 290.495 241.21 269.587 219.105 269.587C206.968 269.587 195.3 275.38 192.517 283.287L193.058 283.795C193.058 283.795 201.483 269.235 218.874 272.758C236.264 276.28 257.287 300.35 279.238 321.719C291.286 333.446 318.469 361.284 345.246 385.822C337.303 393.529 328.947 400.914 320.198 407.509C281.697 366.721 259.539 336.02 237.964 320.545C225.49 311.598 211.464 309.801 199.556 315.281C190.213 319.581 168.576 341.469 174.506 375.831C177.409 392.652 184.575 404.777 194.836 415.414C203.713 424.613 222.114 434.768 243.45 436.547C244.444 439.818 245.742 443.165 247.445 446.565C262.182 475.997 284.129 477.01 316.079 460.812C324.266 456.663 333.724 449.583 343.555 441.07C364.696 460.243 388.849 473.479 411.301 455.176C417.754 449.916 423.921 443.758 429.483 436.788C448.305 439.633 467.51 436.051 489.829 418.545C509.115 403.414 520.231 381.938 524.141 360.642C527.145 361.524 530.197 362.055 533.272 362.067C533.292 362.068 533.309 362.069 533.328 362.069C533.348 362.069 533.367 362.073 533.386 362.073C533.396 362.073 533.407 362.071 533.417 362.071C551.694 362.908 568.706 350.684 580.07 335.833C606.318 301.53 613.373 270.331 617.155 211.822C624.142 211.764 631.326 210.647 638.78 207.76C655.753 201.193 668.897 188.292 677.204 170.857C683.928 178.847 689.137 188.294 694.058 198.118C701.598 213.172 705.181 234.762 703.4 254.466C702.246 267.311 698.296 285.566 686.082 299.609C671.819 315.997 654.148 314.652 642.962 306.046C633.916 299.089 628.798 287.896 628.918 275.333L628.57 275.328C628.028 288.742 633.417 299.757 642.68 306.884C654.043 315.621 671.981 316.995 686.455 300.357C696.255 289.089 702.33 273.265 704.013 254.592C705.815 234.652 702.189 212.794 694.551 197.55Z"
                        fill="#FFD200"
                        fill-opacity="0.5"
                      />
                    </svg>
                  </div>

                  <div class="text_box_content_inner w_100pc pr_0">
                    <h2 class="letter_spacing_025">
                      Whats your <br />
                      Style?
                    </h2>
                    <br />
                    <br />
                    <br />
                    <Link href="/styleguide" class="btn btn_primary btn_xxl custom_fs_20">
                      Check the Styleguide
                      <img
                        src="./alt-arrow-right-white.svg"
                        alt=""
                        class="ml-8 mt-2"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div class="text_box_wrap right block_bg_black">
              <div class="img_text_box_inner m_switcher">
                <div class="text_box_content justify_content_start align_item_end txt-btm-7pc">
                  <div class="text_box_content_inner m_pr_0 pr_0">
                    <h2 class="letter_spacing_05">
                      Boost your <br />
                      business with <br />
                      inckd.
                    </h2>
                    <p>
                      Grow your tattoo business by fulfilling your customers
                      tattoo vision and offering them flexible payment options.
                    </p>
                    <Link href="/fortattooartists" class="btn btn_default btn_xxl btn_sm_m btn_img">
                      Learn more
                      <img
                        src="./alt-arrow-right-black.svg"
                        alt=""
                        class="ml-8 mt-2"
                      />
                    </Link>
                  </div>
                </div>
                <div class="img_box_wrap block_bg_gradient_1 justify_content_right img-btm-7pc">
                  <div class="box_text_img_over color_aero_blue_lite txt-right-align">
                    <h2 class="letter_spacing_03 text_right">
                      <span class="small letter_spacing_02">Are you a </span>
                      Tattooartist?
                    </h2>
                  </div>

                  <Image
                    priority
                    src="/are-you-tattooartist-istockphoto-1367127235-1024x1024 8.png"
                    alt="tattoo artist"
                    width={500}
                    height={800}
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                    layout="responsive"
                  />
                </div>
              </div>
            </div>

            <div class="text_box_wrap right app_download_box_wrap block_bg_orange">
              <div class="img_text_box_inner">
                <div class="text_box_content justify_content_start">
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
                    <ul class="app_download_img_list img_box_img_m20pc justify_content_end">
                      <li>
                        <Image
                          priority={true}
                          src="/img-mobile-new-02.png"
                          width={218}
                          height={1446}
                          alt="Picture of the author"
                          placeholder="empty"
                          className=""
                        />
                      </li>
                      <li>
                        <Image
                          priority={true}
                          src="/img-mobile-new-02.png"
                          width={218}
                          height={446}
                          alt="Picture of the author"
                          placeholder="empty"
                          layout="responsive"
                          className=""
                        />
                      </li>
                      <li>
                        <Image
                          priority={true}
                          src="/img-mobile-new-02.png"
                          width={218}
                          height={446}
                          alt="Picture of the author"
                          placeholder="empty"
                          layout="responsive"
                          className=""
                        />
                      </li>
                    </ul>
                  </div>
                ) : (
                  ""
                )}
              </div>
              {isMobileView ? (
                <ImageSlider
                  imgPath="/img-mobile-new-02.png"
                  imgAlt="Picture of the author"
                  imgblurDataURL=""
                  imgWidth="218"
                  imgHeight="446"
                ></ImageSlider>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </section>
      {state.serverLoad && <HomLoading />}
    </div>
  );
}
