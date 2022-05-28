import { Navbar, Container, Nav, NavDropdown, Row, Col } from "react-bootstrap";
import { Text } from "@paco_ua/pacoui";
import { useContext } from "react";
import { UserContext } from "../Helper/Context";

const BlueNav = () => {

    const { userType, setUserType } = useContext(UserContext);

    const changeUser = (user) => {
        setUserType(user);
    }

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
                            paco
                        </Text>
                    </Col>
                    <Col>
                        <NavDropdown title="Alterar Utilizador" id="basic-nav-dropdown" style={{color:"white"}}>
                            <NavDropdown.Item onClick={() => changeUser("DUO")}>DUO</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => changeUser("DR")}>DR</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => changeUser("SGA")}>SGA</NavDropdown.Item>
                        </NavDropdown>
                    </Col>
                </Row>
                
                
            </Nav>
            </Container>
        </Navbar>
        </>
     );
}
 
export default BlueNav;