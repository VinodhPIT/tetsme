import React from 'react'
import { useRouter } from 'next/router';
import {fetchTattooDetail} from '@/action/action'

export default function Deatil({param}) {
   
    const router = useRouter();
    console.log( router.query.detail) // Access the dynamic parameter from the URL

    

  return (
    <div>
      
    </div>
  )
}






export async function getServerSideProps(context) {
  try {
      const data = await fetchTattooDetail(context.query.detail);
      console.log(data,"clmd;mcld")
      return {
        props: {
          data,
        },
      };
    
  } catch (error) {
    console.log(error,"error")
    return {
      props: {
        data: null,
      },
    };
  }
}