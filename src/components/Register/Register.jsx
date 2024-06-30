import React, { useContext, useEffect, useState } from 'react';
import style from './Register.module.css';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { UserContext } from '../../Context/UserContext';

export default function Register() {
  let {setUserLogin}=useContext(UserContext);
  let navigate = useNavigate();
  const [Apierror, setApierror] = useState('');
  const [IsLoading, setIsLoading] = useState(false)

  let validationSchema = yup.object().shape({
    name: yup.string().min(3, 'Name min length is 3').max(10, 'Name max length is 10').required('Name is required'),
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
      <div className='py-6 max-w-xl mx-auto'>
        { Apierror?  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {Apierror}
        </div>:null}

        <form onSubmit={formik.handleSubmit} className="max-w-xl mx-auto">
          <h2 className='text-3xl font-bold mb-6 text-green-600'>Register Now</h2>

          {/* Name */}
          <div className="relative z-0 w-full mb-5 group">
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
            <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
          </div>
          {formik.errors.name && formik.touched.name &&
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.name}
            </div>
          }

          {/* Email */}
          <div className="relative z-0 w-full mb-5 group">
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">E-mail</label>
          </div>
          {formik.errors.email && formik.touched.email &&
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.email}
            </div>
          }

          {/* Phone */}
          <div className="relative z-0 w-full mb-5 group">
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
            <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
          </div>
          {formik.errors.phone && formik.touched.phone &&
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.phone}
            </div>
          }

          {/* Password */}
          <div className="relative z-0 w-full mb-5 group">
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
            <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
          </div>
          {formik.errors.password && formik.touched.password &&
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.password}
            </div>
          }

          {/* Re-enter Password */}
          <div className="relative z-0 w-full mb-5 group">
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password" name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
            <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Re-enter Password</label>
          </div>
          {formik.errors.rePassword && formik.touched.rePassword &&
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.rePassword}
            </div>
          }

          <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            {IsLoading?<i className='fa fa-spinner fa-spin'></i>:'Submit'}
          
            
            </button>
        </form>
      </div>
    </>
  );
}
