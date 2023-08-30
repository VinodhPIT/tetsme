import React from 'react'
import { useRouter } from 'next/router';

export default function Deatil({param}) {
   
    const router = useRouter();
    console.log( router.query.detail) // Access the dynamic parameter from the URL

    

  return (
    <div>
      
    </div>
  )
}
