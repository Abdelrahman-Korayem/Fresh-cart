import axios from 'axios'
import React, { createContext, useContext } from 'react'




export let WhichListContext=createContext();
export default function WhichListContextprovider(props) {
  let headers = {
    token: localStorage.getItem('userToken')
  }
  function getWhichList() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
      headers: headers
    }).then((response) => response)
      .catch((error) => error)
  }
  function deleteWhichListItem(productId ){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`
   , {
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
  function addProductToWhichList(productId){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
      productId
    }, {
      headers: headers
   }).then((response) => console.log(response))
   .catch((error) => console.log(error))
  }

 
  
  return (
    
   
    <WhichListContext.Provider value={{getWhichList,deleteWhichListItem,addproducttocart, addProductToWhichList}}>

      {props.children}
    </WhichListContext.Provider>
   
  
  )
}