import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';

import { ContentContainer, Input, Select, Text, Button } from "@uaveiro/ui";



const CreateDPUC = () => {

    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [ucName, setName] = useState("Introdução à Programação");
    const [ucUO, setUO] = useState();
    const [ucECTS, setECTS] = useState(6);
    const [ucRegente, setRegente] = useState();
    const unidadesOrganicas = [
        {value: 1, label: "Departamento de Electrónica, Telecomunicações e Informática"},
        {value: 2, label: "Departamento de Biologia"},
        {value: 3, label: "Departamento de Física"},
        {value: 4, label: "Departamento de Matemática"}
    ]
    const docentes = [
        {value: 1, label: "15777 - Luís Carlos Almeida da Cunha"},
        {value: 2, label: "10244 - Cristiano Ronaldo dos Santos Aveiro"},
        {value: 3, label: "9525 - Luís Filipe Madeira Caeiro Figo"}
    ]
    const handleSubmit = (e) => {
        e.preventDefault();

        setError(false);
        if(!ucUO || !ucRegente)
            setError(true);
        else
            navigate("/");
    }
    const handleBack = () => {
        navigate("/");
        
    }

    return ( 
        <ContentContainer padding="40px" >
            <Row>
                <Col>
                    <Text as="h3" size="xLarge" fontWeight="400"> 
                        Criar UC
                    </Text>
                    <hr/>
                </Col>
            </Row>
            <br/>
            
            <form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Button variant="default" onClick={handleBack} style={{fontSize:"100%"}}>Voltar</Button>
                    </Col>
                    <Col md="auto">
                        <Button variant="primary" style={{fontSize:"100%"}}>Criar</Button>
                    </Col>
                </Row>
                <br/>
                { error &&
                    <Text as="i" size="medium" color="red"> Preencha todos os campos. </Text>
                }
                {/* Nome da UC e UO */}
                <Row>
                    <Col lg={6}>
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Nome da Unidade Curricular
                        </Text>
                        <Input placeholder="Nome da UC..." border="1px solid #424242" color="#424242" required 
                            value={ucName}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Col>
                    <Col lg={6}>
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Unidade Orgânica
                        </Text>
                        <Select placeholder="Indique a Unidade Orgânica em que a UC está alocada..." variant="black" 
                            options={unidadesOrganicas}
                            onChange={(e) => setUO(e.value)}
                            required
                        />
                    </Col>
                </Row>
                {/* ECTS*/}
                <Row style={{paddingTop:"10px"}}>
                    <Col>
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            ECTS
                        </Text>
                        <Input border="1px solid #424242" color="#424242" required type="number"
                            min={4} max={30}
                            value={ucECTS}
                            onChange={(e) => setECTS(e.target.value)}
                            style={{width:"50px"}}
                        />
                    </Col>
                </Row>

                {/* Docente Responsável / Regente */}
                <Row style={{paddingTop:"10px"}}>
                    <Col lg={12}>
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Docente Responsável (Regente)
                        </Text>
                        <Select placeholder="Selecione o docente responsável pela UC..." variant="black" 
                            options={docentes}
                            onChange={(e) => setRegente(e.value)}
                            required
                        />
                    </Col>
                </Row>
            </form>
        </ContentContainer>
     );
}
 
/* 
Como implementar ???????????????
Carga horária do docentes responsável
Carga horária dos docentes
Horas de contacto (OT)
*/
export default CreateDPUC;