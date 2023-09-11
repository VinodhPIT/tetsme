import React from 'react'
import Link from "next/link";
import { Router } from 'next/router';
 import { useRouter } from "next/router";
 import { Figtree } from 'next/font/google'
 const figtree = Figtree({
     style: ['normal',],
     weight: ['400', '700','900','600'],
     subsets: ['latin'],
   })
   
   




export default function Header() {

 

  const links = [
    {
      id: 1,
      title: "Tattoo search",
      url: "/tattoosearch",
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


  const router = useRouter()
  return (
   

      <header  className="header_wrapper">
			<div  className={figtree.className} >
				<div className="container">
					<nav className="navbar">


						<Link href={'/'} className="navbar_brand" >
							<img className="logo" src="./inckd-logo.svg" alt=""/>
						</Link>


						<div className="nav_right_block">
							<ul className="nav main_nav navbar_collapse collapse">


                      {links.map((link) => (
              <li key={link.id} className="nav_item">
                <Link   href={link.url}>{link.title}</Link>
              </li>
            ))}


							</ul>



							<div className="header_right">



								<button type="button"  onClick={()=>router.push('/fortattooartists')} className="btn btn_tattoo_art navbar_collapse collapse" >For Tattoo Artists</button>

								<button className="navbar_toggler" type="button" data-toggle="collapse"
									data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
									aria-label="Toggle navigation">
									<span></span>
									<span></span>
									<span></span>
								</button>
					
							</div>


						</div>

					</nav>
				</div>
			</div>
		</header>	
      
    
  )
}
