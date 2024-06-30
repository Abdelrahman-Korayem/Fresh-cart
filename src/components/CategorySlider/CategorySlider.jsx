import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import style from './CategorySlider.module.css'
import axios from 'axios';




export default function CategorySlider() {
  const [Categories, setCategories] = useState([]);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    appendDots: dots => <ul>{dots}</ul>,
  };

  function getCategories() {
    axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      .then(({ data }) => {

        setCategories(data.data);
        console.log(data.data);
      })
      .catch((Error) => {
        console.log(Error);
      })
  }


  useEffect(() => {
    getCategories();
  }, []);



  return (

    <>

  <div className='py-5 '>
  <Slider {...settings}>
        {Categories.map((cat, index) => (
          <div key={index} >
            <img className='cat-img' src={cat.image} alt={cat.name} />
            <h3 className='mt-2 font-bold'>{cat.name}</h3>
          </div>
        ))}
      </Slider>
  </div>



    </>


  )
}
