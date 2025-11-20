import React, { useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Address() {
  const { cartId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = yup.object().shape({
    details: yup.string()
      .required('Details are required')
      .min(5, 'Details must be at least 5 characters')
      .max(100, 'Details must be at most 100 characters'),
    city: yup.string()
      .required('City is required')
      .min(2, 'City must be at least 2 characters'),
    phone: yup.string()
      .matches(/^01[0125][0-9]{8}$/, 'Phone must be a valid Egyptian number')
      .required('Phone is required'),
  });

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: ""
    },
    onSubmit: async function(values) {
      await checkout(values);
    },
    validationSchema,
  });

  async function checkout(formData) {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${window.location.origin}`,
        { shippingAddress: formData },
        {
          headers: {
            token: localStorage.getItem("userToken")
          }
        }
      );
      
      toast.success('Redirecting to payment...');
      window.location.href = data.session.url;
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(error?.response?.data?.message || 'Failed to process checkout');
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
            <i className="fas fa-shipping-fast text-3xl text-green-600 dark:text-green-500"></i>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Shipping Address
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Enter your delivery details to complete your order
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
          <form onSubmit={formik.handleSubmit}>
            {/* Order Summary Card */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-gray-700 dark:to-gray-600 rounded-lg p-4 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <i className="fas fa-shopping-bag text-2xl text-green-600 dark:text-green-500"></i>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                    Order ID
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                    {cartId?.slice(0, 16)}...
                  </p>
                </div>
              </div>
              <i className="fas fa-check-circle text-2xl text-green-600 dark:text-green-500"></i>
            </div>

            {/* Details Field */}
            <div className="relative z-0 w-full mb-6 group">
              <input 
                onBlur={formik.handleBlur} 
                onChange={formik.handleChange} 
                value={formik.values.details} 
                type="text" 
                name="details" 
                id="details"
                className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer transition-colors" 
                placeholder=" " 
              />
              <label 
                htmlFor="details"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Street Address / Building / Apartment
              </label>
            </div>
            {formik.errors.details && formik.touched.details && (
              <div className="mb-4 p-3 text-xs text-red-800 rounded-md bg-red-50 dark:bg-gray-900 dark:text-red-400 border border-red-200 dark:border-red-900 flex items-center gap-2" role="alert">
                <i className="fas fa-exclamation-circle"></i>
                {formik.errors.details}
              </div>
            )}

            {/* City Field */}
            <div className="relative z-0 w-full mb-6 group">
              <input 
                onBlur={formik.handleBlur} 
                onChange={formik.handleChange} 
                value={formik.values.city} 
                type="text" 
                name="city" 
                id="city"
                className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer transition-colors" 
                placeholder=" " 
              />
              <label 
                htmlFor="city"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                City
              </label>
            </div>
            {formik.errors.city && formik.touched.city && (
              <div className="mb-4 p-3 text-xs text-red-800 rounded-md bg-red-50 dark:bg-gray-900 dark:text-red-400 border border-red-200 dark:border-red-900 flex items-center gap-2" role="alert">
                <i className="fas fa-exclamation-circle"></i>
                {formik.errors.city}
              </div>
            )}

            {/* Phone Field */}
            <div className="relative z-0 w-full mb-6 group">
              <input 
                onBlur={formik.handleBlur} 
                onChange={formik.handleChange} 
                value={formik.values.phone} 
                type="tel" 
                name="phone" 
                id="phone"
                className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer transition-colors" 
                placeholder=" " 
              />
              <label 
                htmlFor="phone"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone Number (Egyptian format: 01XXXXXXXXX)
              </label>
            </div>
            {formik.errors.phone && formik.touched.phone && (
              <div className="mb-4 p-3 text-xs text-red-800 rounded-md bg-red-50 dark:bg-gray-900 dark:text-red-400 border border-red-200 dark:border-red-900 flex items-center gap-2" role="alert">
                <i className="fas fa-exclamation-circle"></i>
                {formik.errors.phone}
              </div>
            )}

            {/* Info Box */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
              <div className="flex gap-3">
                <i className="fas fa-info-circle text-blue-600 dark:text-blue-400 mt-0.5"></i>
                <div>
                  <h4 className="font-semibold text-blue-900 dark:text-blue-300 text-sm mb-1">
                    Secure Payment
                  </h4>
                  <p className="text-xs text-blue-700 dark:text-blue-400">
                    You will be redirected to a secure payment gateway to complete your transaction.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg"
            >
              {isLoading ? (
                <>
                  <i className='fa fa-spinner fa-spin'></i>
                  Processing...
                </>
              ) : (
                <>
                  <i className="fas fa-lock"></i>
                  Proceed to Payment
                </>
              )}
            </button>

            {/* Back Button */}
            <button 
              type="button"
              onClick={() => navigate('/cart')}
              className="w-full mt-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium py-3 transition-colors flex items-center justify-center gap-2"
            >
              <i className="fas fa-arrow-left"></i>
              Back to Cart
            </button>
          </form>
        </div>

        {/* Security Badges */}
        <div className="mt-6 flex items-center justify-center gap-6 text-gray-500 dark:text-gray-400 text-xs">
          <div className="flex items-center gap-1">
            <i className="fas fa-shield-alt text-green-600"></i>
            <span>Secure</span>
          </div>
          <div className="flex items-center gap-1">
            <i className="fas fa-lock text-green-600"></i>
            <span>Encrypted</span>
          </div>
          <div className="flex items-center gap-1">
            <i className="fas fa-check-circle text-green-600"></i>
            <span>Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
}