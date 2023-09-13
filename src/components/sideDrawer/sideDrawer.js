import React ,{useState} from "react";
import Link from "next/link";
import  styles from './sideDrawer.module.css'
import Image from 'next/image'


export default function SideDrawer({onCloseToggle}) {
  const links = [
    {
      id: 1,
      title: "Home",
      url: `/`,
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

    {
      id: 5,
      title: "For tattoo artists",
      url: "/fortattooartists",
    },

    {
      id: 6,
      title: "contactus",
      url: "/Contact Us",
    },
  ];




  return (
    <div className={styles.sideDrawer}>
<div className={styles.closeWrapper}>

      <Image
      onClick={()=>onCloseToggle()}
      src="/close.png"
      width={50}
      height={50}
      alt="close"
    />

</div>
       
      <ul className={styles.menuList}>
        {links.map((link) => (
          <li key={link.id} >
            <Link href={link.url}onClick={()=>onCloseToggle()}>{link.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
