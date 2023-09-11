import React from 'react'

export default function HomeLoading() {
  return (
    <div style={{    position: 'absolute',
        width: '100%',
        height: '100%',
      
        top: 0,
        left: 0,
        right: 0,
     
    }}>
        <div style={{   
    position: 'absolute',
    top: '50%',
    left:' 50%',
    transform: 'translate(-50%, -50%)',

    }}>
        <h1 style={{"color":"#fff"}}>Loading</h1>


        </div>


      
    </div>
  )
}
