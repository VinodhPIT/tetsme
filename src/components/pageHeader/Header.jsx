import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import SideDrawer from "@/components/sideDrawer/sideDrawer";
import Image from 'next/image'


export default function PageHeader({logo ,theme ,isPosition}) {



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
  ];

  const router = useRouter();
  return (
    <>
      <header className= {isPosition === true ? "header_wrapper" : null}>
        <div>
          <div className="container">
            <nav className="navheader">
              <div className="logo-Section">
                <Link href={"/"} className="navbar_brand">

             <Image
        src={logo}
        alt="Logo"
        width={105}
        height={31}
        priority
      /> 
                  



                </Link>
              </div>

              <div className="nav-block">
                <ul className="nav main_nav navbar_collapse collapse">
                  {links.map((link) => (
                    <li key={link.id} className="nav_item">
                      <Link href={link.url} className= {theme==="black" ? 'textWhite' :"textBlack"}>{link.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="header_right">
              <button
  type="button"
  onClick={() => router.push("/fortattooartists")}
  className={`btn btn_tattoo_art ${theme === "black" ? 'bgWhite' : 'bgBlack'}`}>
  For Tattoo Artists
</button>



{theme==="white" ? 
                <Image
                 onClick={() => onToggle(true)}
        src="/blackHamburger.svg"
        alt="hamburger"
        width={30}
        height={30}
        priority
        
      />   :  
<Image
                 onClick={() => onToggle(true)}
        src="/Hamburger Menu.png"
        alt="hamburger"
        width={30}
        height={30}
        priority/>
                  }
           

              </div>
            </nav>
          </div>
        </div>
      </header>

      {toggle === true ? <SideDrawer onCloseToggle={onCloseToggle} /> : null}
    </>
  );
}
