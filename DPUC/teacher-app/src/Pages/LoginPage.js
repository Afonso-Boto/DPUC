import { Button, Text } from "@paco_ua/pacoui";
import { useContext, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { UserContext } from "../Helper/Context";
import Input from "../VisualComponents/Input";
import axios from "axios";

const Home = () => {

    const URL = process.env.REACT_APP_FETCHER + "authenticate";

    const { setToken, setUser } = useContext(UserContext);
    
    const [ email, setEmail ] = useState("sga@ua.pt");
    const [ password, setPassword ] = useState("123");
    const [ errorForm, setErrorForm ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ loading, setLoading ] = useState(false);

    const authenticate = () =>{
        setErrorForm(false);
        setError(false);
        setLoading(true);
        if(!email || !password){
            setErrorForm(true);
            return;
        }

        const auth = {username: email, password: password};

        axios
            .post(URL, auth)
            .then((response) => {
                setToken(response.data.token);
                parseUser(response.data.user);
                //navigate("/");
            })
            .catch((error) => {
                setError(error.response.status);
            })
            .finally( () => {
                setLoading(false);
        });
    }

    const parseUser = (data) => {
        const args = data.split("$");
        const userType = args[4] === "0" ? "SGA" : args[4] === "1" ? "DUO" : "DR";
        const user = {
            id: parseInt(args[0]),
            nome: args[1],
            nmec: parseInt(args[2]),
            email: args[3],
            type: userType
        };
        setUser(user);
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
                                border="true"
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
                                border="true"
                                as="input" 
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{fontSize:"90%"}}
                            />
                        </Col>
                    </Row>
                    {
                        errorForm &&
                        <Text as="i" size="small" color="red">Preencha todos os campos.</Text>
                    }
                    {
                        error &&
                        (
                            ( error === 401 && <Text as="i" size="small" color="red"> Credenciais incorretas. </Text>)
                            ||
                            <Text as="i" size="small" color="red"> Não foi possível conectar ao servidor.</Text>
                        )
                        
                    }
                    <Row style={{paddingTop:"20px", paddingLeft:"12px", paddingRight:"12px"}}>
                        {
                            (loading && <Button success> A autenticar... </Button>)
                            ||
                            <Button success onClick={authenticate}> Autenticar </Button>
                        }
                    </Row>
                </Col>
                <Col></Col>
            </Row>
        </Container>
        </>
     );
}
 
export default Home;