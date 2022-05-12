import { Card as CardPaco, Button } from "@paco_ua/pacoui";
import { Row, Col } from "react-bootstrap";
import { Link as RouterLink} from "react-router-dom";

const CardDPUC = ({dpuc}) => {
    return ( 
        <Row style={{paddingTop:"5px", paddingBottom:"15px"}}>
            <Col>     
                <CardPaco active title={dpuc.designacao} to={"/dpuc/" + dpuc.id}>
                    <Row>
                        Ultima alteração: {dpuc.dataAlteracao} - {dpuc.estado}
                    </Row>
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
                        <Col md="auto" style={{textAlign:"right"}}>
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
                        <Col md="auto" style={{textAlign:"right"}}>
                            {
                                <RouterLink to={"/dpuc/" + dpuc.id} style={{textDecoration:"none"}}>
                                    <Button content="Action Button" primary style={{fontSize:"100%"}}> Ver DPUC </Button>
                                </RouterLink>
                            }
                        </Col>
                    </Row>
                </CardPaco>
            </Col>
        </Row>
        );
    }
    
export default CardDPUC;