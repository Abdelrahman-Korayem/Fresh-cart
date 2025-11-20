import React, { useContext, useEffect, useState } from 'react';
import { WhichListContext } from '../../Context/WhichListContext';
import toast from 'react-hot-toast';
import { Bars } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

export default function WhichList() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProductId, setLoadingProductId] = useState(null);
  const [deletingProductId, setDeletingProductId] = useState(null);
  const [wishlistDetails, setWishlistDetails] = useState(null);
  
  const { getWhichList, deleteWhichListItem, addproducttocart } = useContext(WhichListContext);

  async function getWishlistItems() {
    setIsLoading(true);
    try {
      const response = await getWhichList();
      setWishlistDetails(response.data.data);
    } catch (error) {
      console.error("Error fetching wishlist items:", error);
      toast.error("Failed to load wishlist");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteItem(productId) {
    setDeletingProductId(productId);
    try {
      const response = await deleteWhichListItem(productId);
      setWishlistDetails(response?.data?.data);
      toast.success("Item removed from wishlist");
    } catch (error) {
      console.error("Error deleting wishlist item:", error);
      toast.error("Failed to remove item");
    } finally {
      setDeletingProductId(null);
    }
  }

  async function addToCart(productId) {
    setLoadingProductId(productId);
    try {
      const response = await addproducttocart(productId);
      if (response.data.status === 'success') {
        toast.success("Added to cart successfully");
        await deleteItem(productId);
      } else {
        toast.error("Failed to add to cart");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Failed to add product to cart");
    } finally {
      setLoadingProductId(null);
    }
  }

  useEffect(() => {
    getWishlistItems();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Bars height={80} width={80} color="#16a34a" ariaLabel="bars-loading" visible={true} />
      </div>
    );
  }

  // Empty Wishlist State
  if (!wishlistDetails?.length) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center">
          <i className="fas fa-heart text-8xl text-gray-300 dark:text-gray-600 mb-6"></i>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Your Wishlist is Empty
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Save your favorite items here to find them easily later.
          </p>
          <Link 
            to="/" 
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            Start Shopping
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
          My Wishlist
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {wishlistDetails.length} item(s) in your wishlist
        </p>
      </div>

      {/* Wishlist Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistDetails.map((product) => (
          <div 
            key={product.id} 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group relative"
          >
            {/* Remove Button - Top Right */}
            <button
              onClick={() => deleteItem(product.id)}
              disabled={deletingProductId === product.id}
              className="absolute top-3 right-3 z-10 w-10 h-10 flex items-center justify-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full text-red-500 hover:text-white hover:bg-red-500 transition-all shadow-md disabled:opacity-50"
              title="Remove from wishlist"
            >
              {deletingProductId === product.id ? (
                <i className="fa fa-spinner fa-spin"></i>
              ) : (
                <i className="fas fa-times text-lg"></i>
              )}
            </button>

            {/* Product Image */}
            <Link to={`/Productdetails/${product.id}`} className="block relative overflow-hidden">
              <img 
                className="w-full h-[250px] object-cover transform group-hover:scale-110 transition-transform duration-300" 
                src={product.imageCover} 
                alt={product.title}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
            </Link>

            {/* Product Details */}
            <div className="p-4">
              <Link to={`/Productdetails/${product.id}`}>
                {/* Category */}
                {product.category?.name && (
                  <span className="inline-block text-xs font-medium text-green-600 dark:text-green-500 mb-2">
                    {product.category.name}
                  </span>
                )}

                {/* Title */}
                <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-3 line-clamp-2 hover:text-green-600 dark:hover:text-green-500 transition-colors min-h-[48px]">
                  {product.title}
                </h3>

                {/* Price and Rating */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    {product.price} EGP
                  </span>
                  {product.ratingsAverage && (
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {product.ratingsAverage}
                      </span>
                      <i className="fas fa-star text-yellow-400 text-sm"></i>
                    </div>
                  )}
                </div>
              </Link>

              {/* Add to Cart Button */}
              <button 
                onClick={() => addToCart(product.id)}
                disabled={loadingProductId === product.id}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
              >
                {loadingProductId === product.id ? (
                  <span className="flex items-center justify-center gap-2">
                    <i className='fa fa-spinner fa-spin'></i>
                    Adding...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <i className="fas fa-cart-plus"></i>
                    Add to Cart
                  </span>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Actions */}
      <div className="mt-8 text-center">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400 font-medium transition-colors"
        >
          <i className="fas fa-arrow-left"></i>
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}