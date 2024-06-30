import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContext'
import { Bars } from 'react-loader-spinner';
import style from './ProductDetails.module.css'
import toast from 'react-hot-toast';
import Slider from "react-slick";

import { useParams } from 'react-router-dom'
import axios from 'axios';
export default function ProductDetails() {

  let { addproducttocart  } = useContext(CartContext)

  let { id } = useParams();

  const [ProductDetails, setProductDetails] = useState(null)
  function getproductdetails(id) {


    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setProductDetails(data.data)
      })
      .catch(() => {

      })
  }
  async function addProduct(productId){

    let response= await addproducttocart(productId);
    if(response.data.status==='success'){
      toast.success( response.data.status ,{
        position:'top-right'
      })
    }else{
     toast.error(response.data.status)
    }
    
  
  }
  useEffect(() => {
    getproductdetails(id)
  }, [])
  console.log(ProductDetails);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (

    <>

      <div className="row">
        <div className="w-1/4">
        <Slider {...settings}>
            {ProductDetails?.images.map( (src) => <img className="w-full" src={src} alt={ProductDetails?.title} /> )}
          </Slider>
        </div>
        <div className="w-3/4 p-6 my-4">
          <h1 className='text-lg font-normal text-gray-600  '>{ProductDetails?.title}</h1>
          <p >{ProductDetails?.description}</p>
          <div className='flex justify-between items-center p-5'>
          <span>{ProductDetails?.price}EG</span>
          <span>{ProductDetails?.ratingsAverage}<i className='fas fa-star text-yellow-600'></i></span>
          
        </div>
        <button onClick={()=> addProduct(ProductDetails?.id)} className='w-full text-white bg-green-600 rounded-xl p-2'>add to cart</button>
        </div>
        

      </div>


    </>


  )
}
