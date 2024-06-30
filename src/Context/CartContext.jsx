import axios from "axios";
import { createContext, useEffect, useState } from "react";
export let CartContext = createContext();




export function CartContextProvider(props) {

const [numOfCartItmes, setnumOfCartItmes] = useState(0)
  let headers = {
    token: localStorage.getItem('userToken')
  }
  function getLoggedusecart() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers: headers
    }).then((response) => response)
      .catch((error) => error)
  }
   function addproducttocart(productId){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
      productId
    }, {
      headers: headers
   }).then((response) => response)
   .catch((error) => error)
  }
   function updataCartItemCount(productId ,count){
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
      count
    }, {
      headers: headers
   }).then((response) => response)
   .catch((error) => error)
  }
   function deleteCartItem(productId ){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`
   , {
      headers: headers
   }).then((response) => response)
   .catch((error) => error)
  }
   function clearCartItem(productId ){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/`
   , {
      headers: headers
   }).then((response) => response)
   .catch((error) => error)
  }
  useEffect(() => {
    async function getcartnum(){
      let {data} =await  getLoggedusecart();
      setnumOfCartItmes(data?.numOfCartItems)
    }
    getcartnum();
  }, []);
 
  return <CartContext.Provider value={{ getLoggedusecart,addproducttocart,updataCartItemCount,deleteCartItem,clearCartItem,numOfCartItmes }}>
    {props.children}
  </CartContext.Provider>
}




