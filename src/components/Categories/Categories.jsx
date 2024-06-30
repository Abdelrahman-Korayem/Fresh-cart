import React, { useEffect, useState } from 'react'

import style from './Categories.module.css'
import axios from 'axios'
import Login from './../Login/Login';
export default function Categories() {
  const [isLoading, setIsLoading] = useState(false);
  const [recentProducts, setRecentProducts] = useState([]);
    const [first, setfirst] = useState(0)
    useEffect(() => {
      setIsLoading(true); 
      axios.get('https://ecommerce.routemisr.com/api/v1/categories')
        .then(({ data }) => {
          setIsLoading(false); 
          console.log(data.data);
          setRecentProducts(data.data);
        })
        .catch((error) => {
          console.log('Error fetching recent products:', error);
          setIsLoading(false); 
        });
    }, []); 

  return (

<>

<div className="row flex flex-wrap">
  {recentProducts.map((p,index) => (
    <div key={index} className="lg:w-1/3 w-full p-4">
      <div className="category border-2 rounded-lg">
       <div>
       <img className="object-cover h-[500px] w-full" src={p.image} alt={p.name} />
       </div>
        <span className="block mt-4 font-bold text-2xl m-2 text-green-600 text-center">{p.name}</span>
      </div>
    </div>
  ))}
</div>



</>


  )
}
