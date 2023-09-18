import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import SideDrawer from "@/components/sideDrawer/sideDrawer";
import Image from 'next/image'


export default function Header({logo}) {

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
      <header className="header_wrapper">
        <div>
          <div className="container">
            <nav className="navheader">
              <div className="logo-Section">
                <Link href={"/"} className="navbar_brand">

             <Image
        src="/inckd-logo.svg"
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
                      <Link href={link.url} className="textWhite">{link.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="header_right">
                <button
                  type="button"
                  onClick={() => router.push("/fortattooartists")}
                  className="btn btn_tattoo_art"
                  style={{"background":"#000" ,color:"#fff"}}
                >
                  For Tattoo Artists
                </button>


                <Image
                 onClick={() => onToggle(true)}
        src="/Hamburger Menu.png"
        alt="Picture of the author"
        width={30}
        height={30}
        priority
        
      /> 

           

              </div>
            </nav>
          </div>
        </div>
      </header>

      {toggle === true ? <SideDrawer onCloseToggle={onCloseToggle} /> : null}
    </>
  );
}
