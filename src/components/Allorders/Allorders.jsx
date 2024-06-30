import React, { useEffect, useState } from 'react'
Link
import style from './Allorders.module.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function Allorders() {
  const [isLoading, setIsLoading] = useState(false);
  const [recentProducts, setRecentProducts] = useState([]); 



    useEffect(() => {
      setIsLoading(true); 
      axios.get('https://ecommerce.routemisr.com/api/v1/orders')
        .then(({ data }) => {
          setIsLoading(false); 
          setRecentProducts(data.data);
          console.log(data.data);
        })
        .catch((error) => {
          console.log('Error fetching recent products:', error);
          setIsLoading(false); 
        });
    }, []); 


  return (

<>

<div className="row ">
      {recentProducts?.map((p) => (
        <div key={p.id} className="md:w-1/2 lg:w-1/4 product">
          <div className="product py-6 px-4">
            
              <img className="w-full" src={p.cartItems?.product?.category?.imageCover} alt={p.title} />
              <span className="block font-light text-green-600">{p?.cartItems?.product?.category?.name}</span>
              <h3 className="text-lg font-normal text-gray-800 mb-4">{p?.cartItems?.product?.title?.split(' ').slice(0, 2).join(' ')}</h3>
            
            

           
          </div>
        </div>
      ))}
    </div>



</>


  )
}
