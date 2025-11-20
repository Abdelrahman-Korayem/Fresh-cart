import React, { useContext, useEffect, useState } from 'react';
import style from './Register.module.css';
import { useFormik } from 'formik';
import axios from 'axios';
import {  Link,useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { UserContext } from '../../Context/UserContext';

export default function Register() {
  let {setUserLogin}=useContext(UserContext);
  let navigate = useNavigate();
  const [Apierror, setApierror] = useState('');
  const [IsLoading, setIsLoading] = useState(false)

  let validationSchema = yup.object().shape({
    name: yup.string().min(3, 'Name min length is 3').max(15, 'Name max length is 15').required('Name is required'),
    email: yup.string().email('Email is invalid').required('Email is required'),
    phone: yup.string().matches(/^01[0125][0-9]{8}$/, 'Phone must be in the Egyptian format').required('Phone is required'),
    password: yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, 'Password must start with uppercase').required('Password is required'),
    rePassword: yup.string().oneOf([yup.ref('password')], 'Password and rePassword must match').required('Repassword is required'),
  });

  async function handelRegister(formvalues) {
    setIsLoading(true);
    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', formvalues)
      .then((response)=>{
        if(response.data.message==='success')
          {
            localStorage.setItem('userToken',response.data.token);
            setUserLogin(response.data.token)
            navigate('/');
            setIsLoading(false);
          }
        
        
      })
      .catch((apiresponse) => {
        setApierror(apiresponse?.response?.data?.message);
        setIsLoading(false);
      });
    console.log(formvalues);
  }

  let formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      rePassword: '',
    },
    onSubmit: handelRegister,
    validationSchema,
  });

  return (
    <>
     <div className='min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8'>
  <div className='w-full max-w-md'>
    {/* Error Alert */}
    {Apierror && (
      <div className="mb-6 p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 border border-red-200 dark:border-red-800" role="alert">
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
          </svg>
          {Apierror}
        </div>
      </div>
    )}

    {/* Form Container */}
    <div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8'>
      <form onSubmit={formik.handleSubmit}>
        {/* Title */}
        <div className='text-center mb-8'>
          <h2 className='text-3xl font-bold text-green-600 dark:text-green-500'>Register Now</h2>
          <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>Create your account to get started</p>
        </div>

        {/* Name Field */}
        <div className="relative z-0 w-full mb-6 group">
          <input 
            onBlur={formik.handleBlur} 
            onChange={formik.handleChange} 
            value={formik.values.name} 
            type="text" 
            name="name" 
            id="name" 
            className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer transition-colors" 
            placeholder=" " 
          />
          <label 
            htmlFor="name" 
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Full Name
          </label>
        </div>
        {formik.errors.name && formik.touched.name && (
          <div className="mb-4 p-3 text-xs text-red-800 rounded-md bg-red-50 dark:bg-gray-900 dark:text-red-400 border border-red-200 dark:border-red-900" role="alert">
            {formik.errors.name}
          </div>
        )}

        {/* Email Field */}
        <div className="relative z-0 w-full mb-6 group">
          <input 
            onBlur={formik.handleBlur} 
            onChange={formik.handleChange} 
            value={formik.values.email} 
            type="email" 
            name="email" 
            id="email" 
            className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer transition-colors" 
            placeholder=" " 
          />
          <label 
            htmlFor="email" 
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            E-mail Address
          </label>
        </div>
        {formik.errors.email && formik.touched.email && (
          <div className="mb-4 p-3 text-xs text-red-800 rounded-md bg-red-50 dark:bg-gray-900 dark:text-red-400 border border-red-200 dark:border-red-900" role="alert">
            {formik.errors.email}
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
            Phone Number
          </label>
        </div>
        {formik.errors.phone && formik.touched.phone && (
          <div className="mb-4 p-3 text-xs text-red-800 rounded-md bg-red-50 dark:bg-gray-900 dark:text-red-400 border border-red-200 dark:border-red-900" role="alert">
            {formik.errors.phone}
          </div>
        )}

        {/* Password Field */}
        <div className="relative z-0 w-full mb-6 group">
          <input 
            onBlur={formik.handleBlur} 
            onChange={formik.handleChange} 
            value={formik.values.password} 
            type="password" 
            name="password" 
            id="password" 
            className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer transition-colors" 
            placeholder=" " 
          />
          <label 
            htmlFor="password" 
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        {formik.errors.password && formik.touched.password && (
          <div className="mb-4 p-3 text-xs text-red-800 rounded-md bg-red-50 dark:bg-gray-900 dark:text-red-400 border border-red-200 dark:border-red-900" role="alert">
            {formik.errors.password}
          </div>
        )}

        {/* Confirm Password Field */}
        <div className="relative z-0 w-full mb-6 group">
          <input 
            onBlur={formik.handleBlur} 
            onChange={formik.handleChange} 
            value={formik.values.rePassword} 
            type="password" 
            name="rePassword" 
            id="rePassword" 
            className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer transition-colors" 
            placeholder=" " 
          />
          <label 
            htmlFor="rePassword" 
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm Password
          </label>
        </div>
        {formik.errors.rePassword && formik.touched.rePassword && (
          <div className="mb-4 p-3 text-xs text-red-800 rounded-md bg-red-50 dark:bg-gray-900 dark:text-red-400 border border-red-200 dark:border-red-900" role="alert">
            {formik.errors.rePassword}
          </div>
        )}

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={IsLoading}
          className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
        >
          {IsLoading ? (
            <span className='flex items-center justify-center'>
              <i className='fa fa-spinner fa-spin mr-2'></i>
              Creating Account...
            </span>
          ) : (
            'Create Account'
          )}
        </button>

        {/* Login Link */}
        <div className='mt-6 text-center'>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            Already have an account?{' '}
            <Link to={'/login'} className='font-semibold text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400 transition-colors'>
              Login Now
            </Link>
          </p>
        </div>
      </form>
    </div>
  </div>
</div>
    </>
  );
}
