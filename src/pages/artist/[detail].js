import React from 'react'

import { useRouter } from 'next/router';


export default function ArtistDetail({param}) {

    const router = useRouter();
    console.log( router.query.detail) // Access the dynamic parameter from the URL


  return (
    <div>



      
    </div>
  )
}














