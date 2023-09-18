import React from 'react'
import style from  './loading/loading.module.css'

export default function PageLoad() {
  return (
    <div>
<div className={style.loader}></div>
<p style={{"marginTop":"10px"}}>Loading...</p>
    </div>

    
  )
}
