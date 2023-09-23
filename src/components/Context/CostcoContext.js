import { useState, createContext, useEffect } from "react";

export const CostcoContext = createContext();

function CostcoProvider(props) {
    const [login, setLogin] = useState({});
    const [online, setOnline] = useState(false);
    const [userID, setUserID] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState(""); 
    const [AdminUserID, setAdminUserID] = useState(""); 
    const [AdminUserAvatar, setAdminUserAvatar] = useState(""); 
    // const [AdminUserAvatar, setAdminUserAvatar] = useState(localStorage.getItem('CostcoAdmin_Avatar') || '');


    useEffect(() => {
        if (localStorage) {
            let rawData = localStorage.getItem("CostcoAdmin_USER");
            if (rawData !== null) {
                let localData = JSON.parse(rawData);
                console.log(localData)
                setUserID(localData);
                setIsLoggedIn(true);

                const userDataString = rawData;
                const decodedPayload = JSON.parse(atob(userDataString.split('.')[1]));
                console.log(decodedPayload)
                setUserName(decodedPayload.name); 
                setAdminUserID(decodedPayload.id);
          

          
                localStorage.setItem('CostcoAdmin_Avatar', decodedPayload.avatar);
            } else {
                console.error("No data found in local storage for key 'CostcoAdmin_USER'");
            }
        }
    }, []);


      

    // console.log(userID);
    // console.log(isLoggedIn);
    console.log(userName); 
    console.log(AdminUserID)
  

    return (
        <CostcoContext.Provider value={{
            login, setLogin, online, setOnline, userID, setUserID, isLoggedIn, setIsLoggedIn, userName, setUserName, AdminUserID, setAdminUserID,
       
        }}>
            {props.children}
        </CostcoContext.Provider>
    )
}

export default CostcoProvider;

