import { useContext } from "react";
import DashboardDUO from "../Dashboards/DashboardDUO";
import DashboardSGA from "../Dashboards/DashboardSGA";
import DashboardDR from "../Dashboards/DashboardDR";

import { UserContext } from "../Helper/Context";

const Home = () => {

    const { userType } = useContext(UserContext);
    
    return ( 
        <>
        
        </>
     );
}
 
export default Home;