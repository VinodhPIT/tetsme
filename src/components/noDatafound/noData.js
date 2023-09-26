import React from 'react'
import {useRouter} from 'next/router'
import Image from 'next/image'
import styles from './style.module.css'


export default function NoData({category}) {


const router = useRouter()

const test =()=>{

  router.push(`/search?term=${""}&category=${category}`)

}

  return (
    <div>

   <Image
      src={'/searchIcon.svg'}
      alt="SearchIcon"
       width={30} 
      height={30} 
     
     
    />



      <h1 className={styles.title}>No data found</h1>
      <p className={styles.d}>Try adjusting your search/ filter  to find what you are looking for</p>

      <button onClick={()=>test()} className={styles.button}>
        Explore {category}
      </button>

    </div>
  )
}
