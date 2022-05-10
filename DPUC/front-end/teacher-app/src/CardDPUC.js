import { Button, Link } from "@paco_ua/pacoui";
import { Row, Col, Card } from "react-bootstrap";
import { Link as RouterLink} from "react-router-dom";

const CardDPUC = ({dpuc}) => {
    return ( 
        <Row style={{paddingTop:"5px"}}>
            <Col>
                <Card >
                    <RouterLink to={"/dpuc/" + dpuc.id} style={{textDecoration:"none"}}>
                    <Card.Header as="h5"><Link lighten textDecoration="underline" size="mediumlarge">{dpuc.designacao}</Link></Card.Header>
                    </RouterLink>
                    <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted">
                            Ultima alteração: {dpuc.dataAlteracao} - {dpuc.estado}
                        </Card.Subtitle>
                        <Card.Text>
                            <Row>
                                <Col>
                                <i>
                                    {
                                        dpuc.estado == "Em Criação" && "DPUC com campos preenchidos, ainda pode fazer alterações nos mesmos."
                                        ||
                                        dpuc.estado == "Em Edição" && "DPUC com campos por preencher."
                                        ||
                                        dpuc.estado == "3" && "DPUC fechada, já não é possível fazer qualquer alteração. No entanto, pode lançar uma nova versão."
                                        ||
                                        dpuc.estado == "4" && "DPUC necessita de aprovação para ser publicada."
                                    }
                                </i>
                                </Col>
                                <Col md={3} style={{textAlign:"right"}}>
                                    {
                                        (dpuc.estado == "Em Criação" || dpuc.estado == "Em Edição") &&
                                            <RouterLink to={"/edit/" + dpuc.id}>
                                                <Button variant="primary" > Editar DPUC </Button>
                                            </RouterLink> 
                                        ||
                                        dpuc.estado == "3" && 
                                        <Button variant="primary"> Lançar novo DPUC </Button>
                                        ||
                                        dpuc.estado == "4" && 
                                        <Button variant="primary"> Aprovar DPUC </Button>
                                    }
                                </Col>
                            </Row>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        );
    }
    
export default CardDPUC;