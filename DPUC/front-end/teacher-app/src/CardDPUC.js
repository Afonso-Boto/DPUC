import { Card, Button, StatusLabel, Text } from "@paco_ua/pacoui";
import { Row, Col } from "react-bootstrap";
import { Link as RouterLink} from "react-router-dom";

const getData = ({dpuc}) => {
    return (
        <StatusLabel
            background={
                dpuc.estado == "Em Criação" && 
                    "#42D3B8"
                ||
                dpuc.estado == "Em Edição" && 
                    "#0EB4BD"
                ||
                dpuc.estado == "3" && 
                    "#F0592A"
                ||
                dpuc.estado == "4" && 
                    "#F3B21B"
            }
            label={dpuc.estado}
        />
    )
}

const CardDPUC = ({dpuc}) => {
    return ( 
        <Row style={{paddingTop:"5px", paddingBottom:"15px"}}>
            <Col>     
                <Card 
                    active 
                    title={dpuc.designacao} 
                    to={"/dpuc/" + dpuc.id}
                    headerRight={getData({dpuc})}
                >
                    <Row>
                        <Col>
                            <Row>
                                <Text fontWeight="400" size="mediumSmall">
                                    Ultima alteração: {dpuc.dataAlteracao}
                                </Text>
                            </Row>
                            <Row>
                                <Text fontWeight="400" as="i" size="medium">
                                    {
                                        dpuc.estado == "Em Criação" && "DPUC com campos preenchidos, ainda pode fazer alterações nos mesmos."
                                        ||
                                        dpuc.estado == "Em Edição" && "DPUC com campos por preencher."
                                        ||
                                        dpuc.estado == "3" && "DPUC fechada, já não é possível fazer qualquer alteração. No entanto, pode lançar uma nova versão."
                                        ||
                                        dpuc.estado == "4" && "DPUC necessita de aprovação para ser publicada."
                                    }
                                </Text>
                            </Row>
                        </Col>
                        <Col md="auto">
                            <Row>
                                <Col md="auto" style={{paddingTop:"10px"}}>
                                {
                                    (dpuc.estado == "Em Criação" || dpuc.estado == "Em Edição") &&
                                        <RouterLink to={"/edit/" + dpuc.id} style={{textDecoration:"none"}}>
                                            <Button content="Action Button" primary style={{fontSize:"100%"}}> Editar DPUC </Button>
                                        </RouterLink> 
                                    ||
                                    dpuc.estado == "3" && 
                                    <Button content="Action Button" primary> Lançar novo DPUC </Button>
                                    ||
                                    dpuc.estado == "4" && 
                                    <Button content="Action Button" primary> Aprovar DPUC </Button>
                                }
                                </Col>
                                <Col md="auto" style={{paddingTop:"10px"}}>
                                {
                                    <RouterLink to={"/dpuc/" + dpuc.id} style={{textDecoration:"none"}}>
                                        <Button content="Action Button" primary style={{fontSize:"100%"}}> Ver DPUC </Button>
                                    </RouterLink>
                                }
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    
                </Card>
            </Col>
        </Row>
        );
    }
    
export default CardDPUC;