import React from 'react'
import { useRouter } from 'next/router'
export default function Detail() {
  const router = useRouter()

 
  return (
    <div>
      <p>Detail: {router.query.tabs}</p>
    </div>
  )
}
