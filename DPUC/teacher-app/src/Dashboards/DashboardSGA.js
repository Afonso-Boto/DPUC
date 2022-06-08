import { Row, Col, Container } from "react-bootstrap";
import { Text } from "@paco_ua/pacoui"
import DPUCList from "./DPUCList";
import { useContext } from "react";
import { UserContext } from "../Helper/Context";

const DashboardSGA  = () => {

    const { user } = useContext(UserContext);

    return ( 
        <Container padding="40px" >
            <Row>
                <Col>
                    <Text as="h3" size="xLarge" fontWeight="medium"> 
                        Gestão de DPUCs
                    </Text>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Text as="h3" color="primary" size="large" fontWeight="medium">
                        { user && "Olá, " + user.nome}
                    </Text>
                </Col>
            </Row>
            <DPUCList canCreate={false}/>
        </Container>
     );
}
 
export default DashboardSGA;