import React, { useContext, useEffect, useState } from 'react'
import logo from '../../assets/logo.jpg'
import style from './Navbar.module.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import Cart from './../Cart/Cart';
import Brands from './../Brands/Brands';
import { CartContext } from '../../Context/CartContext'


export default function Navbar() {
  let Navegate = useNavigate();
  let { UserLogin, setUserLogin } = useContext(UserContext, );
  let { numOfCartItmes } = useContext(CartContext );
  function logout() {
    localStorage.removeItem('userToken');
    setUserLogin(null);
    Navegate('/Login')

  }

  console.log(numOfCartItmes);
  return (

    <>




     <nav className="bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-800 fixed w-full top-0 start-0 end-0 z-50 shadow-md">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    {/* Logo */}
    <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse group">
      <i className='fa-solid fa-cart-shopping text-green-600 dark:text-green-500 text-4xl group-hover:scale-110 transition-transform duration-200'></i>
      <span className="self-center text-2xl font-bold whitespace-nowrap text-gray-900 dark:text-white">
        fresh<span className="text-green-600 dark:text-green-500">cart</span>
      </span>
    </NavLink>

    {/* Mobile Menu Button */}
    <button
      data-collapse-toggle="navbar-default"
      type="button"
      className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-green-600 transition-colors"
      aria-controls="navbar-default"
      aria-expanded="false"
      onClick={() => {
        const navbar = document.getElementById("navbar-default");
        navbar.classList.toggle("hidden");
      }}
    >
      <span className="sr-only">Open main menu</span>
      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
      </svg>
    </button>

    {/* Navigation Menu */}
    <div className="hidden w-full lg:flex lg:w-auto items-center grow justify-between" id="navbar-default">
      
      {/* Main Navigation Links */}
      <ul className="font-medium ms-auto flex flex-col p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0 lg:bg-white dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
        {UserLogin !== null ? (
          <>
            <li>
              <NavLink 
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-600 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent transition-colors font-medium" 
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-600 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent transition-colors font-medium capitalize" 
                to="/cart"
              >
                Cart
              </NavLink>
            </li>
            <li>
              <NavLink 
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-600 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent transition-colors font-medium capitalize" 
                to="/WhichList"
              >
                Wish List
              </NavLink>
            </li>
            <li>
              <NavLink 
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-600 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent transition-colors font-medium capitalize" 
                to="/products"
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink 
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-600 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent transition-colors font-medium capitalize" 
                to="/categories"
              >
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink 
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-600 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent transition-colors font-medium capitalize" 
                to="/brands"
              >
                Brands
              </NavLink>
            </li>
          </>
        ) : null}
      </ul>

      {/* Right Side Actions */}
      <div className="items-center space-x-4 ms-auto">
        <ul className="flex flex-col lg:flex-row items-center gap-4">
          {UserLogin === null ? (
            <>
              <li>
                <NavLink 
                  className="px-4 py-2 text-sm font-medium text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400 transition-colors" 
                  to="login"
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink 
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors shadow-sm hover:shadow-md" 
                  to="Register"
                >
                  Register
                </NavLink>
              </li>
            </>
          ) : (
            <>
              {/* Cart Icon with Badge */}
              <li>
                <Link to={'/cart'} className="relative inline-block group">
                  <i className="fa-solid fa-cart-shopping text-3xl text-gray-700 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-500 transition-colors"></i>
                  {numOfCartItmes > 0 && (
                    <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-md animate-pulse">
                      {numOfCartItmes}
                    </span>
                  )}
                </Link>
              </li>

              {/* Logout Button */}
              <li>
                <button 
                  onClick={logout} 
                  className="px-4 py-2 text-sm font-medium text-red-600 hover:text-white hover:bg-red-600 border border-red-600 rounded-lg transition-all duration-200"
                >
                  Logout
                </button>
              </li>
            </>
          )}

          {/* Social Media Icons (Optional - Uncommented) */}
          {/* <li className="flex items-center gap-3">
            <a href="#" className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-500 transition-colors">
              <i className="fab fa-facebook text-xl"></i>
            </a>
            <a href="#" className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-500 transition-colors">
              <i className="fab fa-twitter text-xl"></i>
            </a>
            <a href="#" className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-500 transition-colors">
              <i className="fab fa-github text-xl"></i>
            </a>
          </li> */}
        </ul>
      </div>
    </div>
  </div>
</nav>





    </>


  )
}
