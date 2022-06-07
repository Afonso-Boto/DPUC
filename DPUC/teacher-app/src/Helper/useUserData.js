import { useState, useEffect } from "react";
import axios from "axios";

const useUserData = () => {

    axios.defaults.headers.common["Content-Type"] = "application/json";
    // delete axios.defaults.headers.common["Authorization"];
    // User type
    const [user, setUser] = useState(localStorage.getItem("dpuc-user"));
    const [token, setToken] = useState(localStorage.getItem("dpuc-token"));

    const [userType, setUserType] = useState("SGA");
    const [isLogged, setIsLogged] = useState(false);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        localStorage.setItem("dpuc-token", token);
        if(!token){
            setUser(null);
            setUserType("");
            setIsLogged(false);
            delete axios.defaults.headers.common["Authorization"];
            return;
        }
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        console.log(axios.defaults.headers.common["Authorization"]);
        setLoading(false);
        setIsLogged(true);
    }, [token]);

    useEffect(() => {
        if(!user)
            return;
        setUserType(user.type);
        console.log(user);
    }, [user])

    return {
      user, setUser, userType, isLogged, loading, setToken
    };
}
 
export default useUserData;