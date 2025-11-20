import React, { useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import style from './VerifyResetCode.module.css';

export default function VerifyResetCode() {
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  let navigate = useNavigate();

  let validationSchema = yup.object().shape({
    resetCode: yup.string()
      .required('Reset code is required')
      .matches(/^[0-9]+$/, 'Reset code must contain only numbers')
      .length(6, 'Reset code must be exactly 6 digits'),
  });

  async function handleVerifyResetCode(formValues) {
    setIsLoading(true);
    setApiError('');

    try {
      let response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', formValues);
      console.log(response, 'then');
      setIsLoading(false);
      
      if (response?.data?.status === 'Success') {
        setIsSuccess(true);
        setTimeout(() => {
          navigate('/reset-password'); // Redirect to reset password page
        }, 1500);
      }
      
      setApiError('');
    } catch (error) {
      setIsLoading(false);
      console.log(error, 'catch');
      setApiError(error?.response?.data?.message || 'Invalid verification code. Please try again.');
    }
  }

  let formik = useFormik({
    initialValues: {
      resetCode: '',
    },
    onSubmit: handleVerifyResetCode,
    validationSchema,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
            <i className="fas fa-shield-check text-blue-600 dark:text-blue-400 text-2xl"></i>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Verify Code
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Enter the 6-digit code sent to your email
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Check your email inbox and spam folder
          </p>
        </div>

        {/* Success Message */}
        {isSuccess && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 mb-6">
            <div className="flex items-center">
              <i className="fas fa-check-circle text-green-500 text-xl mr-3"></i>
              <div>
                <p className="text-green-800 dark:text-green-300 font-medium">
                  Code verified successfully!
                </p>
                <p className="text-green-700 dark:text-green-400 text-sm">
                  Redirecting to password reset...
                </p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Reset Code Input */}
          <div>
            <label htmlFor="resetCode" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Verification Code
            </label>
            <div className="relative">
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.resetCode}
                type="text"
                id="resetCode"
                maxLength="6"
                inputMode="numeric"
                pattern="[0-9]*"
                className={`block w-full px-4 py-3 text-center text-xl font-mono rounded-xl border-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 ${
                  formik.touched.resetCode && formik.errors.resetCode 
                    ? 'border-red-500 focus:border-red-500' 
                    : formik.values.resetCode && !formik.errors.resetCode 
                    ? 'border-green-500 focus:border-green-500' 
                    : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400'
                } focus:ring-2 focus:ring-blue-500/20`}
                placeholder="000000"
                disabled={isLoading || isSuccess}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <i className={`fas ${
                  formik.touched.resetCode && formik.errors.resetCode 
                    ? 'fa-times-circle text-red-500' 
                    : formik.values.resetCode && !formik.errors.resetCode 
                    ? 'fa-check-circle text-green-500' 
                    : 'fa-key text-gray-400'
                }`}></i>
              </div>
            </div>
            
            {formik.touched.resetCode && formik.errors.resetCode ? (
              <div className="flex items-center mt-2 text-red-500 text-sm">
                <i className="fas fa-exclamation-circle mr-2"></i>
                {formik.errors.resetCode}
              </div>
            ) : (
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  6-digit code required
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formik.values.resetCode.length}/6
                </span>
              </div>
            )}
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
            disabled={isLoading || isSuccess || !formik.isValid || formik.values.resetCode.length !== 6}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3.5 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:scale-[0.98] shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <>
                <i className="fa fa-spinner fa-spin text-white"></i>
                <span>Verifying code...</span>
              </>
            ) : isSuccess ? (
              <>
                <i className="fas fa-check text-white"></i>
                <span>Verified!</span>
              </>
            ) : (
              <>
                <i className="fas fa-shield-alt"></i>
                <span>Verify Code</span>
              </>
            )}
          </button>

          {/* Help Text */}
          <div className="text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Didn't receive the code?{' '}
              <button 
                type="button"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200"
                onClick={() => {/* Add resend logic here */}}
              >
                Resend code
              </button>
            </p>
          </div>

          {/* Back Link */}
          <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
            <button 
              type="button"
              onClick={() => navigate('/forgot-password')}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-medium transition-colors duration-200 flex items-center justify-center gap-2 mx-auto"
            >
              <i className="fas fa-arrow-left text-sm"></i>
              Back to email entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}