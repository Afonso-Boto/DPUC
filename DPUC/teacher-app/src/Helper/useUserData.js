import { useState } from "react";

const useUserData = () => {
    const [userType, setUserType] = useState("SGA");

    return { userType, setUserType };
}
 
export default useUserData;