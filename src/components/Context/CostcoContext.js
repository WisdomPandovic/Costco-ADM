import { useState, createContext, useEffect } from "react";

export const CostcoContext = createContext();

function CostcoProvider(props) {
    const [login, setLogin] = useState({});
    const [online, setOnline] = useState(false)
    const [userID, setUserID] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if(localStorage){
          let rawData = localStorage.getItem("CostcoAdmin_USER")
          let localData = JSON.parse(rawData)
          setUserID(localData)
          setIsLoggedIn(true)
        }
      
      },[]);
    

    console.log(userID)
    console.log(isLoggedIn)

    return <CostcoContext.Provider value={{login, setLogin, online, setOnline, userID, setUserID, isLoggedIn, setIsLoggedIn}}>{props.children}</CostcoContext.Provider>

}

export default CostcoProvider;