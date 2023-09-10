import React from "react";
import Image from "next/image";
import PageLoad from "@/components/Loading/pageLoad";
import { useGlobalState } from "@/context/Context";

import Link from "next/link";

export default function Tattoo({ data }) {
  const { state } = useGlobalState();

  return (
    <div className="pageContainer">
      <div className="image_grid">
        {state.loading ? (
          <PageLoad />
        ) : data.length === 0 ? (
          <h4>No Data Found</h4>
        ) : (
          data.map((item, idx) => {
            const key = item._index === "ad" ? `ad-${idx}` : item._id;

            return (
              <Link href={`/detail/${1}`} key={key}>
                <div className="image_item">
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
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcLPW/CQAFZAJAYAMfpQAAAABJRU5ErkJggg=="
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
