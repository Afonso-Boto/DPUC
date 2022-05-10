import { useState } from "react";
import DashboardDUO from "./DashboardDUO";

import { Button, Link } from "@paco_ua/pacoui";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import useFetch from "./Helper/useFetch";
import { Link as RouterLink} from "react-router-dom";

const Home = () => {


    const URL_DPUC = "http://localhost:8000/dpuc/" + 1;

    const [userType, setUserType] = useState("DR");

    return ( 
        <>
        {
            userType === "DUO" &&
            <DashboardDUO/>
        }
        {
            userType === "DR" &&
            <DashboardDUO/>
        }
        {
            userType === "SGA" &&
            <DashboardDUO/>
        }
        </>
     );
}
 
export default Home;