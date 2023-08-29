import React from 'react'

export default function Testme() {
  return (
    <div>
        <h1>cdcldkckdcdcd</h1>
      
    </div>
  )
}



export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await res.json()
    console.log(data,"cmldl;mclsd;mc")
   
    // Pass data to the page via props
    return { props: { data } }
  }
   




