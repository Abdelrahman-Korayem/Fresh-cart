import React, { useEffect, useState } from 'react'

import style from './Brands.module.css'
import axios from 'axios';
export default function Brands() {
  const [isLoading, setIsLoading] = useState(false);
  const [recentProducts, setRecentProducts] = useState([]);
    const [first, setfirst] = useState(0)
    useEffect(() => {
      setIsLoading(true); 
      axios.get('https://ecommerce.routemisr.com/api/v1/brands')
        .then(({ data }) => {
          // setIsLoading(false); 
          console.log(data.data);
          setRecentProducts(data.data);
        })
        .catch((error) => {
          console.log('Error fetching recent products:', error);
          // setIsLoading(false); 
        });
    }, []); 

  return (

<>
<div>
  <p className='text-center text-green-600 m-10 text-6xl'>All Brands</p>
</div>

<div className="row ">
      {recentProducts.map((p) => (
        <div key={p.id} className="lg:w-1/4 product ">
          <div className="product py-6 px-4">
            
              <img className="object-contain  object-center" src={p.image} alt={p.name} />
             <div>
             <span className="block font-light text-green-900 text-center text-2xl">{p.name}</span>
             </div>
              
              
            
           
          </div>
        </div>
      ))}
    </div>



</>


  )
}
