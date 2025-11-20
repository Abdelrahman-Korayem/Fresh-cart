import React, { useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import style from './ForgetPassword.module.css';
import { Navigate, useNavigate } from 'react-router-dom';
import VerifyResetCode from '../VerifyResetCode/VerifyResetCode';

export default function ForgetPassword() {
    const [apiError, setApiError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    let navigate = useNavigate();
    
    let validationSchema = yup.object().shape({
        email: yup.string().email('Email is invalid').required('Email is required')
    });

    async function handleVerify(formValues) {
        setIsLoading(true);
        setApiError('');
        
        try {
            let response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', formValues);
            console.log(response, 'then');
            setIsLoading(false);

            if(response?.data?.statusMsg === 'success'){
                setIsSuccess(true);
                setTimeout(() => {
                    navigate('/VerifyResetCode');
                }, 2000);
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error, 'catch');
            setApiError(error?.response?.data?.message || 'An error occurred. Please try again.');
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
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                        <i className="fas fa-lock text-green-600 dark:text-green-400 text-2xl"></i>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Forgot Password
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Enter your email address and we'll send you a verification code
                    </p>
                </div>

                {/* Success Message */}
                {isSuccess && (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 mb-6">
                        <div className="flex items-center">
                            <i className="fas fa-check-circle text-green-500 text-xl mr-3"></i>
                            <div>
                                <p className="text-green-800 dark:text-green-300 font-medium">
                                    Verification code sent!
                                </p>
                                <p className="text-green-700 dark:text-green-400 text-sm">
                                    Redirecting to verification page...
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <input
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                type="email"
                                id="email"
                                className={`block w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 ${
                                    formik.touched.email && formik.errors.email 
                                        ? 'border-red-500 focus:border-red-500' 
                                        : 'border-gray-300 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-400'
                                } focus:ring-2 focus:ring-green-500/20`}
                                placeholder="Enter your email address"
                                disabled={isLoading || isSuccess}
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <i className={`fas fa-envelope ${
                                    formik.touched.email && formik.errors.email 
                                        ? 'text-red-500' 
                                        : formik.values.email && !formik.errors.email 
                                        ? 'text-green-500' 
                                        : 'text-gray-400'
                                }`}></i>
                            </div>
                        </div>
                        
                        {formik.touched.email && formik.errors.email ? (
                            <div className="flex items-center mt-2 text-red-500 text-sm">
                                <i className="fas fa-exclamation-circle mr-2"></i>
                                {formik.errors.email}
                            </div>
                        ) : null}
                    </div>

                    {/* API Error */}
                    {apiError && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                            <div className="flex items-center">
                                <i className="fas fa-exclamation-triangle text-red-500 text-lg mr-3"></i>
                                <p className="text-red-700 dark:text-red-300 text-sm">
                                    {apiError}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading || isSuccess || !formik.isValid}
                        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3.5 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:scale-[0.98] shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                    >
                        {isLoading ? (
                            <>
                                <i className="fa fa-spinner fa-spin text-white"></i>
                                <span>Sending code...</span>
                            </>
                        ) : isSuccess ? (
                            <>
                                <i className="fas fa-check text-white"></i>
                                <span>Code Sent!</span>
                            </>
                        ) : (
                            <>
                                <i className="fas fa-paper-plane"></i>
                                <span>Send Verification Code</span>
                            </>
                        )}
                    </button>

                    {/* Back to Login */}
                    <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Remember your password?{' '}
                            <button 
                                type="button"
                                onClick={() => navigate('/login')}
                                className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-semibold transition-colors duration-200"
                            >
                                Sign in here
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}