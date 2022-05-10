import { FormInput, Text, Button, AnimatedBackground } from "@paco_ua/pacoui";
import { Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useFetch from './Helper/useFetch';
import CardDPUC from "./CardDPUC";

/*a faltar: onClick => para DPUC em edicao, em criacao e fechadas
            search bar com o template ua e passar a ser dinamica
             */

const DashboardDUO  = () => {

    const navigate = useNavigate();

    const URL_DPUC = "http://localhost:8000/dpuc";

    const goToCreate = () => {
        navigate("/create");
    }

    const { data: dpuc , loading, error } = useFetch(URL_DPUC);

    return ( 
        <Container padding="40px" >
            <Row>
                <Col>
                    <Text as="h3" size="xLarge" fontWeight="400"> 
                        Gestão de DPUCs
                    </Text>
                    <hr/>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col style={{textAlign:"left"}}>
                    <Button action style={{fontSize:"100%"}}>
                        DPUC em Edição
                    </Button>
                </Col>
                <Col style={{textAlign:"left"}}>
                    <Button action style={{fontSize:"100%"}}>
                        DPUC em Criação
                    </Button>
                </Col>
                <Col style={{textAlign:"left"}}>
                    <Button action style={{fontSize:"100%"}}>
                        DPUCs fechadas
                    </Button>
                </Col>
                <Col style={{textAlign:"right"}}>
                    <Button primary onClick={goToCreate} style={{fontSize:"100%"}}>
                        Criar UC
                    </Button>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col style={{textAlign:"center"}}>
                    <hr/>
                </Col>
            </Row>
            <br/>
            { loading && <AnimatedBackground height="100px" width="50%"></AnimatedBackground> }
            { error && <Text as="i" size="medium" color="red"> Não foi possível obter os seus Dossier Pedagógicos.</Text> }
            { dpuc &&
            dpuc.map((uc) => (
                <CardDPUC key={uc.id} dpuc={uc}/>
            ))
            }
        </Container>
     );
}
 
export default DashboardDUO;