import React from 'react'
import Image from 'next/image'

export default function Flash({data}) {
  return (
    <div>
      <h1>Flash</h1>

      <div className="image_grid">
        {/* {data==[] ? <h4>No Data Found </h4> :
          data.map((item, idx) => {
            if (item._index === "ad") {
              return (
                <div className="image_item" key={`ad-${idx}`}>
                  <p>Add</p>
                </div>
              );
            } else {
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
            }
          })} */}
      </div>


    </div>
  )
}





// export async function getServerSideProps(context) {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/todos/1`)
//   const data = await res.json()
//   console.log(data,"cldsmcklsdckmsdlcmklsdcscs")
 
//   if (!data) {
//     console.log("mxl; mxl; x; ",data)
//     return {
//       notFound: true,
//     }
//   }
 
//   return {
//     props: { data }, // will be passed to the page component as props
//   }
// }