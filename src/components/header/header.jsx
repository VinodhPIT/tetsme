import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import SideDrawer from "@/components/sideDrawer/sideDrawer";



export default function Header() {



  

  const [toggle, setToggle] = useState(false);

  const onToggle = () => {
    setToggle(true);
  };

  const onCloseToggle = () => {
    setToggle(false);
  };

  const links = [
    {
      id: 1,
      title: "Tattoo search",
      url: `/search?term=${""}&category=${"tattoo"}`,
    },
    {
      id: 2,
      title: "Styleguide",
      url: "/styleguide",
    },
    {
      id: 3,
      title: "Dictionary",
      url: "/dictionary",
    },

    {
      id: 4,
      title: "Klarna",
      url: "/klarna",
    },

    // {
    //   id: 5,
    //   title: "Join Artist",
    //   url: "/joinartist",
    // },
  ];

  const router = useRouter();
  return (
    <>
      <header className="header_wrapper">
        <div>
          <div className="container">
            <nav className="navbar">
              <div className="logo-Section">
                <Link href={"/"} className="navbar_brand">
                  <img className="logo" src="./inckd-logo.svg" alt="" />
                </Link>
              </div>

              <div className="nav-block">
                <ul className="nav main_nav navbar_collapse collapse">
                  {links.map((link) => (
                    <li key={link.id} className="nav_item">
                      <Link href={link.url}>{link.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="header_right">
                <button
                  type="button"
                  onClick={() => router.push("/fortattooartists")}
                  className="btn btn_tattoo_art navbar_collapse collapse"
                >
                  For Tattoo Artists
                </button>

                <button
                  onClick={() => onToggle(true)}
                  className="navbar_toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarNavDropdown"
                  aria-controls="navbarNavDropdown"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {toggle === true ? <SideDrawer onCloseToggle={onCloseToggle} /> : null}
    </>
  );
}
