import { createContext, useEffect, useState } from "react";

 export let UserContext=createContext();
  

  export function UserContextprovider(props)
{

    const [UserLogin, setUserLogin] = useState(null);

useEffect(()=>{
        if(localStorage.getItem('userToken')!==null){
            setUserLogin(localStorage.getItem('userToken'))
        }
},[])


    return <UserContext.Provider value={{UserLogin,setUserLogin}}>
{props.children}
    </UserContext.Provider>


}