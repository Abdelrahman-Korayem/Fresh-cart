import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bars } from 'react-loader-spinner';
import toast from 'react-hot-toast';

export default function Brands() {
  const [isLoading, setIsLoading] = useState(false);
  const [brands, setBrands] = useState([]);

  async function getBrands() {
    setIsLoading(true);
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
      setBrands(data.data);
    } catch (error) {
      console.error('Error fetching brands:', error);
      toast.error('Failed to load brands');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getBrands();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Bars height={80} width={80} color="#16a34a" ariaLabel="bars-loading" visible={true} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          All <span className="text-green-600 dark:text-green-500">Brands</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Discover {brands.length} trusted brands
        </p>
        <div className="w-24 h-1 bg-green-600 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Brands Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {brands.map((brand) => (
          <div 
            key={brand._id} 
            className="group cursor-pointer bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-green-500"
          >
            {/* Brand Logo Container */}
            <div className="relative overflow-hidden bg-gray-50 dark:bg-gray-700 p-6 aspect-square flex items-center justify-center">
              <img 
                className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300" 
                src={brand.image} 
                alt={brand.name}
                loading="lazy"
              />
              
              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-green-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Brand Name */}
            <div className="p-4 text-center bg-white dark:bg-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-green-600 dark:group-hover:text-green-500 transition-colors truncate">
                {brand.name}
              </h3>
            </div>

            {/* Hover Effect Badge */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
                <i className="fas fa-check text-xs"></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {!isLoading && brands.length === 0 && (
        <div className="text-center py-20">
          <i className="fas fa-store-slash text-6xl text-gray-300 dark:text-gray-600 mb-4"></i>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No brands available
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Check back later for new brands
          </p>
        </div>
      )}

      {/* Featured Brands Section (Optional) */}
      {brands.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Why Choose Our Brands?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-certificate text-3xl text-green-600 dark:text-green-500"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Quality Assured
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                All brands are verified and trusted worldwide
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-shipping-fast text-3xl text-blue-600 dark:text-blue-500"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Fast Delivery
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Quick shipping on all brand products
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-shield-alt text-3xl text-purple-600 dark:text-purple-500"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Authentic Products
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                100% genuine products guaranteed
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Stats Section */}
      {brands.length > 0 && (
        <div className="mt-12 bg-gradient-to-r from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-700 rounded-lg p-8 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <h4 className="text-4xl font-bold text-green-600 dark:text-green-500 mb-2">
                {brands.length}+
              </h4>
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                Global Brands
              </p>
            </div>
            <div>
              <h4 className="text-4xl font-bold text-green-600 dark:text-green-500 mb-2">
                5000+
              </h4>
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                Products Available
              </p>
            </div>
            <div>
              <h4 className="text-4xl font-bold text-green-600 dark:text-green-500 mb-2">
                99%
              </h4>
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                Customer Satisfaction
              </p>
            </div>
            <div>
              <h4 className="text-4xl font-bold text-green-600 dark:text-green-500 mb-2">
                24/7
              </h4>
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                Support Available
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}