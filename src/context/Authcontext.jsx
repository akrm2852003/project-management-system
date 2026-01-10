import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState, props} from "react";

export let AuthContext =createContext(null);

function AuthContextProvider({children}) {
    const [loginData,setloginData] =useState(null)
    let saveloginData =()=>{
        let encodedToken = localStorage.getItem('token');
        let decodedToken = jwtDecode(encodedToken);
        setloginData(decodedToken)
    }
    useEffect(()=>{
        if(localStorage.getItem('token'))
            saveloginData()
    },[])

    return(

        <AuthContext.Provider value={{loginData,saveloginData}}>
            {children }
        </AuthContext.Provider>
    )
}
export default AuthContextProvider;