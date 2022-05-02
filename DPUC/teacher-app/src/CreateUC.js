import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';
import { ContentContainer, Input, Select, SelectLoading, Text, Button } from "@uaveiro/ui";
import useFetch from "./useFetch";
import axios from "axios";



const CreateDPUC = () => {

    const URL_UO = "http://localhost:8000/uos";
    const URL_DOCENTE = "http://localhost:8000/docentes";
    const URL_DPUC = "http://localhost:8000/dpuc";


    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [errorPOST, setErrorPOST] = useState(null);

    const { data: uos , loading: loadUOS, error: errorUOS } = useFetch(URL_UO);
    const { data: docentes , loading: loadDoce, error: errorDoce } = useFetch(URL_DOCENTE);

    const [ucName, setName] = useState("");
    const [ucUO, setUO] = useState(null);
    const [ucECTS, setECTS] = useState(6);
    const [ucRegente, setRegente] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        setError(false);
        if(!ucUO || !ucRegente ){
            setError(true);
            return;
        }

        const date = new Date();
        var dataAlt = "" + date.getFullYear() + "-";
        dataAlt += ((date.getMonth() + 1) > 9 ? "" : "0") + (date.getMonth() + 1);
        dataAlt += "-";
        dataAlt += ((date.getDate()) > 9 ? "" : "0") + (date.getDate());
        //const uc = { ucName: designacao, ucUO: unidadeOrganical, ucRegente: responsavel, ucECTS: ects}
        const uc = { designacao: ucName, unidadeOrganica: ucUO, responsavel: ucRegente, ects: ucECTS,
                estado: "Em Criação", dataAlteracao: dataAlt}

        axios
            .post(URL_DPUC, uc)
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                setError(error)
            });

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
                { !loadUOS && !loadDoce && (errorUOS || errorDoce) &&
                    <Text as="i" size="medium" color="red"> Não foi possível obter alguns dados. Por favor tente novamente mais tarde. </Text>
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
                        { loadUOS && <SelectLoading />}
                        { errorUOS && !loadUOS && <Select disabled placeholder="Não foi possível obter as Unidades Orgânicas" variant="black" options={[]}/>}
                        { uos && !loadUOS &&
                            <Select placeholder="Indique a Unidade Orgânica em que a UC está alocada..." variant="black" 
                                options={uos}
                                onChange={(e) => setUO(e.id)}
                                getOptionLabel ={(option)=>(option.sigla + " - " +option.nome)}
                                getOptionValue ={(option)=>option.id}
                            />
                        }
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
                        { loadDoce && <SelectLoading />}
                        { errorDoce && !loadDoce && <Select disabled placeholder="Não foi possível obter os Docentes" variant="black" options={[]}/>}
                        { docentes && !loadDoce &&
                            <Select placeholder="Selecione o docente responsável pela UC..." variant="black" 
                            options={docentes}
                            onChange={(e) => setRegente(e.cod_int)}
                            getOptionLabel ={(option)=>option.nome_completo}
                            getOptionValue ={(option)=>option.cod_int}
                            required
                            />
                        }
                        
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