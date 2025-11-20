import React, { useContext, useEffect, useState } from 'react';
import { Bars } from 'react-loader-spinner';
import { CartContext } from '../../Context/CartContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Cart() {
  const [isLoading, setIsLoading] = useState(false);
  const [isClearingCart, setIsClearingCart] = useState(false);
  const [updatingProductId, setUpdatingProductId] = useState(null);
  const [cartDetails, setCartDetails] = useState(null);
  
  const { getLoggedusecart, updataCartItemCount, deleteCartItem, clearCartItem } = useContext(CartContext);

  async function getCartItems() {
    setIsLoading(true);
    try {
      const response = await getLoggedusecart();
      setCartDetails(response.data.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      toast.error("Failed to load cart items");
    } finally {
      setIsLoading(false);
    }
  }

  async function updateCartCount(productId, count) {
    if (count < 1) {
      deleteItem(productId);
      return;
    }
    
    setUpdatingProductId(productId);
    try {
      const response = await updataCartItemCount(productId, count);
      setCartDetails(response?.data?.data);
      toast.success("Cart updated successfully", { duration: 1000 });
    } catch (error) {
      console.error("Error updating cart count:", error);
      toast.error("Failed to update cart");
    } finally {
      setUpdatingProductId(null);
    }
  }

  async function deleteItem(productId) {
    setUpdatingProductId(productId);
    try {
      const response = await deleteCartItem(productId);
      setCartDetails(response?.data?.data);
      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Error deleting cart item:", error);
      toast.error("Failed to remove item");
    } finally {
      setUpdatingProductId(null);
    }
  }

  async function clearCart() {
    setIsClearingCart(true);
    try {
      const response = await clearCartItem();
      setCartDetails(response?.data?.data);
      toast.success("Cart cleared successfully");
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart");
    } finally {
      setIsClearingCart(false);
    }
  }

  useEffect(() => {
    getCartItems();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Bars height={80} width={80} color="#16a34a" ariaLabel="bars-loading" visible={true} />
      </div>
    );
  }

  // Empty Cart State
  if (!cartDetails?.products?.length) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center">
          <i className="fas fa-shopping-cart text-8xl text-gray-300 dark:text-gray-600 mb-6"></i>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Your Cart is Empty
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link 
            to="/" 
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Shopping Cart
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {cartDetails.products.length} item(s) in your cart
        </p>
      </div>

      {/* Cart Summary Card */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-700 rounded-lg p-6 mb-6 shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-700 dark:text-gray-300 text-lg">Total Price</p>
            <p className="text-4xl font-bold text-green-600 dark:text-green-500 mt-1">
              {cartDetails.totalCartPrice} <span className="text-2xl">EGP</span>
            </p>
          </div>
          <div className="hidden sm:block">
            <i className="fas fa-shopping-bag text-6xl text-green-600/20 dark:text-green-500/20"></i>
          </div>
        </div>
      </div>

      {/* Cart Items Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
              <tr>
                <th scope="col" className="px-6 py-4">Product</th>
                <th scope="col" className="px-6 py-4 text-center">Quantity</th>
                <th scope="col" className="px-6 py-4 text-center">Price</th>
                <th scope="col" className="px-6 py-4 text-center">Total</th>
                <th scope="col" className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartDetails.products.map((product) => (
                <tr 
                  key={product.product.id} 
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  {/* Product Info */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={product.product.imageCover}
                        className="w-20 h-20 object-cover rounded-lg shadow-sm"
                        alt={product.product.title}
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 max-w-xs">
                          {product.product.title}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {product.product.category?.name}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Quantity Controls */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => updateCartCount(product.product.id, product.count - 1)}
                        disabled={updatingProductId === product.product.id}
                        className="w-8 h-8 flex items-center justify-center text-gray-600 bg-gray-100 border border-gray-300 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors"
                      >
                        <i className="fas fa-minus text-xs"></i>
                      </button>
                      
                      <span className="w-12 text-center font-semibold text-gray-900 dark:text-white text-lg">
                        {product.count}
                      </span>
                      
                      <button
                        onClick={() => updateCartCount(product.product.id, product.count + 1)}
                        disabled={updatingProductId === product.product.id}
                        className="w-8 h-8 flex items-center justify-center text-gray-600 bg-gray-100 border border-gray-300 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors"
                      >
                        <i className="fas fa-plus text-xs"></i>
                      </button>
                    </div>
                  </td>

                  {/* Unit Price */}
                  <td className="px-6 py-4 text-center">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {product.price} EGP
                    </span>
                  </td>

                  {/* Total Price */}
                  <td className="px-6 py-4 text-center">
                    <span className="font-bold text-green-600 dark:text-green-500 text-lg">
                      {product.price * product.count} EGP
                    </span>
                  </td>

                  {/* Remove Button */}
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => deleteItem(product.product.id)}
                      disabled={updatingProductId === product.product.id}
                      className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400 font-medium disabled:opacity-50 transition-colors"
                    >
                      {updatingProductId === product.product.id ? (
                        <i className="fa fa-spinner fa-spin"></i>
                      ) : (
                        <>
                          <i className="fas fa-trash-alt"></i>
                          <span className="hidden sm:inline">Remove</span>
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <button 
          onClick={clearCart}
          disabled={isClearingCart}
          className="w-full sm:w-auto px-6 py-3 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isClearingCart ? (
            <span className="flex items-center justify-center gap-2">
              <i className='fa fa-spinner fa-spin'></i>
              Clearing...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <i className="fas fa-trash"></i>
              Clear Cart
            </span>
          )}
        </button>

        <Link 
          to={`/address/${cartDetails._id}`}
          className="w-full sm:w-auto px-8 py-3 text-center text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
        >
          <span className="flex items-center justify-center gap-2">
            <i className="fas fa-credit-card"></i>
            Proceed to Checkout
          </span>
        </Link>
      </div>
    </div>
  );
}