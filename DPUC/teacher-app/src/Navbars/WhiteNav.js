import { Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import { Text } from "@paco_ua/pacoui";

const WhiteNav = () => {
    return ( 
        <>
        <Navbar variant="dark" style={{minHeight:"40px", height: "40px", backgroundColor:"#FFFFFF", color:"black"}}>
            <Container>
            <Nav className="me-auto">
                <Row>
                    <Col>
                        <Text as="h3" size="small" fontWeight="300"> 
                            Notícias
                        </Text>
                    </Col>

                    <Col>
                        <Text as="h3" size="small" fontWeight="300"> 
                            Agenda
                        </Text>
                    </Col>
                </Row>
            </Nav>
            </Container>
        </Navbar>
        </>
     );
}
 
export default WhiteNav;