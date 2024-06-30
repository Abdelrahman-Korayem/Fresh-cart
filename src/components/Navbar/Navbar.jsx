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




      <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed w-full top-0 start-0 end-0 z-50  ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <NavLink className="flex items-center space-x-3 rtl:space-x-reverse">
            <i className='fa-solid fa-cart-shopping nav-icon text-green-600 text-4xl'></i>
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">fresh cart</span>
          </NavLink>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
          <div className="hidden  w-full lg:flex lg:w-auto items-center grow justify-between" id="navbar-default">




            <ul className="font-medium ms-auto flex flex-col p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0 lg:bg-white dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
              {UserLogin !== null ? <>

                <li>
                  <NavLink className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent" to="/">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent" to="/cart">
                    cart
                  </NavLink>
                </li>
                <li>
                  <NavLink className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent" to="/WhichList">
                    wish list
                  </NavLink>
                </li>
                <li>
                  <NavLink className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent" to="/products">
                    products
                  </NavLink>
                </li>
                <li>
                  <NavLink className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent" to="/categories">
                    categories
                  </NavLink>
                </li>
                <li>
                  <NavLink className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent" to="/brands">
                    brands
                  </NavLink>
                </li>

              </> : null}

            </ul>

            <div className="items-center space-x-4 ms-auto ">
              <ul className="flex flex-col lg:flex-row items-center">
                {UserLogin === null ? (
                  <>
                    <li className="py-2">
                      <NavLink className="mx-2 py-2 text-lg text-slate-900 ga" to="login">
                        Login
                      </NavLink>
                    </li>
                    <li className="py-2">
                      <NavLink className="mx-2 py-2 text-lg text-slate-900 ga" to="Register">
                        Register
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <li onClick={logout} className="py-2">
                    <span className="mx-2 py-2 text-lg text-slate-900 cursor-pointer">Logout</span>
                  </li>
                )}
                <Link to={'/cart'}  className="relative">
                  <i className="fa-solid fa-cart-shopping text-4xl"></i>
                  <span className="absolute top-0 right-0 bg-green-600 text-white rounded-2xl w-5 h-5 flex items-center justify-center">{numOfCartItmes}</span>
                </Link >
                {/* <li className="flex items-center">
          <i className="fab mx-2 fa-facebook"></i>
          <i className="fab mx-2 fa-twitter"></i>
          <i className="fab mx-2 fa-github"></i>
          
          
        </li> */}
              </ul>
            </div>

          </div>





        </div>
      </nav>





    </>


  )
}
