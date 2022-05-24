import { useContext } from "react";
import DashboardDUO from "./Dashboards/DashboardDUO";
import DashboardSGA from "./Dashboards/DashboardSGA";
import DashboardDR from "./Dashboards/DashboardDR";

import { UserContext } from "./Helper/Context";

const Home = () => {


    const URL_DPUC = "http://localhost:8000/dpuc/" + 1;

    const { userType } = useContext(UserContext);
    
    return ( 
        <>
        {
            userType === "DUO" &&
            <DashboardDUO/>
        }
        {
            userType === "DR" &&
            <DashboardDR/>
        }
        {
            userType === "SGA" &&
            <DashboardSGA/>
        }
        </>
     );
}
 
export default Home;