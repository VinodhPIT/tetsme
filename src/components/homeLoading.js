import React from 'react'
import style  from '@/components/loading/loading.module.css'


export default function HomeLoading() {
  return (
    <div style={{    position: 'absolute',
        width: '100%',
        height: '100%',
      background:"#000", opacity:0.7,
        top: 0,
        left: 0,
        right: 0, 
     zIndex:999,
    }}>
        <div style={{   
    position: 'absolute',
    top: '11%',
    left:' 50%',
    transform: 'translate(-50%, -50%)',

    }}>



<div className={style.loader}></div>






        </div>


      
    </div>
  )
}
