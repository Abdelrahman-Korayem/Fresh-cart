import React, { useContext, useEffect, useState } from 'react';
import style from './Login.module.css';
import { useFormik } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { UserContext } from '../../Context/UserContext';

export default function Login() {
  let {setUserLogin}=useContext(UserContext);
  let navigate = useNavigate();
  const [Apierror, setApierror] = useState('');
  const [IsLoading, setIsLoading] = useState(false)

  let validationSchema = yup.object().shape({
    email: yup.string().email('Email is invalid').required('Email is required'),
    password: yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, 'Password must start with uppercase').required('Password is required'),
  });

  async function handelLogin(formvalues) {
    setIsLoading(true);
    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', formvalues)
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
     
      
      email: '',
      password: '',
      
    },
    onSubmit: handelLogin,
    validationSchema,
  });

  return (
    <>
      <div className='py-6 max-w-xl mx-auto'>
        { Apierror?  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {Apierror}
        </div>:null}

        <form onSubmit={formik.handleSubmit} className="max-w-xl mx-auto">
          <h2 className='text-3xl font-bold mb-6 text-green-600'>Login Now</h2>

    

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

     <div className='flex items-center'>
     <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            {IsLoading?<i className='fa fa-spinner fa-spin'></i>:'Login'}
          
            
            </button>

     <p className='pl-4'>didn't have account yet ? <Link to={'/register'} className='font-semibold hover:text-green-600'>Register Now</Link ></p>
      

     </div>
     <div>
     <Link to={'/ForgetPassword'} className='font-semibold hover:text-green-600 mx-12'>Forget Password</Link >

     </div>
     
          
            
        </form>
      </div>
    </>
  );
}
