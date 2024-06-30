import React, { useContext, useEffect, useState } from 'react';
import style from './RecentProducts.module.css';
import axios from 'axios';
import { Await, Link } from 'react-router-dom';
import { Bars } from 'react-loader-spinner'; 
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WhichListContext } from '../../Context/WhichListContext';

export default function RecentProducts() {
  const [isLoading, setIsLoading] = useState(false);
  const [recentProducts, setRecentProducts] = useState([]);
  const [isLoadingSpinner, setIsLoadingSpinner] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  let {addproducttocart}=useContext(CartContext)
let{addProductToWhichList}=useContext(WhichListContext)

// add product to cart
 async function addProduct(productId){
  setIsLoadingSpinner(true)
  let response= await addproducttocart(productId);
  console.log(response);
  if(response.data.status==='success'){
    setIsLoadingSpinner(false)

    toast.success( response.data.message ,{
      position:'top-right'
    })
  }else{
   toast.error(response.data.message)
   setIsLoadingSpinner(false)

  }
  

}



// add product to Which List 
async function addProductWhich(productId){
  
  let response= await addProductToWhichList(productId);
  if(response?.data?.data?.data?.status==='success'){
  

    toast.success( response?.data?.message,{
      position:'top-right'
    })
  }else{
   toast.error(response?.data?.message)
 

  }
  

}





  useEffect(() => {
    setIsLoading(true); 
    axios.get('https://ecommerce.routemisr.com/api/v1/products')
      .then(({ data }) => {
        setIsLoading(false); 
        setRecentProducts(data.data);
      })
      .catch((error) => {
        console.log('Error fetching recent products:', error);
        setIsLoading(false); 
      });
  }, []); 

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-10">
        <Bars
          height={80}
          width={80}
          color="#4fa94d"
          ariaLabel="bars-loading"
          visible={true}
        />
      </div>
    );
  }

  return (
    <div className="row ">
      {recentProducts.map((p) => (
        <div key={p.id} className="md:w-1/2 lg:w-1/4 product">
          <div className="product py-6 px-4">
            <Link to={`/Productdetails/${p.id}`}>
              <img className="w-full" src={p.imageCover} alt={p.title} />
              <span className="block font-light text-green-600">{p.category.name}</span>
              <h3 className="text-lg font-normal text-gray-800 mb-4">{p.title.split(' ').slice(0, 2).join(' ')}</h3>
              <div className="flex justify-between items-center">
                <span> {p.price} EG</span>
                <span>{p.ratingsAverage}<i className="fas fa-star text-yellow-600"></i></span>
              </div>
            </Link>

           <div className='flex justify-between'>
           <button onClick={()=> addProduct(p.id)} className='btn w-3/4 hover:bg-green-700 '>{isLoadingSpinner?<i className='fa fa-spinner fa-spin '></i>:' + add '}</button>
           <i onClick={()=>addProductWhich(p.id)} className={`fa-solid fa-heart text-3xl mt-2 cursor-pointer ${isClicked ? 'text-red-500' : ''}`}></i>
           </div>
          </div>
        </div>
      ))}
    </div>
  );
}
