import React from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import styles from "./footer.module.css";


const bookLinks = [
  {
    id: 1,
    title: "Tattoosearch",
    url: "/tattoosearch",
  },

  {
    id: 2,
    title: "Artistsearch",
    url: "/artistsearch",
  },
  {
    id: 3,
    title: "Flashsearch",
    url: "/flashsearch",
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
    id: 1,
    title: "For Tattoostudios",
    url: "/fortattoostudios",
  },

  {
    id: 2,
    title: "For Tattooartists",
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

]



const Footer = () => {
  return (
    <footer style={{"background":"#000"}}   className={styles.foot}>
      <div style={{"display":"flex"}} className={styles.footDiv}>


        <div>
        <h4>Book</h4>

<ul>

{bookLinks.map((link) => (
       <li  key={link.id}><Link  href={link.url}>
       {link.title}
     </Link></li>   
        ))}

</ul>
       
        </div>

        <div>
        <h4>Product</h4>
<ul>
{productLinks.map((link) => (
        <li key={link.id}>
            <Link  href={link.url}>
            {link.title}
          </Link>
        </li>  
        ))}

</ul>
        </div>
        
        
       <div>
       <h4>Business</h4>
        <ul>

{businesstLinks.map((link) => (
    <li key={link.id} > <Link href={link.url}>
    {link.title}
  </Link>  </li>   
        ))}

        </ul>
       </div>

      

   
      </div>
      <div>

<div className={styles.cccccs}>
{links.map((e)=>{
return <Link href={e.url} key={e.id}>
{e.title}
</Link> 



})}
</div>




        {/* <Image src="/next.svg" width={15} height={15} alt="" />
        <Image src="/next.svg" width={15} height={15} alt="" />
        <Image src="/next.svg" width={15} height={15} alt="" />
 */}




      </div>
    </footer>
  );
};

export default Footer;
