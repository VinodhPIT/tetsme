import React from 'react'
import Search from '@/pages/search/index'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
const DynamicHeader = dynamic(() => import('@/pages/search/index'), {
    loading: () => <p>Loading...</p>,
  })

  

export default function Testme() {
const router = useRouter()




    return <DynamicHeader  data={[]} initialTab={router.query.category}  />
}
