import { ContentContainer, Input, Text, Button, AnimatedBackground, Link } from "@uaveiro/ui";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate, Link as RouterLink} from "react-router-dom";
import useFetch from "./useFetch";
import CardDPUC from "./CardDPUC";

const DashboardDUO  = () => {

    const navigate = useNavigate();

    const URL_DPUC = "http://localhost:8000/dpuc";

    const goToCreate = () => {
        navigate("/create");
    }

    const { data: dpuc , loading, error } = useFetch(URL_DPUC);

    return ( 
        <ContentContainer padding="40px" >
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
                
                <Col style={{textAlign:"right"}}>
                    <Button variant="primary" onClick={goToCreate} style={{fontSize:"100%"}}>
                        Criar UC
                    </Button>
                </Col>
            </Row>
            <br/>
            { loading && <AnimatedBackground height="100px" width="50%"></AnimatedBackground> }
            { error && <Text as="i" size="medium" color="red"> Não foi possível obter os seus Dossier Pedagógicos.</Text> }
            { dpuc &&
            dpuc.map((uc) => (
                <CardDPUC dpuc={uc}/>
            ))
            }
        </ContentContainer>
     );
}
 
export default DashboardDUO;