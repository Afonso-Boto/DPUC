import { useState } from "react";

const useUserData = () => {
    const [userType, setUserType] = useState("DUO");
    const [isLogged, setIsLogged] = useState(true);

    if(localStorage.getItem("token") && localStorage.getItem("user")){
        setIsLogged(true);
        
        //setUserType(localStorage.getItem("user"));
    }
        


    return { userType, setUserType, isLogged, setIsLogged };
}
 
export default useUserData;