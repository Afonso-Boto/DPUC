import { ContentContainer, Input, Text, Button, AnimatedBackground, Link } from "@uaveiro/ui";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate, Link as RouterLink} from "react-router-dom";
import useFetch from "./useFetch";

const Home = () => {


    

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
                <Row style={{paddingTop:"5px"}}>
                    <Col>
                        <Card >
                            <RouterLink to={"/dpuc/" + uc.id} style={{textDecoration:"none"}}>
                            <Card.Header as="h5"><Link lighten textDecoration="underline" size="mediumlarge">{uc.designacao}</Link></Card.Header>
                            </RouterLink>
                            <Card.Body>
                                <Card.Subtitle className="mb-2 text-muted">
                                    Ultima alteração: {uc.dataAlteracao} - {uc.estado}
                                </Card.Subtitle>
                                <Card.Text>
                                    <Row>
                                        <Col>
                                        <i>
                                            {
                                                uc.estado == "Em Criação" && "DPUC com campos preenchidos, ainda pode fazer alterações nos mesmos."
                                                ||
                                                uc.estado == "Em Edição" && "DPUC com campos por preencher."
                                                ||
                                                uc.estado == "3" && "DPUC fechada, já não é possível fazer qualquer alteração. No entanto, pode lançar uma nova versão."
                                                ||
                                                uc.estado == "4" && "DPUC necessita de aprovação para ser publicada."
                                            }
                                        </i>
                                        </Col>
                                        <Col md={3} style={{textAlign:"right"}}>
                                            {
                                                (uc.estado == "Em Criação" || uc.estado == "Em Edição") &&
                                                    <RouterLink to={"/edit/" + uc.id}>
                                                        <Button variant="primary" > Editar DPUC </Button>
                                                    </RouterLink> 
                                                ||
                                                uc.estado == "3" && 
                                                <Button variant="primary"> Lançar novo DPUC </Button>
                                                ||
                                                uc.estado == "4" && 
                                                <Button variant="primary"> Aprovar DPUC </Button>
                                            }
                                        </Col>
                                    </Row>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            ))
            }
        </ContentContainer>
     );
}
 
export default Home;