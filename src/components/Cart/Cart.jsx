import React, { useContext, useEffect, useState } from 'react';
import { Bars } from 'react-loader-spinner';
import style from './Cart.module.css';
import { CartContext } from '../../Context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const [isLoading, setIsLoading] = useState(false);
  const { getLoggedusecart, updataCartItemCount, deleteCartItem, clearCartItem } = useContext(CartContext);
  const [CartDetails, setCartDetails] = useState(null);
  const [isLoadingSpiner, setIsLoadingSpiner] = useState(false);


  async function GetCartItem() {
    setIsLoading(true);
    try {
      let response = await getLoggedusecart();
      console.log(response.data.data);
      setCartDetails(response.data.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
    setIsLoading(false);
  }

  async function updataCartCount(productId, count) {
    try {
      let response = await updataCartItemCount(productId, count);
      setCartDetails(response?.data?.data);
    } catch (error) {
      console.error("Error updating cart count:", error);
    }
  }

  async function deleteitem(productId) {
    setIsLoading(true);

    try {
      let response = await deleteCartItem(productId);
      setCartDetails(response?.data?.data);
      setIsLoading(false);

    } catch (error) {
      console.error("Error deleting cart item:", error);
      setIsLoading(false);

    }
  }

  async function clearcart() {
    setIsLoadingSpiner(true);
    try {
      let response = await clearCartItem();
      setCartDetails(response?.data?.data);
      setIsLoadingSpiner(false);

    } catch (error) {
      console.error("Error clearing cart:", error);
      setIsLoadingSpiner(false);

    }
  }

  useEffect(() => {
    GetCartItem();
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
    <>
    
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <h3 className='text-center p-6 '>Total Price: <span className='text-green-600 text-2xl'>{CartDetails?.totalCartPrice}</span> EGP</h3>
        <table className="w-full mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {CartDetails?.products?.length ? (
              CartDetails.products.map((product, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="p-4">
                    <img
                      src={product.product.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt={product.product.title}
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.product.title}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button
                        onClick={() => updataCartCount(product.product.id, product.count - 1)}
                        className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                      >
                        <span className="sr-only">Decrease quantity</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                        </svg>
                      </button>
                      <div>
                        <span>{product.count}</span>
                      </div>
                      <button
                        onClick={() => updataCartCount(product.product.id, product.count + 1)}
                        className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                      >
                        <span className="sr-only">Increase quantity</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.price} EGP
                  </td>
                  <td className="px-6 py-4">
                    <span onClick={() => deleteitem(product.product.id)} className="remove-link cursor-pointer">
                      <i className="remove-icon fa-solid fa-trash"></i>
                      Remove 
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <p className='text-3xl text-center text-green-600 '>Your cart is empty</p>
            )}
          </tbody>
        </table>
      </div>
      <div className='flex justify-between'>
      <button onClick={clearcart} type="button" className="m-6 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"> {isLoadingSpiner?<i className='fa fa-spinner fa-spin '></i>:'Clear Cart'}</button>
<Link to={"/address/" + CartDetails?._id }  type="button" className='border rounded-xl border-green-600 px-5 py-3 hover:bg-green-700 m-3'>check out</Link> 

      </div>
    </>
  );
}
