import { ContentContainer, Input, Select, Text, Button } from "@uaveiro/ui";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();

    const goToCreate = () => {
        navigate("/create");
    }

    const dpuc = [
        {id: 1, uc: "Introdução à Programação", code: 40000, status: 1, periodo:"2021/2022"},
        {id: 2, uc: "Inteligência Artificial", code: 40000, status: 2, periodo:"2021/2022"},
        {id: 4, uc: "Programação I", code: 40000, status: 4, periodo:"2021/2022"},
        {id: 3, uc: "Introdução à Engenharia de Software", code: 40000, status: 3, periodo:"2020/2021"},
    ]

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
            {
            dpuc.map((uc) => (
                <Row style={{paddingTop:"5px"}}>
                    <Col>
                        <Card >
                            <Card.Header as="h5">{uc.uc}</Card.Header>
                            <Card.Body>
                                <Card.Title>{/*uc.uc*/}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    {uc.periodo} - 
                                    {
                                        uc.status == 1 && " Aberta"
                                        ||
                                        uc.status == 2 && " Por Finalizar"
                                        ||
                                        uc.status == 3 && " Fechada"
                                        ||
                                        uc.status == 4 && " Por Aprovar"
                                    }
                                </Card.Subtitle>
                                <Card.Text>
                                    <Row>
                                        <Col>
                                        <i>
                                            {
                                                uc.status == 1 && "DPUC com campos preenchidos, ainda pode fazer alterações nos mesmos."
                                                ||
                                                uc.status == 2 && "DPUC com campos por preencher."
                                                ||
                                                uc.status == 3 && "DPUC fechada, já não é possível fazer qualquer alteração. No entanto, pode lançar uma nova versão."
                                                ||
                                                uc.status == 4 && "DPUC necessita de aprovação para ser publicada."
                                            }
                                        </i>
                                        </Col>
                                        <Col md={3} style={{textAlign:"right"}}>
                                            {
                                                (uc.status == 1 || uc.status == 2) && 
                                                    <Button variant="primary"> Editar DPUC </Button>
                                                ||
                                                uc.status == 3 && 
                                                <Button variant="primary"> Lançar novo DPUC </Button>
                                                ||
                                                uc.status == 4 && 
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