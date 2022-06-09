import { Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import { Text, Button } from "@paco_ua/pacoui";
import { useContext } from "react";
import { UserContext } from "../Helper/Context";

const WhiteNav = () => {

    const { user, userType, isLogged, setToken } = useContext(UserContext);

    const URL = process.env.REACT_APP_FETCHER + "logout";

    const logout = () => {
        setToken(null);
    }
    
    return ( 
        <>
        <Navbar variant="dark" style={{minHeight:"40px", height: "40px", backgroundColor:"#FFFFFF", color:"black"}}>
            <Container>
            <Nav className="me-auto">
                <Row>
                    <Col style={{
                        borderRight:"1px solid lightgray",
                        paddingLeft:"0px",
                        marginLeft:"-10px"
                        }}>
                        <Text as="a" href="https://www.ua.pt/en/noticias" target="_blank" size="xSmall" fontWeight="400"> 
                            Notícias
                        </Text>
                    </Col>
                    <Col>
                        <Text as="a" href="https://www.ua.pt/en/agenda" target="_blank" size="xSmall" fontWeight="400"> 
                            Agenda
                        </Text>
                    </Col>
                    <Col>
                    
                    </Col>
                </Row>
            </Nav>
            <Nav>
                { isLogged && user &&
                    <Row style={{color:"#afc751"}}>
                        <Col md="auto" style={{textAlign:"right"}}>
                            <Text size="xSmall">
                                [{userType}] {user.nome}
                            </Text>
                        </Col>
                        <Col md="auto">|</Col>
                        <Col md="auto" style={{textAlign:"left"}}>
                            <Text size="xSmall" as="a" onClick={logout}>
                                sair
                            </Text>
                        </Col>
                    </Row>
                }
            </Nav>
            </Container>
        </Navbar>
        </>
     );
}
 
export default WhiteNav;