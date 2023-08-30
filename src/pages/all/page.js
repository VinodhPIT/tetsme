import React from 'react'
import Image from 'next/image'

export default function  All ({data}) {
   
  return (
    <div>
      <h1>All Items</h1>

      <div className="image_grid">
        {/* {data==[] ? <h4>No Data Found </h4> :
          data.map((item, idx) => {
            if (item._index === "tattoo") {
              return (
                <div className="image_item" key={item._id}>
                <Image
                  src={item._source.image}
                  layout="fill"
                  alt={'l;cm;sdcm;lsdcm;sc'}
                  objectFit="contain"
                  priority={true}
                  placeholder="blur"
                  blurDataURL= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcLPW/CQAFZAJAYAMfpQAAAABJRU5ErkJggg=='
                     
                />
              </div>
              );
            } else {
              return (
                <div className="image_item" key={item._id}>
                  <Image
                    src={item._source.image_url}
                    layout="fill"
                    alt={'l;cm;sdcm;lsdcm;sc'}
                    objectFit="contain"
                    priority={true}
                    placeholder="blur"
                    blurDataURL= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcLPW/CQAFZAJAYAMfpQAAAABJRU5ErkJggg=='
                       
                  />
                </div>
              );
            }
          })} */}
      </div>


    </div>
  )
}



