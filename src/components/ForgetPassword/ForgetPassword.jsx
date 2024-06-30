import React, { useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import style from './ForgetPassword.module.css';
import { Navigate, useNavigate } from 'react-router-dom';
import VerifyResetCode from '../VerifyResetCode/VerifyResetCode';
VerifyResetCode
export default function ForgetPassword() {
    const [apiError, setApiError] = useState('');
    const [IsLoading, setIsLoading] = useState(false)

    let navigate = useNavigate();
    let validationSchema = yup.object().shape({
        email: yup.string().email('Email is invalid').required('Email is required')
    });

    async function handleVerify(formValues) {
        setIsLoading(true);
        try {
            let response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', formValues);
            console.log(response, 'then');
            setIsLoading(false);

            if(response?.data?.statusMsg==='success'){
                navigate('/VerifyResetCode');
            }
        } catch (error) {
            setIsLoading(false);

            console.log(error, 'catch');
            setApiError(error?.response?.data?.message);
        }
    }

    let formik = useFormik({
        initialValues: {
            email: ''
        },
        onSubmit: handleVerify,
        validationSchema,
    });

    return (
        <>
            <form className="w-[600px] mx-auto m-3" onSubmit={formik.handleSubmit}>
                <label htmlFor="email" className="block mb-2 text-sm font-bold text-green-600">Your email</label>
                <input
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    type="email"
                    id="email"
                    aria-describedby="helper-text-explanation"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your Email"
                />
                {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500 text-sm">{formik.errors.email}</div>
                ) : null}
                <button
                    type="submit"
                    className="border border-green-600 px-5 py-3 m-3 rounded-xl hover:bg-green-700 hover:text-white"
                >
                    {IsLoading?<i className='fa fa-spinner fa-spin text-green-600'></i>:'Verfiy'}
                </button>
                {apiError && <div className="text-red-500 text-sm">{apiError}</div>}
            </form>
        </>
    );
}
