import { useState } from "react";

const useUserData = () => {
    const [userType, setUserType] = useState("DUO");

    return { userType, setUserType };
}
 
export default useUserData;