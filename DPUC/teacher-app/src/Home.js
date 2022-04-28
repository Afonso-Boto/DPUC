import { ContentContainer, Input, Select, Text, Button } from "@uaveiro/ui";
import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();

    const goToCreate = () => {
        navigate("/create");
    }

    return ( 
        <ContentContainer padding="40px" >
            <div className="row">
                <div className="col-lg">
                    <Text as="h3" size="xLarge" fontWeight="400"> 
                        Gestão de DPUCs
                    </Text>
                    <hr/>
                </div>
            </div>
            <br/>
            <Row>
                <Col style={{textAlign:"right"}}>
                    <Button variant="primary" onClick={goToCreate}>
                        Criar UC
                    </Button>
                </Col>
            </Row>
        </ContentContainer>
     );
}
 
export default Home;