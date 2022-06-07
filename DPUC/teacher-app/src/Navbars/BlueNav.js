import { Navbar, Container, Nav, NavDropdown, Row, Col } from "react-bootstrap";
import { Text, Button } from "@paco_ua/pacoui";
import { useContext } from "react";
import { UserContext } from "../Helper/Context";
import axios from "axios";

const BlueNav = () => {

    const { isLogged, setToken } = useContext(UserContext);

    const URL = "http://localhost:82/logout";

    const logout = () => {
        /*
        axios
            .post(URL)
            .then(() => {
                
            })
            .catch((error) => {
                console.log(error);
            })
            .finally( () => {
            });
            */
        setToken(null);
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
                </Row>
            </Nav>
            <Nav>
                { isLogged &&
                    <Button danger onClick={logout}>
                        Terminar Sessão
                    </Button>
                }
            </Nav>
            </Container>
        </Navbar>
        </>
     );
}
 
export default BlueNav;