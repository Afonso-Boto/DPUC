import { Navbar, Container, Nav, NavDropdown, Row, Col } from "react-bootstrap";
import { Text, Button } from "@paco_ua/pacoui";
import { useContext } from "react";
import { UserContext } from "../Helper/Context";
import { Link } from "react-router-dom";

const BlueNav = () => {

    
    return ( 
        <>
        <Navbar variant="dark" style={{minHeight:"80px", height: "80px", width:"100wv", backgroundColor:"#0EB4BD", color:"white"}}>
            <Container>
            <Navbar.Brand>
                <img
                    src="/logo.png"
                    //width="118"
                    height="80"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                />
            </Navbar.Brand>
            <Nav className="me-auto">
                <Row>
                    <Col>
                        <Text as="h3" size="xLarge" fontWeight="200"> 
                            <Link className="no-decor-link" to="/" style={{color:"white"}}>
                            paco
                            </Link>
                        </Text>
                    </Col>
                </Row>
            </Nav>

            </Container>
        </Navbar>
        </>
     );
}
 
export default BlueNav;