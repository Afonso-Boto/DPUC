import { ContentContainer, Input, Text, Button, AnimatedBackground, Link } from "@uaveiro/ui";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useState } from "react";
import CardDPUC from "./CardDPUC";
import DashboardDUO from "./DashboardDUO";

const Home = () => {

    const [userType, setUserType] = useState("DR");

    return ( 
        <>
        {
            userType == "DUO" &&
            <DashboardDUO/>
        }
        {
            userType == "DR" &&
            <DashboardDUO/>
        }
        {
            userType == "SGA" &&
            <DashboardDUO/>
        }
        </>
     );
}
 
export default Home;