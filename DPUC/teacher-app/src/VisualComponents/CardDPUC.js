import { Card, Button, StatusLabel, Text } from "@paco_ua/pacoui";
import { Row, Col } from "react-bootstrap";
import { Link as RouterLink} from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { EntitiesContext, UserContext } from "../Helper/Context";

const GetData = ({dpuc}) => {
    const { estados } = useContext(EntitiesContext);
    const [ estado, setEstado ] = useState(0);        

    useEffect(() => {
        if(!estados)
            return;
        var estadoID = dpuc.estadoid
        if(estadoID === 7 || estadoID === 8)
            estadoID -= 6;
        if(estadoID === 9 || estadoID === 10)
            estadoID -= 5;
        setEstado(estados.find((e) => (e.id === estadoID)));
    }, [estados]);

    return (
        <>
        {
            estados && estado &&
            <StatusLabel
                background={
                    (estado.id === 1 && 
                        "#42D3B8")
                    ||
                    (estado.id === 2 && 
                        "#0EB4BD")
                    ||
                    (estado.id === 3 && 
                        "#F0592A")
                    ||
                    (estado.id === 4 && 
                        "#F3B21B")
                    ||
                    (estado.id === 5 && 
                        "#92D400")
                    ||
                    (estado.id === 6 && 
                        "#A09C9C")
                }
                label={estado.descricao + " (" + estado.id + ")"}
            />
        }
        </>
    )
}

const CardDPUC = ({dpuc}) => {

    const { userType } = useContext(UserContext);

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
                                        ((dpuc.estadoid === 1 || dpuc.estadoid === 7) && 
                                            "DPUC com campos preenchidos, ainda pode fazer alterações nos mesmos.")
                                        ||
                                        ((dpuc.estadoid === 2 || dpuc.estadoid === 8) && 
                                            "DPUC com campos por preencher.")
                                        ||
                                        (dpuc.estadoid === 3 && 
                                            "DPUC fechada, já não é possível fazer qualquer alteração. No entanto, pode lançar uma nova versão.")
                                        ||
                                        ((dpuc.estadoid === 4 || dpuc.estadoid === 9) && 
                                            "DPUC necessita de aprovação para ser publicada.")
                                        ||
                                        ((dpuc.estadoid === 5 || dpuc.estadoid === 10) && 
                                            "DPUC Aprovada.")
                                        ||
                                        (dpuc.estadoid === 6 && 
                                            "DPUC desativada. Não é possível fazer qualquer alteração.")
                                    }
                                </Text>
                            </Row>
                        </Col>
                        <Col md="auto">
                            <Row>
                                <Col md="auto" style={{paddingTop:"10px"}}>
                                {
                                    ((dpuc.estadoid === 1 || dpuc.estadoid === 2 || dpuc.estadoid === 7 || dpuc.estadoid === 8) &&
                                        <RouterLink to={"/edit/" + dpuc.id} style={{textDecoration:"none"}}>
                                            <Button content="Action Button" primary style={{fontSize:"100%"}}> Editar DPUC </Button>
                                        </RouterLink>
                                    )
                                    ||
                                    ((dpuc.estadoid === 5 || dpuc.estadoid === 10) && userType === "DUO" &&
                                    <Button content="Action Button" primary> Lançar novo DPUC </Button>
                                    )
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