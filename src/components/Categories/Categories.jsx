import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bars } from 'react-loader-spinner';
import toast from 'react-hot-toast';

export default function Categories() {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  async function getCategories() {
    setIsLoading(true);
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      setCategories(data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to load categories');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCategories();
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          All Categories
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Browse through our {categories.length} categories
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div 
            key={category._id} 
            className="group cursor-pointer bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            {/* Category Image */}
            <div className="relative overflow-hidden h-[400px]">
              <img 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
                src={category.image} 
                alt={category.name}
                loading="lazy"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
              
              {/* Category Name on Image (appears on hover) */}
              <div className="absolute inset-0 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-bold text-2xl mb-2 drop-shadow-lg">
                    {category.name}
                  </h3>
                  <div className="flex items-center justify-center gap-2 text-green-400">
                    <span className="text-sm font-medium">Explore</span>
                    <i className="fas fa-arrow-right text-sm animate-pulse"></i>
                  </div>
                </div>
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 left-4 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                <i className="fas fa-tag mr-2"></i>
                Category
              </div>
            </div>

            {/* Category Details */}
            <div className="p-5 bg-white dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-500 transition-colors">
                  {category.name}
                </h3>
                <i className="fas fa-chevron-right text-green-600 dark:text-green-500 transform group-hover:translate-x-2 transition-transform duration-300"></i>
              </div>
              
              {/* Additional Info */}
              <div className="mt-3 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <i className="fas fa-boxes mr-2 text-green-600 dark:text-green-500"></i>
                <span>Browse Products</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {!isLoading && categories.length === 0 && (
        <div className="text-center py-20">
          <i className="fas fa-folder-open text-6xl text-gray-300 dark:text-gray-600 mb-4"></i>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No categories available
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Check back later for new categories
          </p>
        </div>
      )}

      {/* Statistics Section (Optional) */}
      {categories.length > 0 && (
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-700 rounded-lg p-6 text-center shadow-md">
            <i className="fas fa-layer-group text-4xl text-green-600 dark:text-green-500 mb-3"></i>
            <h4 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {categories.length}
            </h4>
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              Total Categories
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 rounded-lg p-6 text-center shadow-md">
            <i className="fas fa-shopping-bag text-4xl text-blue-600 dark:text-blue-500 mb-3"></i>
            <h4 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              1000+
            </h4>
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              Products Available
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-800 dark:to-gray-700 rounded-lg p-6 text-center shadow-md">
            <i className="fas fa-star text-4xl text-purple-600 dark:text-purple-500 mb-3"></i>
            <h4 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              4.8
            </h4>
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              Average Rating
            </p>
          </div>
        </div>
      )}
    </div>
  );
}