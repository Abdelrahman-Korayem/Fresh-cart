import { createContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Categories from './components/Categories/Categories';
import Brands from './components/Brands/Brands';
import Cart from './components/Cart/Cart';
import Products from './components/Products/Products';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Notfound from './components/Notfound/Notfound';
import { UserContext, UserContextprovider } from './Context/UserContext';
import ProtectrdRoute from './components/ProtectrdRoute/ProtectrdRoute';
import ProductDetails from './components/ProductDetails/ProductDetails';
import toast, { Toaster } from 'react-hot-toast';
import { CartContextProvider } from './Context/CartContext'; 
import WhichList from './components/WhichList/WhichList'
import WhichListContextprovider from './Context/WhichListContext'
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
import VerifyResetCode from './components/VerifyResetCode/VerifyResetCode'
import Address from './components/Address/Address'
import Allorders from './components/Allorders/Allorders'


let x = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { index: true, element: <ProtectrdRoute><Home /></ProtectrdRoute> },
      { path: 'Categories', element: <ProtectrdRoute><Categories /></ProtectrdRoute> },
      { path: 'brands', element: <ProtectrdRoute><Brands /></ProtectrdRoute> },
      { path: 'cart', element:<ProtectrdRoute><Cart /></ProtectrdRoute>  },
      { path: 'WhichList', element:<ProtectrdRoute><WhichList /></ProtectrdRoute>  },
      { path: 'Products', element:<ProtectrdRoute><Products /></ProtectrdRoute>  },
      { path: 'address/:cartId', element:<ProtectrdRoute><Address /></ProtectrdRoute>  },
      { path: 'Allorders', element:<ProtectrdRoute><Allorders /></ProtectrdRoute>  },
      { path: 'ForgetPassword', element:<ForgetPassword />  },
      { path: 'VerifyResetCode', element:<VerifyResetCode />  },
      { path: 'Productdetails/:id', element:<ProtectrdRoute><ProductDetails /></ProtectrdRoute>  },
      { path: 'login', element:<Login /> },
      { path: 'register', element: <Register /> },
      { path: '*', element: <Notfound /> },
    ]
  },

])

function App() {
  const [count, setCount] = useState(0)

  return (
    <UserContextprovider>

<CartContextProvider>
  <WhichListContextprovider>
  <RouterProvider router={x}></RouterProvider>
  <Toaster></Toaster>
  </WhichListContextprovider>
  
 
</CartContextProvider>


      
    </UserContextprovider>
  )
}

export default App
