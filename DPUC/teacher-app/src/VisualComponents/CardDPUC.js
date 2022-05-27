import { Card, Button, StatusLabel, Text } from "@paco_ua/pacoui";
import { Row, Col } from "react-bootstrap";
import { Link as RouterLink} from "react-router-dom";
import { useContext } from "react";
import { EntitiesContext } from "../Helper/Context";

const GetData = ({dpuc}) => {
    const { estados } = useContext(EntitiesContext);

    return (
        <>
        {
            estados && 
            <StatusLabel
                background={
                    dpuc.estadoid === 1 && 
                        "#42D3B8"
                    ||
                    dpuc.estadoid === 2 && 
                        "#0EB4BD"
                    ||
                    dpuc.estadoid === 3 && 
                        "#F0592A"
                    ||
                    dpuc.estadoid === 4 && 
                        "#F3B21B"
                    ||
                    dpuc.estadoid === 5 && 
                        "#92D400"
                    ||
                    dpuc.estadoid === 6 && 
                        "#A09C9C"
                }
                label={estados.find((e) => (e.id === dpuc.estadoid)).descricao}
            />
        }
        </>
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
                    headerRight={GetData({dpuc})}
                >
                    <Row>
                        <Col>
                            <Row>
                                <Text fontWeight="400" size="mediumSmall">
                                    Ultima alteração: {dpuc.data_alteracao}
                                </Text>
                            </Row>
                            <Row>
                                <Text fontWeight="400" as="i" size="medium">
                                    {
                                        dpuc.estadoid === 1 && 
                                            "DPUC com campos preenchidos, ainda pode fazer alterações nos mesmos."
                                        ||
                                        dpuc.estadoid === 2 && 
                                            "DPUC com campos por preencher."
                                        ||
                                        dpuc.estadoid === 3 && 
                                            "DPUC fechada, já não é possível fazer qualquer alteração. No entanto, pode lançar uma nova versão."
                                        ||
                                        dpuc.estadoid === 4 && 
                                            "DPUC necessita de aprovação para ser publicada."
                                        ||
                                        dpuc.estadoid === 5 && 
                                            "DPUC Aprovada."
                                        ||
                                        dpuc.estadoid === 6 && 
                                            "DPUC desativada. Não é possível fazer qualquer alteração."
                                    }
                                </Text>
                            </Row>
                        </Col>
                        <Col md="auto">
                            <Row>
                                <Col md="auto" style={{paddingTop:"10px"}}>
                                {
                                    (dpuc.estadoid === 1 || dpuc.estadoid === 2) &&
                                        <RouterLink to={"/edit/" + dpuc.id} style={{textDecoration:"none"}}>
                                            <Button content="Action Button" primary style={{fontSize:"100%"}}> Editar DPUC </Button>
                                        </RouterLink> 
                                    ||
                                    dpuc.estadoid === 5 && 
                                    <Button content="Action Button" primary> Lançar novo DPUC </Button>
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