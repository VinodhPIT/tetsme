import React from "react";
import Link from "next/link";
import styles from "./header.module.css";



const links = [
 

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
    title: "For Tattooartists",
    url: "/fortattooartists",
  },
  {
    id: 5,
    title: "Join Artists",
    url: "/joinartist",
  },



];

const Navbar =  () => {



  return (
    <header>
        <div className={styles.headConatiner}>

       
      <div className={styles.logo}>
        <Link href="/" style={{"color":"#fff"}}>Logo.</Link>
      </div>
      <nav className={styles.navmenu}>
       <ul className={styles.kk}>
       {links.map((link) => (
        <li key={link.id}><Link  href={link.url}>
        {link.title}
      </Link></li>  
        ))}
        
        </ul>
      </nav>
   
      </div>
    </header>
  );
};

export default Navbar;
