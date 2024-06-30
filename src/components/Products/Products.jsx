import React, { useEffect, useState } from 'react'

import style from './Products.module.css'
import RecentProducts from '../RecentProducts/RecentProducts'
export default function Products() {
    const [first, setfirst] = useState(0)
    useEffect(()=>{},[])


  return (

<>

<RecentProducts></RecentProducts>



</>


  )
}
