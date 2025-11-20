import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Bars } from 'react-loader-spinner'; 
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WhichListContext } from '../../Context/WhichListContext';

export default function RecentProducts() {
  const [isLoading, setIsLoading] = useState(false);
  const [recentProducts, setRecentProducts] = useState([]);
  const [loadingProductId, setLoadingProductId] = useState(null);
  const [wishlistItems, setWishlistItems] = useState(new Set());
  
  const { addproducttocart } = useContext(CartContext);
  const { addProductToWhichList } = useContext(WhichListContext);

  // Add product to cart
  async function addProduct(productId) {
    setLoadingProductId(productId);
    try {
      const response = await addproducttocart(productId);
      if (response.data.status === 'success') {
        toast.success(response.data.message, {
          position: 'top-right',
          duration: 2000,
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Failed to add product to cart');
    } finally {
      setLoadingProductId(null);
    }
  }

  // Add product to wishlist
  async function addProductToWishlist(productId) {
    try {
      const response = await addProductToWhichList(productId);
      if (response?.data?.status === 'success') {
        setWishlistItems(prev => new Set([...prev, productId]));
        toast.success(response?.data?.message || 'Added to wishlist', {
          position: 'top-right',
          duration: 2000,
        });
      } else {
        toast.error(response?.data?.message || 'Failed to add to wishlist');
      }
    } catch (error) {
      toast.error('Failed to add to wishlist');
    }
  }

  // Fetch products
  async function getRecentProducts() {
    setIsLoading(true);
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
      setRecentProducts(data.data);
    } catch (error) {
      console.error('Error fetching recent products:', error);
      toast.error('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getRecentProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Bars
          height={80}
          width={80}
          color="#16a34a"
          ariaLabel="bars-loading"
          visible={true}
        />
      </div>
    );
  }

  return (
   <div className="container mx-auto px-4 py-8">
  {/* Section Header */}
  <div className='mb-10 text-center'>
    <h2 className='text-4xl font-bold text-gray-900 dark:text-white mb-3'>
      Recent Products
    </h2>
    <p className='text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto'>
      Discover our latest collection of premium products
    </p>
  </div>

  {/* Products Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
    {recentProducts.map((product) => (
      <div 
        key={product.id} 
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group border border-gray-100 dark:border-gray-700"
      >
        {/* Product Image */}
        <Link to={`/Productdetails/${product.id}`} className="block relative overflow-hidden">
          <img 
            className="w-full h-[280px] object-cover transform group-hover:scale-105 transition-transform duration-500" 
            src={product.imageCover} 
            alt={product.title}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="inline-block px-3 py-1 text-xs font-semibold bg-green-600 text-white rounded-full shadow-md">
              {product.category.name}
            </span>
          </div>
        </Link>

        {/* Product Details */}
        <div className="p-5">
          <Link to={`/Productdetails/${product.id}`}>
            {/* Title */}
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3 line-clamp-2 hover:text-green-600 dark:hover:text-green-500 transition-colors duration-300 leading-tight">
              {product.title}
            </h3>

            {/* Price and Rating */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                {product.price} EGP
              </span>
              <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {product.ratingsAverage}
                </span>
                <i className="fas fa-star text-yellow-400 text-sm"></i>
              </div>
            </div>
          </Link>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button 
              onClick={() => addProduct(product.id)} 
              disabled={loadingProductId === product.id}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              {loadingProductId === product.id ? (
                <i className='fa fa-spinner fa-spin'></i>
              ) : (
                <>
                  <i className="fas fa-cart-plus"></i>
                  Add to Cart
                </>
              )}
            </button>

            <button 
              onClick={() => addProductToWishlist(product.id)}
              className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                wishlistItems.has(product.id)
                  ? 'bg-red-50 border-red-500 text-red-500 shadow-md'
                  : 'border-gray-300 text-gray-400 hover:border-red-500 hover:text-red-500 hover:bg-red-50 hover:shadow-md'
              }`}
              title="Add to Wishlist"
            >
              <i className={`fa-solid fa-heart text-xl ${wishlistItems.has(product.id) ? 'animate-pulse' : ''}`}></i>
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>

  {/* Empty State */}
  {!isLoading && recentProducts.length === 0 && (
    <div className="text-center py-20">
      <i className="fas fa-box-open text-7xl text-gray-300 dark:text-gray-600 mb-6"></i>
      <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-3">
        No products available
      </h3>
      <p className="text-gray-500 dark:text-gray-400 text-lg">
        Check back later for new products
      </p>
    </div>
  )}
</div>
  );
}