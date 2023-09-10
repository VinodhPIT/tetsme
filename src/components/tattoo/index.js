import React from 'react';
import Image from 'next/image';




import Link from "next/link";


export default function Tattoo({ data }) {


  return (
    <div className="pageContainer">
      <div className="image_grid">
      {
        data.length === 0  ? (
          <h1>No Tattoo found</h1>
        ) : (
          data.map((item, idx) => {
            const key = item._index === "ad" ? `ad-${idx}` : item._id;

            return (
              <Link  href={`/detail/${1}`}  key={key}  >
      
              <div className="image_item" >
                {item._index === "ad" ? (
                  <p>Add</p>
                ) : (
                  <Image
                     priority={true}
                    src={item._source.image}
                    layout="fill"
                    alt={item.artist_name}
                    objectFit="contain"
                    placeholder="blur"
                    blurDataURL= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcLPW/CQAFZAJAYAMfpQAAAABJRU5ErkJggg=='
                                    
                  />
                )}
              </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}

