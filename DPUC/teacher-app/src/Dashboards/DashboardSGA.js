import { Row, Col, Container } from "react-bootstrap";
import { Text } from "@paco_ua/pacoui"
import DPUCList from "./DPUCList";

const DashboardSGA  = () => {

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
                        Olá, SGA! 
                    </Text>
                </Col>
            </Row>
            <br/>
            <DPUCList canCreate={false}/>
        </Container>
     );
}
 
export default DashboardSGA;