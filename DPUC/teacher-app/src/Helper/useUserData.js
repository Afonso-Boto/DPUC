import { useState, useEffect } from "react";
import axios from "axios";

const useUserData = () => {

    axios.defaults.headers.common["Content-Type"] = "application/json";
    // delete axios.defaults.headers.common["Authorization"];
    // User type
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("dpuc-user")));
    const [token, setToken] = useState(localStorage.getItem("dpuc-token"));

    const [userType, setUserType] = useState("SGA");
    const [isLogged, setIsLogged] = useState(false);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        localStorage.setItem("dpuc-token", token);
        if(!token){
            setUser(null);
            localStorage.setItem("dpuc-user", null);
            setUserType("");
            setIsLogged(false);
            delete axios.defaults.headers.common["Authorization"];
            setLoading(false);
            return;
        }
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        setLoading(false);
        setIsLogged(true);
    }, [token]);

    useEffect(() => {
        if(!user)
            return;
        localStorage.setItem("dpuc-user", JSON.stringify(user));
        setUserType(user.type);
    }, [user])

    return {
      user, setUser, userType, isLogged, loading, setToken
    };
}
 
export default useUserData;