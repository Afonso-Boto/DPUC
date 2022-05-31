import { Button, Text } from "@paco_ua/pacoui";
import { useContext, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { UserContext } from "../Helper/Context";
import Input from "../VisualComponents/Input";
import axios from "axios";

const Home = () => {

    const URL = "http://localhost:82/authenticate";

    const { userType } = useContext(UserContext);
    
    const [ email, setEmail ] = useState("");
    const [ emailError, setEmailError ] = useState(false);
    const [ password, setPassword ] = useState("");
    const [ passwordError, setPasswordError ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ loading, setLoading ] = useState(false);

    const authenticate = () =>{
        setEmailError(false);
        setPasswordError(false);
        setError(false);
        setLoading(true);
        if(!email)
            setEmailError(true);
        if(!password)
            setPasswordError(true);
        if(!email || !password)
            return;

        const auth = {username: email, password: password};

        axios
            .post(URL, auth)
            .then(() => {
                //navigate("/");
            })
            .catch((error) => {
                setError(true);
                console.log(error);
            })
            .finally( () => {
                setLoading(false);
        });
    }

    return ( 
        <>
        <Container>
            <Row>
                <Col></Col>
                <Col md="4">
                    <Row>
                        <Col>
                            <Text size="medium">Utilizador</Text>
                            <Input
                                border
                                as="input" 
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{fontSize:"90%"}}
                            />
                        </Col>
                    </Row>
                    <Row style={{paddingTop:"10px"}}>
                        <Col>
                            <Text size="medium">Palavra-passe</Text>
                            <Input
                                border
                                as="input" 
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{fontSize:"90%"}}
                            />
                        </Col>
                    </Row>
                    <Row style={{paddingTop:"20px", paddingLeft:"12px", paddingRight:"12px"}}>
                        <Button success onClick={authenticate}> Autenticar</Button>
                    </Row>
                </Col>
                <Col></Col>
            </Row>
        </Container>
        </>
     );
}
 
export default Home;