import { Navbar, Container, Nav } from "react-bootstrap";
import { Text } from "@paco_ua/pacoui";

const BlueNav = () => {
    return ( 
        <>
        <Navbar variant="dark" style={{minHeight:"80px", height: "80px", backgroundColor:"#0EB4BD", color:"white"}}>
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
                <Text as="h3" size="xLarge" fontWeight="200"> 
                    paco
                </Text>
            </Nav>
            </Container>
        </Navbar>
        </>
     );
}
 
export default BlueNav;