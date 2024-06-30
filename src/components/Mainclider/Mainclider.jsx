import React, { useEffect, useState } from 'react'
import mainslider from '../../assets/slider-1.jpg'
import slide1 from '../../assets/slider-2.jpg'
import slide2 from '../../assets/slider-3.jpg'
import slide3 from '../../assets/slider-4.jpg'
import slide4 from '../../assets/slider-5.jpg'
import style from './Mainclider.module.css'
import Slider from "react-slick";

export default function Mainclider() {
  const [first, setfirst] = useState()
  useEffect(() => { }, [])
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    
  };



  return (

    <>

      <div className='row justify-center  '>
        <div className='w-1/4'>
          <Slider {...settings}>
          <img src={mainslider} className='w-full h-[400px]' alt="" />
          <img src={slide1} className='w-full h-[400px]' alt="" />
          <img src={slide2} className='w-full h-[400px]' alt="" />

          </Slider>
        </div>
        <div>
          <img className='w-full h-[200px]' src={slide3} alt="" />
          <img className='w-full h-[200px]' src={slide4} alt="" />

        </div>
      </div>



    </>


  )
}
