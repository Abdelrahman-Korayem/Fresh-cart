import React, { useContext, useEffect, useState } from 'react';
import { WhichListContext } from '../../Context/WhichListContext';
import toast from 'react-hot-toast';
import { Bars } from 'react-loader-spinner';

export default function WhichList() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSpinner, setIsLoadingSpinner] = useState(false);
  const { getWhichList, deleteWhichListItem, addproducttocart } = useContext(WhichListContext);
  const [WhichListDetails, setWhichListDetails] = useState(null);

  async function GetWhichListItem() {
    setIsLoading(true);
    try {
      let response = await getWhichList();
      console.log(response.data.data);
      setWhichListDetails(response.data.data);
    } catch (error) {
      console.error("Error fetching wishlist items:", error);
    }
    setIsLoading(false);
  }

  async function deleteitem(productId) {
    
    try {
      
      let response = await deleteWhichListItem(productId);
      setWhichListDetails(response?.data?.data);
      
    } catch (error) {
      console.error("Error deleting wishlist item:", error);
      
    }
  }

  async function addProduct(productId) {
    setIsLoadingSpinner(true)
    try {
      let response = await addproducttocart(productId);
      setIsLoadingSpinner(false);
      deleteitem(productId);
      if (response.data.status === 'success') {
        toast.success(response.data.status, {
          position: 'top-right',
        });
      } else {
        toast.error(response.data.status);
      }
    } catch (error) {
      setIsLoadingSpinner(false)
      console.error("Error adding product to cart:", error);
      toast.error("Failed to add product to cart");
    }
  }

  useEffect(() => {
    GetWhichListItem();
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
   <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-12">
  <table className="w-full mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-4 sm:px-6 py-3"></th>
        <th scope="col" className="px-4 sm:px-6 py-3">Product</th>
        <th scope="col" className="px-4 sm:px-6 py-3">Price</th>
        <th scope="col" className="px-4 sm:px-6 py-3"></th>
      </tr>
    </thead>
    <tbody>
      {WhichListDetails?.length ? (
        WhichListDetails.map((product, index) => (
          <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="p-4">
              <img src={product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product?.title} />
            </td>
            <td className="px-4 sm:px-6 py-4 font-semibold text-gray-900 dark:text-white">{product?.title}</td>
            <td className="px-4 sm:px-6 py-4 font-semibold text-gray-900 dark:text-white">{product.price} EGP</td>
            <td className="px-4 sm:px-6 py-4 space-x-20">
              <span onClick={() => deleteitem(product.id)} className="remove-link cursor-pointer flex items-center space-x-2">
                <i className="remove-icon fa-solid fa-trash"></i> Remove
              </span>
              <button onClick={() => addProduct(product.id)} className="border-2 rounded-xl text-white bg-green-600 p-3 hover:bg-green-700">
                {isLoadingSpinner ? <i className='fa fa-spinner fa-spin'></i> : 'Add to Cart'}
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="4" className="text-3xl text-center text-green-600 py-4">Your Wish List is empty</td>
        </tr>
      )}
    </tbody>
  </table>
</div>



    </>
  );
}
