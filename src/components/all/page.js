import React from 'react'
import Image from 'next/image'
import styles from '@/components/styles/search.module.css'


export default function  All ({data ,loading}) {
   
  return (
    <div>
      <h1>All Items</h1>



      {data.length=== 0 ? <h4>No Data Found </h4>    :


      <div className={styles.gridWrapper}>
 
          {data.map((item, idx) => {
            if (item._index === "tattoo") {
              return (
                <div className={styles.gridItem} key={item._id}>
                <Image
                  src={item._source.image}
                  layout="fill"
                  alt={'l;cm;sdcm;lsdcm;sc'}
                  objectFit="cover"
                  priority={true}
                  placeholder="blur"
                  blurDataURL= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcLPW/CQAFZAJAYAMfpQAAAABJRU5ErkJggg=='
                     
                />
              </div>
              );
            } else {
              return (
                <div className={styles.gridItem}key={item._id}>
                  <Image
                    src={item._source.image_url}
                    layout="fill"
                    alt={'l;cm;sdcm;lsdcm;sc'}
                    objectFit="cover"
                    priority={true}
                    placeholder="blur"
                    blurDataURL= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcLPW/CQAFZAJAYAMfpQAAAABJRU5ErkJggg=='
                       
                  />
                </div>
              );
            }
          })} 
      </div>
}

    </div>
  )
}



