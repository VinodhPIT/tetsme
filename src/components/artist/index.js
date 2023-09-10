import React from 'react'
import Image from 'next/image'

//

export default function Artist({data}) {

 

  return (
    <div>
      <h1>Artist</h1>

      <div className="image_grid">




    {data.length===0 ? <h4>No Data Found </h4> :
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
                  
                    src={item._source.image_url}
                    layout="fill"
                    alt={'test'}
                    objectFit="contain"
                    priority={true}
                    placeholder="blur"
                    
                    blurDataURL= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcLPW/CQAFZAJAYAMfpQAAAABJRU5ErkJggg=='
                       
                  />
                </div>
              );
            }
          })} 





      </div>


    </div>
  )
}






// export async function getServerSideProps(contex) {
//   console.log(contex,"cldsc")

//   // Fetch data from external API
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
//   const data = await res.json()
//   console.log(data,"dlmcd;mc;ldcldsc;mdc")
 
//   // Pass data to the page via props
//   return { props: { data } }
// }
