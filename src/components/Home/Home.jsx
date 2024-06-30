import React, { useEffect, useState } from 'react'

import style from './Home.module.css'
import RecentProducts from '../RecentProducts/RecentProducts'
import CategorySlider from '../CategorySlider/CategorySlider'
import Categories from '../Categories/Categories'
import Mainclider from '../Mainclider/Mainclider'
export default function Home() {
    const [first, setfirst] = useState(0)
    useEffect(()=>{},[])


  return (

<>
<Mainclider ></Mainclider>
<CategorySlider/>
<RecentProducts></RecentProducts>



</>


  )
}
