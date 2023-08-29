import React from 'react'

export default function Testme1() {
  return (
    <div>
        <h1>ckdcdcd</h1>
      
    </div>
  )
}



export async function getServerSideProps() {
try {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments')
    const data = await res.json()
    console.log(data,"mc")
   
    // Pass data to the page via props
    return { props: { data } }


} catch (error) {
    console.log(error,"dcmdlcs;")
}

    // Fetch data from external API
  



  }
   




