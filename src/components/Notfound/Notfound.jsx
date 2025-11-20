import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Notfound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4 py-16">
      <div className="max-w-4xl w-full text-center">
        {/* 404 Number with Animation */}
        <div className="relative mb-8">
          <h1 className="text-[200px] sm:text-[250px] md:text-[300px] font-black text-gray-200 dark:text-gray-800 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-full p-8 shadow-2xl">
              <i className="fas fa-search text-6xl sm:text-7xl text-green-600 dark:text-green-500 animate-bounce"></i>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-2">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Don't worry, let's get you back on track!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link 
            to="/" 
            className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <i className="fas fa-home text-xl"></i>
            <span>Back to Home</span>
          </Link>

          <button 
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl border-2 border-gray-200 dark:border-gray-700 transform hover:scale-105"
          >
            <i className="fas fa-arrow-left text-xl"></i>
            <span>Go Back</span>
          </button>
        </div>

        {/* Quick Links */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Quick Links
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Link 
              to="/products" 
              className="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
            >
              <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <i className="fas fa-shopping-bag text-2xl text-green-600 dark:text-green-500"></i>
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-500">
                Products
              </span>
            </Link>

            <Link 
              to="/categories" 
              className="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
            >
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <i className="fas fa-layer-group text-2xl text-blue-600 dark:text-blue-500"></i>
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                Categories
              </span>
            </Link>

            <Link 
              to="/brands" 
              className="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
            >
              <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <i className="fas fa-tags text-2xl text-purple-600 dark:text-purple-500"></i>
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-500">
                Brands
              </span>
            </Link>

            <Link 
              to="/cart" 
              className="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
            >
              <div className="w-14 h-14 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <i className="fas fa-shopping-cart text-2xl text-red-600 dark:text-red-500"></i>
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-red-600 dark:group-hover:text-red-500">
                Cart
              </span>
            </Link>
          </div>
        </div>

        {/* Fun Illustration */}
        <div className="mt-12 text-gray-400 dark:text-gray-600">
          <div className="flex items-center justify-center gap-8 text-6xl">
            <i className="fas fa-box-open animate-pulse"></i>
            <i className="fas fa-question-circle"></i>
            <i className="fas fa-sad-tear animate-bounce"></i>
          </div>
        </div>
      </div>
    </div>
  );
}