import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import style from './Address.module.css';
import { useFormik } from 'formik';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Address() {
  let { cartId } = useParams();
  

  let validationSchema = yup.object().shape({
    'shippingAddress.details': yup.string().required('Details are required').min(5, 'Details must be at least 5 characters').max(30, 'Details must be at most 30 characters'),
    'shippingAddress.city': yup.string().required('City is required'),
    'shippingAddress.phone': yup.string().matches(/^01[0125][0-9]{8}$/, 'Phone must be in the Egyptian format').required('Phone is required'),
  });

  let formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: ""
      }
    },
    onSubmit: function(data) {
      console.log(data);
      check(data);
    },
    validationSchema,
  });

  function check(data) {
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173/`,
      data,
      {
        headers: {
          token: localStorage.getItem("userToken")
        }
      }
    ).then((r) => {
      console.log(r);
      window.open(r.data.session.url, '_self');
    })
      .catch((e) => e);
  }

  return (
    <>
      <form action="" onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-10 group">
          <input 
            onBlur={formik.handleBlur} 
            onChange={formik.handleChange} 
            value={formik.values.shippingAddress.details} 
            type="text" 
            name="shippingAddress.details" 
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" 
            placeholder=" " 
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Details</label>
        </div>
        {formik.errors['shippingAddress.details'] && formik.touched['shippingAddress.details'] &&
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors['shippingAddress.details']}
          </div>
        }
        <div className="relative z-0 w-full mb-10 group">
          <input 
            onBlur={formik.handleBlur} 
            onChange={formik.handleChange} 
            value={formik.values.shippingAddress.phone} 
            type="tel" 
            name="shippingAddress.phone" 
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" 
            placeholder=" " 
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
        </div>
        {formik.errors['shippingAddress.phone'] && formik.touched['shippingAddress.phone'] &&
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors['shippingAddress.phone']}
          </div>
        }
        <div className="relative z-0 w-full mb-10 group">
          <input 
            onBlur={formik.handleBlur} 
            onChange={formik.handleChange} 
            value={formik.values.shippingAddress.city} 
            type="text" 
            name="shippingAddress.city" 
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" 
            placeholder=" " 
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
        </div>
        {formik.errors['shippingAddress.city'] && formik.touched['shippingAddress.city'] &&
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors['shippingAddress.city']}
          </div>
        }

        <button type="submit" className='w-full border border-green-600 rounded-xl text-2xl py-2 hover:bg-green-600'>Pay Now</button>
      </form>
    </>
  );
}
