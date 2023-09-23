import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  INSTAGRAM_PROFILE_LINK,
  FACEBOOK_PROFILE_LINK,
  LINKEDIN_PROFILE_LINK,
  APP_LINK_APPLE,
  APP_LINK_GOOGLE,
} from "@/constants/constants";
import { useGlobalState } from "@/context/Context";





export default function Footer() {

  const {
    serverLoad
  } = useGlobalState();
  // href={`}


  const bookLinks = [
    {
      id: 1,
      title: "Tattoo search",
      url: `/search?term=${""}&category=${"tattoo"}`,
    },

    {
      id: 2,
      title: "Artist search",
      url: `/search?term=${""}&category=${"artist"}`,
    },
    {
      id: 3,
      title: "Flash search",
      url: `/search?term=${""}&category=${"flash"}`,
    },
  ];

  const productLinks = [
    {
      id: 1,
      title: "Styleguide",
      url: "/styleguide",
    },

    {
      id: 2,
      title: "Dictionary",
      url: "/dictionary",
    },
    {
      id: 3,
      title: "Klarna",
      url: "/klarna",
    },
  ];

  const businesstLinks = [
    

    {
      id: 2,
      title: "For tattoo artists",
      url: "/fortattooartists",
    },
  ];

  const links = [
    {
      id: 1,
      title: "Contact Us",
      url: "/contactus",
    },
    {
      id: 2,
      title: "FAQ",
      url: "/faq",
    },
  ];

  return (
    <footer >
      <div className="footer">
        <div class="container">
          <section class="footer_block">
            <div class="footer_left">
              <div class="footer_logo">
                <Link href="/">
                <Image
                    src={"/Inckd-logo-footer-black.svg"}
                    alt="logo"
                    width={127}
                    height={37}
                    priority
                  />
                </Link>
              </div>
              <ul class="footer_list">
                <li class="footer_title">
                  <h6>Download app on</h6>
                </li>
                <li>
                  <Link href={APP_LINK_APPLE}>
                   
                    <Image
                      src={"/app-store.svg"}
                      alt="AppStore"
                      width={135}
                      height={42}
                      priority
                    />
                  </Link>
                </li>
                <li>
                  <Link href={APP_LINK_GOOGLE}>
                  <Image
                      src={"/g-play.svg"}
                      alt="GooglePlay"
                      width={135}
                      height={42}
                      priority
                    />
                  </Link>
                </li>
              </ul>
            </div>

            <div class="footer_right">
              <ul class="footer_list">
                <li>
                  <h4>Book</h4>
                </li>
                {bookLinks.map((link) => (
                  <li key={link.id}>
                    <Link href={link.url} onClick={()=>serverLoad(true)} >{link.title}</Link>
                  </li>
                ))}
              </ul>
              <ul class="footer_list">
                <li>
                  <h4>Product</h4>
                </li>
                {productLinks.map((link) => (
                  <li key={link.id}>
                    <Link href={link.url}>{link.title}</Link>
                  </li>
                ))}
              </ul>
              <ul class="footer_list">
                <li>
                  <h4>Business</h4>
                </li>
                {businesstLinks.map((link) => (
                  <li key={link.id}>
                    {" "}
                    <Link href={link.url}>{link.title}</Link>{" "}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section class="footer_secondary">
            <div class="foot_links">
              <ul class="links">
                {links.map((e) => {
                  return (
                    <li key={e.id}>
                      {" "}
                      <Link href={e.url} key={e.id}>
                        {e.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div class="social_icons">
              <ul>
                <li class="footer_title">Follow us on</li>
                <li>
                  <Link href={INSTAGRAM_PROFILE_LINK} target="_blank">
                  <Image
                      src={"/insta-icon.svg"}
                      alt="Instagram"
                      width={24}
                      height={25}
                      priority
                    />
                    
                  
                  </Link>
                </li>
                <li>
                  <Link href={FACEBOOK_PROFILE_LINK} target="_blank">
                  <Image
                      src={"/fb-icon.svg"}
                      alt="Facebook"
                      width={24}
                      height={25}
                      priority
                    />
                  
                  </Link>
                </li>
                <li>
                  <Link href={LINKEDIN_PROFILE_LINK} target="_blank">
                  <Image
                      src={"/linkedin-icon.svg"}
                      alt="LinkedIn"
                      width={24}
                      height={25}
                      priority
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </footer>
  );
}
